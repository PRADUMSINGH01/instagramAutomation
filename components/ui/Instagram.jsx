// InstagramLoginBW.jsx
import React from "react";
import { FaInstagram } from "react-icons/fa";

export default function InstagramLoginBW({ authUrl, privacyPolicyUrl }) {
  return (
    <div className="max-w-sm mx-auto p-6 border border-black rounded-lg bg-white text-black font-sans text-center">
      <h2 className="text-2xl font-bold mb-2">Login with Instagram</h2>
      <p className="text-sm text-gray-600 mb-6">
        <strong>Secure:</strong> We don’t store any of your Instagram data.
      </p>

      <a
        href={authUrl}
        rel="noopener noreferrer"
        className="
          flex items-center justify-center
          w-full px-4 py-3 mb-4
          border-2 border-black rounded-md
          hover:bg-gray-100
          transition
          font-semibold
          space-x-2
        "
      >
        <FaInstagram className="w-5 h-5" />
        <span>Continue with Instagram</span>
      </a>

      <p className="text-xs text-gray-500">
        We only redirect you to Instagram for authorization;{" "}
        <span className="font-medium">no personal data is stored</span> on our
        servers. See our{" "}
        <a
          href={privacyPolicyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
