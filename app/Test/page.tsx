"use client";

import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/server/firebase /Clientfire"; // your firebase client config

export default function TwitterLoginPage() {
  const handleTwitterLogin = async () => {
    try {
      const provider = new TwitterAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Get Twitter credential
      const credential = TwitterAuthProvider.credentialFromResult(result);

      const accessToken = credential?.accessToken;
      const accessSecret = (credential as any)?.secret; // ✅ correct way

      if (!accessToken || !accessSecret) {
        throw new Error("Twitter tokens not returned by Firebase");
      }

      // Get Firebase ID token to identify user securely
      const idToken = await result.user.getIdToken();

      // Send tokens to backend API
      const res = await fetch("/api/twitter/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ accessToken, accessSecret }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      alert("✅ Twitter account linked successfully!");
    } catch (err) {
      console.error("Twitter login error:", err);
      alert("❌ Twitter login failed: " + (err as Error).message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl mb-4">Connect your Twitter</h1>
        <button
          onClick={handleTwitterLogin}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Sign in with Twitter
        </button>
        <p className="mt-3 text-sm text-gray-500">
          This will link your Twitter account securely.
        </p>
      </div>
    </main>
  );
}
