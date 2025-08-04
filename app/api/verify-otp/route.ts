import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/server/firebase /firebaseSetup"; // Use your Admin SDK setup

/**
 * Verifies the Firebase ID token sent from the client.
 * If valid, it can create/update a user record in Firestore.
 * This is a secure, server-only operation.
 */
export async function POST(req: NextRequest) {
  try {
    // --- 1. Extract Token ---
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Authorization header missing or invalid." },
        { status: 401 }
      );
    }
    const idToken = authHeader.split("Bearer ")[1];

    // --- 2. Verify Token using Admin SDK ---
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const { uid, phone_number } = decodedToken;

    // --- 3. Perform Privileged Actions ---
    // At this point, the user is authenticated. You can now safely
    // interact with your database or other backend services.
    const userRef = adminDb.collection("users").doc(uid);
    await userRef.set(
      {
        uid: uid,
        phoneNumber: phone_number,
        lastLoginAt: new Date().toISOString(),
      },
      { merge: true } // Use merge to avoid overwriting existing data
    );

    // --- 4. Success Response ---
    return NextResponse.json({
      success: true,
      message: "User authenticated successfully.",
      uid: uid,
    });
  } catch (error: any) {
    console.error("Login API Error:", error);

    let message = "An unexpected error occurred during login.";
    // Handle specific Firebase Admin errors
    if (error.code === "auth/id-token-expired") {
      message = "Your session has expired. Please log in again.";
    } else if (error.code === "auth/argument-error") {
      message = "The provided token is invalid.";
    }

    return NextResponse.json(
      { success: false, message: message },
      { status: 401 } // Unauthorized
    );
  }
}
