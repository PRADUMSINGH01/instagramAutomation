// components/Login.jsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/server/firebase/Clientfire";
import BackButton from "./buttoms/Goback";
export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const recaptchaVerifierRef = useRef(null);

  // Auto verify if already logged in (Firebase)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setLoading(true);
          const idToken = await user.getIdToken(true);
          await verifyIdTokenWithBackend(idToken);
        } catch (err) {
          console.error("Auto-login error:", err);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const verifyIdTokenWithBackend = async (idToken) => {
    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Backend sets secure cookie with UID; now redirect
        window.location.href = "/dashboard";
      } else {
        throw new Error(data.message || "Authentication failed");
      }
    } catch (err) {
      console.error("Token verification error:", err);
      setError(err?.message || "Verification failed");
      // sign out locally
      try {
        await auth.signOut();
      } catch (e) {
        console.error("Error signing out after failed verification", e);
      }
    }
  };

  const resetRecaptcha = () => {
    try {
      if (recaptchaVerifierRef.current) {
        // firebase RecaptchaVerifier has clear() method but types vary
        if (typeof recaptchaVerifierRef.current.clear === "function") {
          recaptchaVerifierRef.current.clear();
        }
      }
    } catch (e) {
      console.warn("recaptcha clear error", e);
    } finally {
      recaptchaVerifierRef.current = null;
    }
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic phone validation: +<countrycode><number>
    if (!phone || !/^\+\d{6,15}$/.test(phone.replace(/\s+/g, ""))) {
      setError(
        "Please enter a valid phone number with country code (e.g. +911234567890)"
      );
      setLoading(false);
      return;
    }

    try {
      // Clear old recaptcha if any
      resetRecaptcha();

      recaptchaVerifierRef.current = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );

      const confirmation = await signInWithPhoneNumber(
        auth,
        phone.replace(/\s+/g, ""),
        recaptchaVerifierRef.current
      );

      setConfirmationResult(confirmation);
      setShowOtp(true);
    } catch (err) {
      console.error("Phone auth error:", err);
      setError(err?.message || "Failed to send verification code");
      resetRecaptcha();
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit code");
      setLoading(false);
      return;
    }

    try {
      if (
        !confirmationResult ||
        typeof confirmationResult.confirm !== "function"
      ) {
        throw new Error(
          "No confirmation result available. Please resend code."
        );
      }

      const result = await confirmationResult.confirm(otp);
      const idToken = await result.user.getIdToken(true);
      await verifyIdTokenWithBackend(idToken);
    } catch (err) {
      console.error("OTP verification error:", err);
      setError(err?.message || "Invalid verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(true);
      await verifyIdTokenWithBackend(idToken);
    } catch (err) {
      console.error("Google auth error:", err);
      setError(err?.message || "Google authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <BackButton />
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Sign in
          </h2>
          <div className=" "></div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {!showOtp ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9876543210"
              className="w-full px-3 py-2 border rounded-md"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-md bg-pink-500  hover:bg-pink-700 text-white disabled:opacity-50"
            >
              {loading ? "Sending code..." : "Send Verification Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-white bg-gradient-to-br from-pink-500 to-blue-500">
              Verification Code
            </label>
            <input
              type="text"
              inputMode="numeric"
              required
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="123456"
              className="w-full px-3 py-2 border rounded-md"
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowOtp(false);
                  resetRecaptcha();
                }}
                className="flex-1 py-2 rounded-md border"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 rounded-md bg-gradient-to-br from-pink-500 to-blue-500 text-white disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>
            </div>
          </form>
        )}

        <div className="my-4 text-center text-sm text-gray-500">or</div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading || showOtp}
          className="w-full py-2 bg-white text-gray-700 border border-gray-300 rounded-md flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.754 12.276c0-.815-.073-1.6-.21-2.353H12.24v4.455h6.484c-.28 1.446-1.123 2.67-2.39 3.49v2.9h3.867c2.265-2.084 3.553-5.15 3.553-8.492z"
              fill="#4285F4"
            />
            <path
              d="M12.24 24c3.24 0 5.951-1.077 7.934-2.927l-3.867-2.9c-1.073.72-2.445 1.15-4.067 1.15-3.126 0-5.772-2.11-6.72-4.94H2.524v3.09C4.5 21.405 8.07 24 12.24 24z"
              fill="#34A853"
            />
            <path
              d="M5.52 14.383c-.24-.72-.377-1.49-.377-2.283s.137-1.563.377-2.283V6.727H2.524A11.96 11.96 0 0 0 .24 12.1c0 1.9.46 3.7 1.284 5.273l3.996-3.09z"
              fill="#FBBC05"
            />
            <path
              d="M12.24 4.747c1.767 0 3.353.61 4.603 1.807l3.447-3.447C18.19 1.13 15.48 0 12.24 0 8.07 0 4.5 2.595 2.524 6.727l3.996 3.09c.948-2.83 3.594-4.94 6.72-4.94z"
              fill="#EA4335"
            />
          </svg>
          <span className="font-medium">Sign in with Google</span>
        </button>

        <div id="recaptcha-container" />
      </div>
    </div>
  );
}
