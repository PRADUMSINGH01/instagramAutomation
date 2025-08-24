import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface PayLoad extends JwtPayload {
  uid: string;
}

export async function GET(req: NextRequest) {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJYOUpEdmpYUFpHY2tKRjlrOFRMbkFBTHZjeXQyIiwiZW1haWwiOm51bGwsInBob25lIjoiKzkxNzI3MDg1NDEyMiIsImlhdCI6MTc1NTk1MjI1MCwiZXhwIjoxNzU2NTU3MDUwfQ.GB78-maga8VcjB9Uh-jbaa9hUjfHb4Cg3MLwd4mf64Q"; //req.cookies.get("session_token")?.value;
    if (!token) {
      throw new Error("No token found");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not set");
    }

    // ✅ Verify JWT safely
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as unknown as PayLoad;

    if (!decoded.uid) {
      throw new Error("Invalid token: uid missing");
    }

    return NextResponse.json(
      { valid: true, uid: decoded.uid },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { valid: false, message: (error as Error).message },
      { status: 401 }
    );
  }
}
