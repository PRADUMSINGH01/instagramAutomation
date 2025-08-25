import { adminDb } from "@/server/firebase/firebaseSetup";
import { verifysession } from "../verifysession";

interface UserData {
  id: string;
  Providers?: any[];
  [key: string]: any;
}

type UserResponse =
  | { success: true; data: UserData }
  | { success: false; msg: string; error?: string };

export async function GET_User_By_Id(): Promise<UserResponse> {
  const data = await verifysession();
  console.log(data.uid, "data----");
  try {
    if (!data.uid) {
      return { success: false, msg: "UID is required" };
    }

    const userDoc = await adminDb.collection("users").doc(data?.uid).get();

    if (!userDoc.exists) {
      return { success: false, msg: "User not found" };
    }

    return {
      success: true,
      data: {
        id: userDoc.id,
        ...(userDoc.data() as Record<string, any>),
      },
    };
  } catch (error: any) {
    console.error("Firestore fetch error:", error);
    return {
      success: false,
      msg: error.message ?? "Unknown error",
      error: "Failed to fetch user",
    };
  }
}
