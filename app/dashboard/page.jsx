"use client";
import React, { useState, useEffect } from "react";
import { Instagram } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GridBackground() {
  const [isConnecting, setIsConnecting] = useState(false);
  const router = useRouter();

  const handleConnect = () => {
    setIsConnecting(true);

    // Simulate API call (2s delay)
    setTimeout(() => {
      router.push("dashboard/automation/Instagram");
    }, 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fixed Grid Background */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(to_right,#e5e7eb_0px,#e5e7eb_1px,transparent_1px,transparent_50px),repeating-linear-gradient(to_bottom,#e5e7eb_0px,#e5e7eb_1px,transparent_1px,transparent_50px)]"></div>

      {/* Page Content with animated blur box */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="px-10 py-8 rounded-3xl backdrop-blur-md bg-white/30 shadow-xl flex flex-col items-center space-y-6 animate-fadeInScale">
          <h1 className="text-4xl font-bold text-gray-800">
            Connect Your Instagram
          </h1>

          {/* Instagram Connect Button */}
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className={`flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg transition duration-300 ${
              isConnecting
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white hover:shadow-pink-500/40"
            }`}
          >
            <Instagram className="w-6 h-6" />
            {isConnecting ? "Connecting..." : "Connect Instagram"}
          </button>
        </div>
      </div>
    </div>
  );
}
