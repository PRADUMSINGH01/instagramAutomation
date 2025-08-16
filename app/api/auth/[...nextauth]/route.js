import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { adminDb } from "../../../../server/firebase /firebaseSetup";
const authHandler = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
  ],

  callbacks: {
    // Save tokens in JWT
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + account.expires_in * 1000;

        // Save to Firestore (nested in your user doc)
        const uid = token.sub; // Your user ID from SaaS auth
        await adminDb
          .collection("users")
          .doc(uid)
          .set(
            {
              socials: {
                twitter: {
                  accessToken: account.access_token,
                  refreshToken: account.refresh_token,
                  updatedAt: new Date(),
                },
              },
            },
            { merge: true }
          );
      }

      // Auto-refresh if expired
      if (Date.now() > token.expiresAt) {
        const refreshed = await refreshTwitterToken(token.refreshToken);
        token.accessToken = refreshed.access_token;
        token.expiresAt = Date.now() + refreshed.expires_in * 1000;
        if (refreshed.refresh_token) {
          token.refreshToken = refreshed.refresh_token;
        }

        // Update Firestore after refresh
        const uid = token.sub;
        await db
          .collection("users")
          .doc(uid)
          .set(
            {
              socials: {
                twitter: {
                  accessToken: token.accessToken,
                  refreshToken: token.refreshToken,
                  updatedAt: new Date(),
                },
              },
            },
            { merge: true }
          );
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.twitterAccessToken = token.accessToken;
      return session;
    },
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { authHandler as GET, authHandler as POST };

// 🔄 Helper: Refresh Twitter Token
async function refreshTwitterToken(refreshToken) {
  const res = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.TWITTER_CLIENT_ID,
      client_secret: process.env.TWITTER_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) throw new Error("Failed to refresh token");
  return res.json();
}
