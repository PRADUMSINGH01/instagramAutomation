//first---
/* this API will update on firestore Posted ++ number of DM ++  and number comment replies */

//second
/* you will get post limit + dm limit comment limit while subscribe plans  */
 
import { NextResponse, NextRequest } from "next/server";
import { adminDb } from "@/server/firebase/firebaseSetup";
export async function GET(req: NextRequest) {
  try {
  } catch (error: unknown) {}
  return NextResponse.json({ status: 200 });
}
