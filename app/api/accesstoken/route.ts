import { NextResponse } from "next/server";
import { GET_User_By_Id } from "@/server/GetUserbyId/Get_User_Id";
export async function GET() {
  const Get_User_Access_token = await GET_User_By_Id();
  return NextResponse.json({ Get_User_Access_token });
}
