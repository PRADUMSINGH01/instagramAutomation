import NextAuth from "next-auth/next";
import PinterestProvider from "next-auth/providers/pinterest";

import crypto from "crypto";
import { adminDb } from "@/server/firebase/firebaseSetup";
// 🔹 Simple encrypt/decrypt helpers
const encrypt = (text) => {
  const iv = crypto.randomBytes(16); // different per encryption
  const cipher = crypto.createCipheriv(
    "aes-256-gcm",
    Buffer.from(process.env.ENCRYPTION_KEY, "hex"), // 32 bytes
    iv
  );

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");

  return {
    encryptedData: encrypted,
    iv: iv.toString("hex"),
    authTag,
  };
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
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/pinterest`,
        },
      },
      token: "https://api.pinterest.com/v5/oauth/token",
      userinfo: "https://api.pinterest.com/v5/user_account",
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
