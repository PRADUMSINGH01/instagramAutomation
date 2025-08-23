"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // icon
import React from "react";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // Go to previous page
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center hover:text-gray-600"
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </button>
  );
}
