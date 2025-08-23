import { NextResponse } from "next/server";

const ACCESS_TOKEN = ""; //FETCH_ACCESS_TOKEN()

export async function GET() {
  const FETCH_URL = `https://api.pinterest.com/v5/pins`;
  try {
    const res = await fetch(FETCH_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json({
        status: res.status,
        msg: "Some error from sever end Please try again later",
      });
    }

    const pins = await res.json();
    return NextResponse.json({ status: 200, pins });
  } catch (err: unknown) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
