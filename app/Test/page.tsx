"use client";
import { useEffect, useState } from "react";

interface AccessTokenData {
  Get_User_Access_token?: {
    id?: string;
    name?: string;
    uid?: string;
  };
}

const Page = () => {
  const [accessToken, setAccessToken] = useState<AccessTokenData>({});

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const res = await fetch("/api/accesstoken");
        const data = await res.json();
        setAccessToken(data);
      } catch (err) {
        console.error("Error fetching access token:", err);
      }
    };

    getAccessToken();
  }, []);

  console.log(accessToken);

  return (
    <div>
  User Name: {accessToken.Get_User_Access_token?.id || "Loading..."}
</div>
  );
};

export default Page;
