"use client";

import {
  TwitterAuthProvider,
  signInWithPopup,
  OAuthCredential, // Import OAuthCredential for type safety
} from "firebase/auth";
import { auth } from "@/server/firebase /Clientfire"; // your firebase client config

export default function TwitterLoginPage() {
  const handleTwitterLogin = async () => {
    try {
      const provider = new TwitterAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Get Twitter credential from the result
      const credential = TwitterAuthProvider.credentialFromResult(result);

      // ❗ FIX: Check if the credential exists before using it
      if (!credential) {
        throw new Error("Twitter credential could not be retrieved.");
      }

      // ❗ FIX: Safely access the OAuth secret without using 'as any'
      // We assert a more specific type that includes the 'secret' property,
      // which is expected for OAuth 1.0 providers like Twitter.
      const { accessToken, secret: accessSecret } =
        credential as OAuthCredential & { secret?: string };

      if (!accessToken || !accessSecret) {
        throw new Error("Twitter access token or secret not returned.");
      }

      // Get Firebase ID token to identify user securely on your backend
      const idToken = await result.user.getIdToken();

      // Send tokens to your backend API
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
      // ❗ FIX: Handle the 'unknown' type of the error object safely
      console.error("Twitter login error:", err);
      let errorMessage = "An unknown error occurred.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      alert(`❌ Twitter login failed: ${errorMessage}`);
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
