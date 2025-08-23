import { adminDb } from "@/server/firebase/firebaseSetup";
interface UserData {
  id: string;
  Providers?: any[]; // 👈 optional, safer}
}
type UserResponse =
  | { success: true; data: UserData }
  | { success: false; msg: string; error?: string };

export async function GET_User_By_Id(): Promise<UserResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/verifyuser`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );

    if (!response.ok) {
      return { success: false, msg: "Token verification failed" };
    }

    const data: { uid?: string } = await response.json();
    if (!data.uid) {
      return { success: false, msg: "Token is invalid" };
    }

    const docRef = adminDb.collection("users").doc(data.uid);
    const userDoc = await docRef.get();

    if (!userDoc.exists) {
      return { success: false, msg: "User not found" };
    }

    return { success: true, data: { id: userDoc.id, ...userDoc.data() } };
  } catch (error: any) {
    console.error("Firestore fetch error:", error);
    return {
      success: false,
      msg: error.message,
      error: "Failed to fetch user",
    };
  }
}
