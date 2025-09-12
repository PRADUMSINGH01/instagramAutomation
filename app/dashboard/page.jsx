"use client";

import React, { useState } from "react";
import { useAuth } from "../contextUid";
import { Instagram, ArrowBigLeft, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * OnboardingConnectInstagram
 * - Minimal, highly polished onboarding card focused on a single action: Connect Instagram
 * - Mobile-first, fully responsive, accessible controls, and clear hierarchy
 * - Replace the mock connect logic with your OAuth flow where indicated.
 */
export default function OnboardingConnectInstagram() {
  const { uid, loading } = useAuth();
  const [connecting, setConnecting] = useState(false);
  const router = useRouter();

  // Replace with real user from context if available
  const user = {
    name: "Alex Morgan",
    email: "alex@example.com",
    avatar: "/avatar-placeholder.png",
  };

  const handleConnect = async () => {
    try {
      setConnecting(true);
      // TODO: Replace this with your Instagram OAuth redirect / popup.
      // Example: window.location.href = `/api/auth/instagram?redirect=${encodeURIComponent(window.location.pathname)}`
      setTimeout(() => {
        router.push("/dashboard/automation/Instagram");
      }, 600);
    } catch (err) {
      console.error(err);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="md:flex">
            {/* Left visual: subtle, brand-accent strip */}
            <div className="hidden md:flex md:w-1/3 items-center justify-center bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600 p-8">
              <div className="text-center">
                <div className="mx-auto mb-4 w-20 h-20 rounded-2xl bg-white/12 flex items-center justify-center">
                  <Instagram className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-white text-lg font-semibold">Instagram</h3>
                <p className="text-white/90 text-sm mt-2">Business & Creator accounts</p>
              </div>
            </div>

            {/* Right content */}
            <div className="w-full md:w-2/3 p-6 md:p-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-11 h-11 rounded-lg object-cover border border-gray-100"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Welcome back</p>
                    <p className="text-base font-semibold text-gray-900">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link href="/" className="text-sm text-gray-500 hover:text-gray-800 inline-flex items-center gap-2">
                    <ArrowBigLeft className="w-4 h-4" /> Home
                  </Link>

                  <button
                    onClick={() => router.push("/dashboard")}
                    aria-label="Close onboarding"
                    className="p-2 rounded-md text-gray-400 hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <h1 className="text-2xl font-bold text-gray-900">Connect Instagram</h1>
                <p className="mt-2 text-sm text-gray-600 max-w-xl">
                  Link your Instagram Business or Creator account. We will only request the permissions
                  needed to publish content and read insights so you can schedule posts and view metrics.
                </p>
              </div>

              <div className="mt-6 space-y-5">
                <div className="rounded-lg border border-gray-100 bg-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 text-white">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Instagram</p>
                      <p className="text-xs text-gray-500">Business or Creator account</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleConnect}
                      disabled={connecting}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-300
                        ${connecting ? "bg-gray-50 text-gray-600 border border-gray-200 cursor-wait" : "bg-gradient-to-r from-pink-600 to-purple-600 text-white"}`}
                    >
                      {connecting ? (
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                      ) : (
                        <Instagram className="w-4 h-4" />
                      )}
                      {connecting ? "Connecting..." : "Connect"}
                    </button>
                  </div>
                </div>

                <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p className="font-medium text-gray-800 mb-2">What we will request</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Publish posts & stories on your behalf</li>
                    <li>Read profile & media insights</li>
                    <li>Optional: Manage messages for automation flows</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="w-full sm:w-auto px-4 py-2 rounded-md text-sm border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Skip
                  </button>

                  <button
                    onClick={handleConnect}
                    disabled={connecting}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full font-semibold shadow-md transition
                      ${connecting ? "bg-gray-50 text-gray-600" : "bg-gradient-to-r from-pink-600 to-purple-600 text-white"}`}
                  >
                    <Instagram className="w-4 h-4" />
                    {connecting ? "Connecting..." : "Connect Instagram"}
                  </button>
                </div>

                <p className="mt-3 text-xs text-gray-400">
                  By connecting you agree to AutomateFlow's <Link href="#" className="text-indigo-600">Terms</Link> and <Link href="#" className="text-indigo-600">Privacy Policy</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
