"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function TwitterButton() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <button onClick={() => signIn("twitter")}>Login with Twitter</button>
    );
  }

  return (
    <div>
      <p>Logged in as {session.user?.name}</p>
      <p>Access Token: {session.accessToken}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
