import NextAuth from "next-auth/next";
import PinterestProvider from "next-auth/providers/pinterest";

import crypto from "crypto";
import { adminDb } from "@/server/firebase /firebaseSetup";
// 🔹 Simple encrypt/decrypt helpers
const encrypt = (text) => {
  const cipher = crypto.createCipheriv(
    "aes-256-gcm",
    Buffer.from(process.env.ENCRYPTION_KEY, "hex"), // 32 bytes hex
    Buffer.alloc(16, 0) // IV (use random for higher security per write)
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const handler = NextAuth({
  providers: [
    PinterestProvider({
      clientId: process.env.PINTEREST_CLIENT_ID,
      clientSecret: process.env.PINTEREST_CLIENT_SECRET,
      authorization: {
        url: "https://www.pinterest.com/oauth",
        params: {
          scope:
            "user_accounts:read pins:read pins:write boards:read boards:write",
          response_type: "code",
        },
      },
      token: "https://api.pinterest.com/v5/oauth/token",
      userinfo: "https://api.pinterest.com/v5/user_account",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email_address ?? null,
          image: profile.profile_image,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at ? account.expires_at * 1000 : null;
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;
      }
      return token;
    },

    async session({ session, token }) {
      session.provider = token.provider;
      session.providerAccountId = token.providerAccountId;
      return session;
    },

    async signIn({ user, account }) {
      try {
        const uid =
          user.id ?? `${account.provider}-${account.providerAccountId}`;

        // store in a subcollection: users/{uid}/socials/{provider}
        const providerRef = adminDb
          .collection("users")
          .doc(uid)
          .collection("socials")
          .doc(account.provider);

        await providerRef.set(
          {
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            accessToken: encrypt(account.access_token),
            refreshToken: account.refresh_token
              ? encrypt(account.refresh_token)
              : null,
            expiresAt: account.expires_at ? account.expires_at * 1000 : null,
            updatedAt: Date.now(),
          },
          { merge: true }
        );

        return true;
      } catch (err) {
        console.error("❌ Firestore save failed:", err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
