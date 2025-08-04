import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/server/firebase /firebaseSetup"; // Use your Admin SDK setup
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
  } catch (error: unknown) {
    console.error("Login API Error:", error);

    let message = "An unexpected error occurred during login.";

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "string"
    ) {
      const code = (error as { code: string }).code;

      if (code === "auth/id-token-expired") {
        message = "Your session has expired. Please log in again.";
      } else if (code === "auth/argument-error") {
        message = "The provided token is invalid.";
      }
    }

    return NextResponse.json(
      { success: false, message: message },
      { status: 401 } // Unauthorized
    );
  }
}
