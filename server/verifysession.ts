export const verifySession = async () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return null;
  }

  try {
    // Verify token with backend (optional)
    const response = await fetch("/api/verifyuser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      return JSON.parse(localStorage.getItem("user") || "{}");
    }
    return null;
  } catch (error) {
    return null;
  }
};
