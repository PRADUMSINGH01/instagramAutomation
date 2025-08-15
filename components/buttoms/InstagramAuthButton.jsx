"use client";

import React, { useState } from "react";
import { Instagram, Loader2 } from "lucide-react";

export default function ConnectInstagramButton() {
  const [loading, setLoading] = useState(false);

  const handleConnect = () => {
    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      alert("Instagram Connected Successfully!");
    }, 2000);
  };

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className={`flex items-center gap-2 px-2 py-2 rounded-full font-medium text-white transition-all duration-300 ${
        loading
          ? "bg-purple-400 cursor-not-allowed"
          : "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:scale-105"
      }`}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={20} />
      ) : (
        <Instagram size={20} />
      )}
      {loading ? "Connecting..." : "Connect Instagram"}
    </button>
  );
}
