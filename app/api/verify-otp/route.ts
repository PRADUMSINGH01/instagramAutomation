import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/server/firebase /firebaseSetup";
import jwt from "jsonwebtoken";
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

    // --- 3. Generate Custom Access Token ---
    // This is your application-specific token for frontend authentication
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable not set");
    }

    const accessToken = jwt.sign(
      {
        uid: decodedToken.uid,
        email: decodedToken.email || null,
        phone: decodedToken.phone_number || null,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token expiration time
    );

    // --- 4. Update/Create User in Firestore ---
    const userRef = adminDb.collection("users").doc(uid);
    await userRef.set(
      {
        uid: uid,
        email: decodedToken.email || null,
        phoneNumber: phone_number || null,
        displayName: decodedToken.name || "",
        lastLoginAt: new Date().toISOString(),
      },
      { merge: true }
    );

    // --- 5. Fetch Updated User Data ---
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    // --- 6. Success Response ---
    return NextResponse.json(
      {
        success: true,
        accessToken: accessToken,
        user: {
          uid: uid,
          email: userData?.email || null,
          phone: userData?.phoneNumber || null,
          name: userData?.displayName || null,
          lastLogin: userData?.lastLoginAt || null,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Login API Error:", error);

    // Initialize error message
    let message = "An unexpected error occurred during login.";
    let status = 500;

    // Handle specific Firebase errors
    if (typeof error === "object" && error !== null) {
      const firebaseError = error as { code?: string; message?: string };

      if (firebaseError.code) {
        switch (firebaseError.code) {
          case "auth/id-token-expired":
            message = "Your session has expired. Please log in again.";
            status = 401;
            break;
          case "auth/argument-error":
            message = "The provided token is invalid.";
            status = 401;
            break;
          case "auth/user-disabled":
            message = "Your account has been disabled.";
            status = 403;
            break;
          default:
            message = firebaseError.message || message;
        }
      }
    }

    return NextResponse.json({ success: false, message }, { status });
  }
}
