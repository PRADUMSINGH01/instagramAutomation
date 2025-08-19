"use client";
import { useState } from "react";
import { X, User, Hash } from "lucide-react";

export default function RegisterPopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center items-center h-10 bg-white text-black">
      {/* Popup Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-2 border border-gray-200 rounded-lg font-medium hover:bg-black hover:text-white transition duration-300"
      >
        Register Brand
      </button>

      {/* Popup Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-gradient-to-r from-pink-500 to-purple-600 flex justify-center items-center z-50">
          <div className="bg-white text-black rounded-2xl shadow-2xl w-[90%] max-w-md p-6 animate-scaleIn relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 hover:text-red-500 flex items-center justify-center"
            >
              <X size={22} />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <User size={22} /> Register Your Brand
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Enter your number or brand name to connect with Meta API.
            </p>

            {/* Form */}
            <form className="space-y-4">
              <div className="flex items-center border border-black rounded-lg px-3 py-2">
                <Hash size={18} className="mr-2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Enter Brand Name"
                  className="w-full bg-transparent outline-none text-black"
                />
              </div>

              <div className="flex items-center border border-black rounded-lg px-3 py-2">
                <User size={18} className="mr-2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Enter WhatsApp Number"
                  className="w-full bg-transparent outline-none text-black"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Animation */}
      <style jsx>{`
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        @keyframes scaleIn {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
