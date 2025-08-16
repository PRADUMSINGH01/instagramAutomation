// app/api/auth/[...nextauth]/route.ts (or .js)

import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      // This is the key part for OAuth 2.0
      version: "2.0",
      // This requests the scopes needed for posting tweets and getting a refresh token
      authorization: {
        params: {
          scope: "users.read tweet.read",
        },
      },
    }),
  ],
  callbacks: {
    // This callback is called whenever a JWT is created or updated.
    // We want to persist the access token and refresh token in the JWT.
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at * 1000; // Convert to milliseconds
      }
      return token;
    },
    // This callback is called whenever a session is checked.
    // We want to make the access token available to the client.
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error; // You can add an error property for token refresh failures
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
