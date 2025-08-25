"use client";
import { useEffect, useState } from "react";

interface AccessTokenData {
  uid?: string;
  success: boolean;
}

const Page = () => {
  const [accessToken, setAccessToken] = useState<AccessTokenData>();

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        // ✅ Call API
        const response = await fetch("/api/accesstoken", {
          method: "GET",
        });

        const data: AccessTokenData = await response.json();
        console.log("Server response:", data);

      

        // ✅ Update state
        setAccessToken(data);
      } catch (err) {
        console.error("Error fetching access token:", err);
      }
    };

    getAccessToken();
  }, []);

  return <div>User Name: {accessToken?.uid || "Loading..."}</div>;
};

export default Page;
