"use client";

import { signIn } from "next-auth/react";

export default function TwitterLoginButton() {
  return (
    <button
      onClick={() => signIn("twitter")}
      className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition"
    >
      Connect Twitter
    </button>
  );
}
