import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import FetchCookies from "@/server/fetchCookies";
interface PayLoad extends JwtPayload {
  uid: string;
}

export async function GET() {
  const token = await FetchCookies();

  try {
    if (!token) throw new Error("No token found in cookies");
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not set");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Ensure it's an object & has uid
    if (typeof decoded !== "object" || !("uid" in decoded)) {
      throw new Error("Invalid token: uid missing");
    }

    const payload = decoded as PayLoad;

    return NextResponse.json(
      { valid: true, uid: payload.uid },
      { status: 200 }
    );
  } catch (error: unknown) {
    let message = "An unknown error occurred";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ valid: false, message }, { status: 401 });
  }
}
