// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import admin from "firebase-admin";
import { adminDb } from "@/server/firebase/firebaseSetup"; // ensure admin app & adminDb properly initialized
import { verifysession } from "@/server/verifysession";
// ----- Config / thresholds -----
const MAX_BYTES_IMAGE = 6 * 1024 * 1024; // 6 MB - ok to upload server-side
const MAX_BYTES_VIDEO = 15 * 1024 * 1024; // 15 MB - small videos ok; larger -> client-side upload recommended
const SIGNED_UPLOAD_TTL_MS = 1000 * 60 * 15; // 15 minutes for write URL

// ----- helpers -----
function getErrorMessage(err: unknown): string {
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return "Unknown error";
  }
}

function estimateBase64BytesLength(base64: string) {
  // rough estimate (base64 length * 3/4) - includes header, so remove header if present
  const commaIndex = base64.indexOf(",");
  const raw = commaIndex >= 0 ? base64.slice(commaIndex + 1) : base64;
  return Math.floor((raw.length * 3) / 4);
}

function getMimeFromDataUri(dataUri: string): string | null {
  const match = dataUri.match(/^data:([^;]+);base64,/i);
  return match ? match[1].toLowerCase() : null;
}

function mimeToExt(mime: string) {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "video/mp4": "mp4",
    "video/webm": "webm",
    "video/quicktime": "mov",
  };
  return map[mime] ?? mime.split("/")[1] ?? "bin";
}

async function uploadBase64ToStorage(
  base64: string,
  filepath: string,
  contentType: string
) {
  try {
    const bucket = admin.storage().bucket(process.env.STORAGEBUCKET);
    // strip header
    const commaIndex = base64.indexOf(",");
    const raw = commaIndex >= 0 ? base64.slice(commaIndex + 1) : base64;
    const buffer = Buffer.from(raw, "base64");

    const file = bucket.file(filepath);
    await file.save(buffer, {
      metadata: { contentType },
      resumable: false,
    });

    // Return a v4 signed read URL valid for a short duration (you can generate longer or make public if needed)
    const [readUrl] = await file.getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    });
    return { readUrl, size: buffer.length };
  } catch (err: unknown) {
    const msg = getErrorMessage(err);
    console.error("uploadBase64ToStorage error:", msg, err);
    throw new Error("Image/video upload failed");
  }
}

async function generateV4UploadUrl(filepath: string, contentType: string) {
  // returns a write URL (PUT/POST) that client can use to upload directly
  const bucket = admin.storage().bucket(process.env.FIREBASE_STORAGE_BUCKET);
  const file = bucket.file(filepath);

  // write URL
  const [writeUrl] = await file.getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + SIGNED_UPLOAD_TTL_MS,
    contentType,
  });

  // we cannot guarantee read URL until upload finishes; client should call finalize endpoint,
  // or we can provide a short-lived read URL placeholder (not valid until content exists)
  const readUrlPlaceholder = `gs://${bucket.name}/${file.name}`;

  return { writeUrl, readUrlPlaceholder };
}

// ----- Validation schema -----
const PostSchema = z.object({
  caption: z.string().max(1000).optional().default(""),
  media: z.string(), // either data:<mime>;base64,... OR an external URL
  scheduletime: z.string().optional(),
  requestSignedUrl: z.boolean().optional().default(false), // if true we may return signed URL for large files
});

// ----- Route handler -----
export async function POST(req: NextRequest) {
  try {
    // auth
    const decodedID = await verifysession();
    console.log(decodedID, "server post");
    // parse + validate
    let json: unknown;
    try {
      json = await req.json();
    } catch (err: unknown) {
      console.log(err);
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = PostSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 422 }
      );
    }
    const { caption, media, scheduletime, requestSignedUrl } = parsed.data;

    // scheduletime validation
    let scheduledAt: admin.firestore.Timestamp | null = null;
    if (scheduletime) {
      const d = new Date(scheduletime);
      if (Number.isNaN(d.getTime())) {
        return NextResponse.json(
          { error: "Invalid scheduletime" },
          { status: 400 }
        );
      }
      scheduledAt = admin.firestore.Timestamp.fromDate(d);
    }

    // media handling
    let mediaUrl = "";
    let mediaType: "image" | "video" = "image";
    if (media.startsWith("data:")) {
      // data URI
      const mime = getMimeFromDataUri(media);
      if (!mime)
        return NextResponse.json(
          { error: "Invalid data URI" },
          { status: 400 }
        );

      const primary = mime.split("/")[0];
      if (primary !== "image" && primary !== "video") {
        return NextResponse.json(
          { error: "Unsupported media type" },
          { status: 400 }
        );
      }
      mediaType = primary as "image" | "video";

      const approxSize = estimateBase64BytesLength(media);

      // decide path: small upload allowed server-side, large videos -> signed upload
      if (mediaType === "image") {
        if (approxSize > MAX_BYTES_IMAGE) {
          return NextResponse.json(
            { error: "Image too large for server upload, use client upload" },
            { status: 413 }
          );
        }
        const ext = mimeToExt(mime);
        const filepath = `posts/${decodedID}_${Date.now()}.${ext}`;
        const { readUrl } = await uploadBase64ToStorage(media, filepath, mime);
        mediaUrl = readUrl;
      } else {
        // video
        if (approxSize > MAX_BYTES_VIDEO) {
          // too large to accept as base64 server-side
          if (requestSignedUrl) {
            const ext = mimeToExt(mime);
            const filepath = `posts/${decodedID}_${Date.now()}.${ext}`;
            try {
              const { writeUrl, readUrlPlaceholder } =
                await generateV4UploadUrl(filepath, mime);
              // store a Firestore "pending" doc optionally, or just return the URLs so client uploads directly
              return NextResponse.json(
                {
                  message:
                    "Upload URL generated. Upload directly to storage using the WRITE url (PUT) with same content-type.",
                  upload: { writeUrl, path: filepath, readUrlPlaceholder },
                },
                { status: 200 }
              );
            } catch (err: unknown) {
              console.error(
                "generateV4UploadUrl failed:",
                getErrorMessage(err)
              );
              return NextResponse.json(
                { error: "Could not generate upload url" },
                { status: 500 }
              );
            }
          } else {
            return NextResponse.json(
              {
                error:
                  "Video too large for server-side upload. Send requestSignedUrl=true to receive a signed upload URL and upload client-side.",
              },
              { status: 413 }
            );
          }
        } else {
          // small video - upload server-side
          const ext = mimeToExt(mime);
          const filepath = `posts/${decodedID}_${Date.now()}.${ext}`;
          const { readUrl } = await uploadBase64ToStorage(
            media,
            filepath,
            mime
          );
          mediaUrl = readUrl;
        }
      }
    } else {
      // external URL - validate
      try {
        const parsedUrl = new URL(media);
        // optional: check that URL is https and/or whitelisted domain
        mediaUrl = parsedUrl.href;
        // determine type by extension / simple guess
        const pathname = parsedUrl.pathname.toLowerCase();
        if (pathname.match(/\.(mp4|webm|mov|m4v)$/)) mediaType = "video";
        else mediaType = "image";
      } catch {
        return NextResponse.json(
          { error: "Invalid media URL" },
          { status: 400 }
        );
      }
    }

    // build and save post document
    const now = admin.firestore.FieldValue.serverTimestamp();
    const postDoc = {
      userid: decodedID?.uid,
      media: mediaUrl,
      mediaType,
      caption,
      scheduledAt: scheduledAt ?? null,
      published: scheduledAt ? false : true,
      createdAt: now,
      publishedAt: scheduledAt ? null : now,
    };

    const docRef = await adminDb.collection("posts").add(postDoc);

    return NextResponse.json(
      { message: "Post created", id: docRef.id },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("POST /api/posts error:", getErrorMessage(err), err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
