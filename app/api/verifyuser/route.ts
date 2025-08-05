// pages/api/auth/verify.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { valid: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not set");
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json({ valid: true, user: decoded }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ valid: false, message: error }, { status: 401 });
  }
}
