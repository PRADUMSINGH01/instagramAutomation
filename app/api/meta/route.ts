// /app/api/facebook/store-token/route.ts

import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/server/firebase /firebaseSetup"; // Your Firebase Admin SDK setup

const FB_APP_ID = process.env.FACEBOOK_CLIENT_ID;
const FB_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

export async function POST(request: Request) {
  try {
    // 1. Verify the user's Firebase ID Token
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }
    const idToken = authHeader.split("Bearer ")[1];
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // 2. Get the short-lived token from the request body
    const body = await request.json();
    const { accessToken: shortLivedToken } = body;
    if (!shortLivedToken) {
      return NextResponse.json(
        { error: "Bad Request: Missing access token" },
        { status: 400 }
      );
    }

    // 3. Exchange it for a long-lived token
    const url = `https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${FB_APP_ID}&client_secret=${FB_APP_SECRET}&fb_exchange_token=${shortLivedToken}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to exchange token");
    }

    const longLivedToken = data.access_token;

    // 4. Store the long-lived token securely in your database (e.g., Firestore)
    await adminDb
      .collection("users")
      .doc(uid)
      .set(
        {
          facebookAccessToken: longLivedToken, // This should be encrypted
          tokenExpiresAt: new Date(Date.now() + data.expires_in * 1000),
        },
        { merge: true }
      );

    return NextResponse.json({ message: "Token stored successfully." });
  } catch (error) {
    console.error("Error storing token:", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
