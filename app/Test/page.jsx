"use client";
import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/server/firebase /Clientfire"; // your firebase client config

export default function TwitterLogin() {
  const handleTwitterLogin = async () => {
    try {
      const provider = new TwitterAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const credential = TwitterAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      const accessSecret = credentialsecret;

      if (!accessToken || !accessSecret)
        throw new Error("Missing Twitter tokens");

      const idToken = await result.user.getIdToken();

      // Send to API for secure storage
      const res = await fetch("/api/twitter/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ accessToken, accessSecret }),
      });

      if (!res.ok) throw new Error(await res.text());

      alert("Twitter account linked successfully!");
    } catch (err) {
      console.error(err);
      alert("Twitter login failed");
    }
  };

  return (
    <button
      onClick={handleTwitterLogin}
      className="px-4 py-2 bg-black text-white rounded"
    >
      Sign in with Twitter
    </button>
  );
}
