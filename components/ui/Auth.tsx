"use client";

import { useState, useEffect, useRef } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "@/server/firebase /Clientfire";
import { FirebaseError } from "firebase/app";

// Import the phone number input component and its styles
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

// Extend the global Window interface for recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

// --- Main Login Component ---
export default function LoginPage() {
  // --- State Management ---
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [otp, setOtp] = useState<string>("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);

  // Ref for the reCAPTCHA container
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  // --- Effects ---
  useEffect(() => {
    if (!recaptchaContainerRef.current) return;

    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          recaptchaContainerRef.current,
          {
            size: "invisible",
            callback: () => {
              console.log("reCAPTCHA verified.");
            },
            "expired-callback": () => {
              console.log("reCAPTCHA expired.");
            },
          }
        );
      }
    } catch (err: unknown) {
      console.error("reCAPTCHA initialization error:", err);
      setError("Could not initialize verification. Please refresh.");
    }
  }, []);

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsOtpSent(true);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  // --- Helper Functions ---
  const resetState = () => {
    setError("");
    setLoading(false);
  };

  // --- API Handlers ---
  const handleSendOtp = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    resetState();

    if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
      setError("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    try {
      const verifier = window.recaptchaVerifier!;
      const result = await signInWithPhoneNumber(auth, phoneNumber, verifier);
      setConfirmationResult(result);
      setIsOtpSent(true);
      setTimer(60);
    } catch (err: unknown) {
      console.error("Error sending OTP:", err);
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetState();

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    if (!confirmationResult) {
      setError("Something went wrong. Please request a new OTP.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await confirmationResult.confirm(otp);
      const idToken = await userCredential.user.getIdToken();

      const apiResponse = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });

      const data = await apiResponse.json();

      if (apiResponse.ok && data.success) {
        window.location.href = "/dashboard";
      } else {
        throw new Error(data.message || "Server-side validation failed.");
      }
    } catch (err: unknown) {
      console.error("Error verifying OTP:", err);
      if (
        err instanceof FirebaseError &&
        err.code === "auth/invalid-verification-code"
      ) {
        setError("The OTP you entered is incorrect. Please try again.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to verify OTP.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- UI Rendering ---
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4 font-sans text-black">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tighter">
            {isOtpSent ? "Check your phone" : "Welcome"}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {isOtpSent
              ? `We sent a 6-digit code to ${phoneNumber}`
              : "Enter your phone number to sign in or create an account."}
          </p>
        </div>

        {!isOtpSent ? (
          <form className="space-y-6" onSubmit={handleSendOtp}>
            <div className="phone-input-container">
              <PhoneInput
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                defaultCountry="IN"
                international
                countryCallingCodeEditable={false}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-md bg-black text-white font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-300 transition-all duration-300"
            >
              {loading ? "Sending..." : "Send Code"}
            </button>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={handleVerifyOtp}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit code"
              maxLength={6}
              className="w-full px-4 py-3 text-center text-2xl tracking-[0.3em] rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-md bg-black text-white font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-300 transition-all duration-300"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>
        )}

        {isOtpSent && (
          <div className="text-center mt-6 text-sm">
            {timer > 0 ? (
              <p className="text-gray-500">
                Resend code in {String(Math.floor(timer / 60)).padStart(2, "0")}
                :{String(timer % 60).padStart(2, "0")}
              </p>
            ) : (
              <button
                onClick={() => handleSendOtp()}
                disabled={loading}
                className="text-black font-semibold hover:underline disabled:text-gray-400"
              >
                Resend Code
              </button>
            )}
          </div>
        )}

        <div ref={recaptchaContainerRef}></div>

        {error && (
          <p className="mt-4 text-center text-sm font-medium text-red-600 animate-pulse">
            {error}
          </p>
        )}
      </div>

      <style jsx global>{`
        .PhoneInput {
          width: 100%;
          display: flex;
          align-items: center;
        }
        .PhoneInputInput {
          flex: 1;
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.375rem;
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          transition: all 0.2s;
          font-size: 1rem;
        }
        .PhoneInputInput:focus {
          outline: none;
          border-color: #000000;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
        }
        .PhoneInputCountry {
          margin-right: 0.75rem;
          padding: 0.25rem;
          border-radius: 0.375rem;
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
        }
      `}</style>
    </main>
  );
}
