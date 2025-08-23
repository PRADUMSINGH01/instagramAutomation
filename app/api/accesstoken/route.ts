import { NextResponse } from "next/server";
import { GET_User_By_Id } from "@/server/GetUserbyId/Get_User_Id";

export async function GET() {
  try {
    const result = await GET_User_By_Id();

    if (result.success) {
      return NextResponse.json(result.data); // returns full user doc
    }

    return NextResponse.json(
      { error: result.msg, details: result.error },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in GET route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
