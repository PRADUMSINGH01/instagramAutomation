// app/api/post-tweet/route.ts (or .js)

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Function to refresh the access token
async function refreshAccessToken(token) {
  try {
    const url = "https://api.twitter.com/2/oauth2/token";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`
          ).toString("base64"),
      },
      body: new URLSearchParams({
        refresh_token: token.refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    // You should probably update the user's token in your database here
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
      expiresAt: Date.now() + refreshedTokens.expires_in * 1000,
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export async function POST(req) {
  // Get the user's token from the session
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Check if the access token is expired
  let currentToken = token;
  if (Date.now() > token.expiresAt) {
    console.log("Access token expired, refreshing...");
    currentToken = await refreshAccessToken(token);
  }

  // If token refresh failed, return an error
  if (currentToken.error) {
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 }
    );
  }

  // Get the tweet text from the request body
  const { tweetText } = await req.json();
  if (!tweetText) {
    return NextResponse.json(
      { error: "Tweet text is required" },
      { status: 400 }
    );
  }

  // Now, use the valid access token to post the tweet
  try {
    const response = await fetch("https://api.twitter.com/2/tweets", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${currentToken.accessToken}`,
      },
      body: JSON.stringify({ text: tweetText }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Twitter API Error:", data);
      return NextResponse.json(
        { error: "Failed to post tweet", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Request failed", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
