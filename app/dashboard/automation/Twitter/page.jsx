// app/components/AuthButton.tsx

"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function AuthButton() {
  const { data: session, status } = useSession();

  // The status can be 'loading', 'authenticated', or 'unauthenticated'
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // If the user is authenticated, show their name and a sign-out button
  if (status === "authenticated") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || "User avatar"}
            width={40}
            height={40}
            style={{ borderRadius: "50%" }}
          />
        )}
        <span>👋 Welcome, **{session.user?.name}**</span>
        <button
          onClick={() => signOut()}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Sign Out
        </button>
      </div>
    );
  }

  // If the user is not authenticated, show a sign-in button
  return (
    <button
      onClick={() => signIn("twitter")}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#1DA1F2",
        color: "white",
        border: "none",
        borderRadius: "20px",
      }}
    >
      Sign in with Twitter
    </button>
  );
}
