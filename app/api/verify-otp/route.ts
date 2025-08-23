import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/server/firebase/firebaseSetup";
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
    const { uid, phone_number, email, name } = decodedToken;

    // --- 3. Generate Custom JWT (App Session Token) ---
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable not set");
    }

    const appToken = jwt.sign(
      {
        uid,
        email: email || null,
        phone: phone_number || null,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Session cookie expiration
    );

    // --- 4. Update/Create User in Firestore ---
    const userRef = adminDb.collection("users").doc(uid);
    await userRef.set(
      {
        uid,
        email: email || null,
        phoneNumber: phone_number || null,
        displayName: name || "",
        lastLoginAt: new Date().toISOString(),
        trail: false,
        plans: {
          expiredata: false,
          price: 0,
          paymentId: false,
        },
        APIUsages: {},
      },
      { merge: true }
    );

    // --- 5. Create Secure HttpOnly Cookie ---
    const response = NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 }
    );

    response.cookies.set({
      name: "session_token",
      value: appToken,
      httpOnly: true,     // ❌ Not accessible via JS
      secure: true,       // ✅ Only over HTTPS
      sameSite: "strict", // ✅ Prevent CSRF
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: unknown) {
    console.error("Login API Error:", error);

    let message = "An unexpected error occurred during login.";
    let status = 500;

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
