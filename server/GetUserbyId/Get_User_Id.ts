import { adminDb } from "@/server/firebase/firebaseSetup";

interface UserData {
  id: string;
  Providers?: any[]; // optional
  [key: string]: any; // allow extra fields
}

type UserResponse =
  | { success: true; data: UserData }
  | { success: false; msg: string; error?: string };

export async function GET_User_By_Id(
  req?: Request // optional if you want to support server-side calls
): Promise<UserResponse> {
  try {
    // 🔑 Call verify API to extract uid from cookie/token
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/verifyuser`, {
      method: "GET",
      credentials: "include", // works in browser
      headers: req ? { Cookie: req.headers.get("cookie") || "" } : {},
    });

    if (!response.ok) {
      return { success: false, msg: "Token verification failed" };
    }

    const data: { uid?: string } = await response.json();
    if (!data.uid) {
      return { success: false, msg: "Token is invalid" };
    }

    // 🔥 Fetch user from Firestore
    const docRef = adminDb.collection("users").doc(data.uid);
    const userDoc = await docRef.get();

    if (!userDoc.exists) {
      return { success: false, msg: "User not found" };
    }

    return {
      success: true,
      data: {
        id: userDoc.id,
        ...(userDoc.data() || {}),
      },
    };
  } catch (error: any) {
    console.error("Firestore fetch error:", error);
    return {
      success: false,
      msg: error.message,
      error: "Failed to fetch user",
    };
  }
}
