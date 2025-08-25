// ✅ CORRECT: Using 'await' to get the cookie store
"use server";
import { cookies } from "next/headers";

const FetchCookies = async () => {
  try {
    // 👇 Add 'await' here to resolve the Promise
    const cookieStore = await cookies(); // Now this is a ReadonlyRequestCookies object
    const token = cookieStore.get("session_token")?.value; // Now .get() will work
    console.log(token);
    return token;
  } catch (error) {
    console.error("Failed to get cookies:", error);
    return undefined;
  }
};
export default FetchCookies;
