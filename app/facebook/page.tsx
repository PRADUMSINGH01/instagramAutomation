"use client";

import { useState } from "react";
import { FacebookAuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth } from "@/server/firebase /Clientfire"; // your firebase client config

export default function FacebookLoginPage() {
  // ✅ CORRECTED: useState syntax for a value that can be a User object or null
  const [user, setUser] = useState<User | null>(null);

  // ✅ CORRECTED: useState syntax for a value that can be a string or null
  const [error, setError] = useState<string | null>(null);

  const handleFacebookLogin = async () => {
    try {
      setError(null);
      const provider = new FacebookAuthProvider();

      // ✅ IMPORTANT: Request permissions (scopes) for Instagram
      provider.addScope("instagram_basic");
      provider.addScope("instagram_manage_comments");
      provider.addScope("instagram_manage_messages");
      provider.addScope("pages_show_list"); // Required to list the pages the user manages
      provider.addScope("pages_read_engagement");

      const result = await signInWithPopup(auth, provider);
      const credential = FacebookAuthProvider.credentialFromResult(result);

      if (!credential || !credential.accessToken) {
        throw new Error("Facebook access token not found.");
      }

      // This is the short-lived access token you will send to your backend
      const accessToken = credential.accessToken;
      const idToken = await result.user.getIdToken(); // To verify the user on your backend

      // Send the token to your backend for further processing
      const res = await fetch("/api/facebook/store-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ accessToken }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      alert("✅ Facebook & Instagram linked successfully!");
      setUser(result.user);
    } catch (err) {
      console.error("Facebook login error:", err);
      let errorMessage = "An unknown error occurred.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        {user ? (
          <div>
            <h2>Welcome, {user.displayName}</h2>
            {/* Display other user info or a success message */}
          </div>
        ) : (
          <div>
            <h1 className="text-2xl mb-4">Connect your Instagram</h1>
            <button
              onClick={handleFacebookLogin}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Sign in with Facebook
            </button>
            <p className="mt-3 text-sm text-gray-500">
              This will allow us to automate comments and DMs.
            </p>
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </div>
        )}
      </div>
    </main>
  );
}
