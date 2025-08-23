import { adminDb } from "@/server/firebase/firebaseSetup";

interface UserData {
  id: string;
  [key: string]: any;
}

export async function GET_User_By_Id(): Promise<
  UserData | { msg: string; error?: string }
> {
  try {
    // Call your API to verify token
    const response = "LgiTrWmfoXUsuwR9Vo8R"; //await fetch("/api/verify");

    // if (!response.ok) {
    //   return { msg: "Token verification failed" };
    // }

    // // Assuming verify API returns { userId: string }
    // const data: { userId?: string } = await response.json();

    // if (!data.userId) {
    //   return { msg: "Token is invalid" };
    // }

    // Fetch user document
    const docRef = adminDb.collection("users").doc(response);
    const userDoc = await docRef.get();

    if (!userDoc.exists) {
      return { msg: "User not found" };
    }

    return { id: userDoc.id, ...userDoc.data() };
  } catch (error: any) {
    console.error("Firestore fetch error:", error);
    return { error: "Failed to fetch user", msg: error.message };
  }
}
