import NextAuth from "next-auth/next";
import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";

const handler = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0", // enforce OAuth 2.0
      authorization: {
        params: {
          scope: "users.read tweet.read tweet.write offline.access",
        },
      },
    }),

    FacebookProvider({
      clientId: "1463915521308876", //process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: "53218cd7086f984ffd09e4525e70e4ea", //process.env.INSTAGRAM_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
