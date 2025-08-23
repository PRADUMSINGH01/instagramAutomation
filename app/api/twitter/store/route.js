import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "../../../../server/firebase/firebaseSetup";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const match = authHeader.match(/^Bearer (.+)$/);
    if (!match) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idToken = match[1];
    const decoded = await adminAuth.verifyIdToken(idToken);

    const { accessToken, accessSecret } = await req.json();
    if (!accessToken || !accessSecret) {
      return NextResponse.json({ error: "Missing tokens" }, { status: 400 });
    }

    await adminDb
      .collection("users")
      .doc(decoded.uid)
      .collection("providers")
      .doc("twitter")
      .set({
        accessToken,
        accessSecret,
        updatedAt: new Date(),
      });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error storing Twitter tokens:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
