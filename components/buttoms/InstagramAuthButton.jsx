"use client";

import React, { useState } from "react";
import { Instagram } from "lucide-react";

export default function InstagramAuthPopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center  bg-gray-900">
      {/* Button to open popup */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
      >
        <Instagram size={20} />
        Connect Account
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 text-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            {/* Content */}
            <div className="flex flex-col items-center gap-4">
              <Instagram size={50} className="text-pink-500" />
              <h2 className="text-2xl font-bold">Connect Instagram Account</h2>
              <p className="text-gray-300 text-center text-sm">
                Choose the Instagram account you want to automate.
              </p>
              <button className="mt-4 px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 font-semibold text-white shadow hover:scale-105 transition-transform duration-200">
                Continue with Instagram
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
