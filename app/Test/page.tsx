"use client";

import { useState } from "react";
import {
  TwitterAuthProvider,
  signInWithPopup,
  signOut,
  OAuthCredential,
  User, // Import the User type
} from "firebase/auth";
import { auth } from "@/server/firebase /Clientfire"; // your firebase client config

export default function TwitterLoginPage() {
  // State to hold the logged-in user's details
  const [user, setUser] = useState<User | null>(null);

  const handleTwitterLogin = async () => {
    try {
      const provider = new TwitterAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Get Twitter credential from the result
      const credential = TwitterAuthProvider.credentialFromResult(result);
      if (!credential) {
        throw new Error("Twitter credential could not be retrieved.");
      }

      // Safely access the OAuth secret without using 'as any'
      const { accessToken, secret: accessSecret } =
        credential as OAuthCredential & { secret?: string };

      if (!accessToken || !accessSecret) {
        throw new Error("Twitter access token or secret not returned.");
      }

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

      // ✅ SET USER DETAILS TO STATE
      setUser(result.user);
    } catch (err) {
      console.error("Twitter login error:", err);
      let errorMessage = "An unknown error occurred.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      alert(`❌ Twitter login failed: ${errorMessage}`);
    }
  };

  // Function to handle user sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state
    } catch (error) {
      console.error("Sign out error:", error);
      alert("Failed to sign out.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md text-center">
        {user ? (
          // --- Logged-in User View ---
          <div>
            <h1 className="text-2xl font-bold mb-4">Welcome Back!</h1>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-300"
              />
            )}
            <h2 className="text-xl font-semibold text-gray-800">
              {user.displayName}
            </h2>
            <p className="text-gray-500 mb-6">
              {user.email || "No public email"}
            </p>
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        ) : (
          // --- Login View ---
          <div>
            <h1 className="text-2xl mb-4">Connect your Twitter</h1>
            <button
              onClick={handleTwitterLogin}
              className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Sign in with Twitter
            </button>
            <p className="mt-3 text-sm text-gray-500">
              This will link your Twitter account securely.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
