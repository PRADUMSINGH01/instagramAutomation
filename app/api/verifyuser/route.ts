import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    // ✅ Read JWT from cookies
    const token = req.cookies.get("session_token")?.value;

    if (!token) {
      return NextResponse.json(
        { valid: false, message: "Token not found in cookies" },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not set");
    }

    // ✅ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      uid: string;
      iat: number;
      exp: number;
    };

    // ✅ Extract uid
    const uid = decoded.uid;

    return NextResponse.json(
      { valid: true, uid, user: decoded },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { valid: false, message: (error as Error).message },
      { status: 401 }
    );
  }
}
