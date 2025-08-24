import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface PayLoad extends JwtPayload {
  uid: string;
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("session_token")?.value;
    console.log(token);
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
