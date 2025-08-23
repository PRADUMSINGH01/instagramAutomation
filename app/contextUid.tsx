// context/AuthContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  uid: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  uid: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch("/api/auth/verifyuser", {
          method: "GET",
          credentials: "include", // ensures cookies are sent
        });

        if (res.ok) {
          const data = await res.json();
          setUid(data.user.uid); // ✅ UID comes from decoded JWT
        } else {
          setUid(null);
        }
      } catch (err) {
        setUid(null);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ uid, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
