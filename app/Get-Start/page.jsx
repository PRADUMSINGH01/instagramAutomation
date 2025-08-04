"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Lock,
  ArrowLeft,
  Mail,
  MessageSquare,
  Zap,
  ChevronRight,
  X,
  Clock,
  User,
  Check,
  Instagram,
} from "lucide-react";

const PhoneLoginPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [step, setStep] = useState(1); // 1: phone input, 2: OTP input
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  // Start countdown timer
  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (step === 2 && countdown === 0) {
      setIsResendDisabled(false);
    }

    return () => clearTimeout(timer);
  }, [step, countdown]);

  // Handle phone submission
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length < 10) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setCountdown(30);
      setIsResendDisabled(true);
    }, 1500);
  };

  // Handle OTP verification
  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) return;

    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      setIsVerified(true);

      // Reset after success
      setTimeout(() => {
        setIsVerified(false);
        setStep(1);
        setPhone("");
        setOtp(["", "", "", "", "", ""]);
      }, 2000);
    }, 1500);
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    if (!isResendDisabled) {
      setCountdown(30);
      setIsResendDisabled(true);
      // Simulate resend
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } transition-colors duration-300 flex flex-col`}
    >
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Login Form Container */}
          <div className="bg-white dark:bg-gray-825 rounded-2xl shadow-xl p-6 md:p-8">
            {/* Back button for OTP step */}
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="flex items-center text-gray-500 dark:text-gray-400 mb-6"
              >
                <ArrowLeft size={18} className="mr-2" />
                Back
              </button>
            )}

            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white mb-4">
                {step === 1 ? <Smartphone size={28} /> : <Lock size={28} />}
              </div>

              <motion.h2
                key={step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold"
              >
                {step === 1 ? "Welcome Back!" : "Verify Your Identity"}
              </motion.h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {step === 1
                  ? "Sign in with your phone number"
                  : "Enter the OTP sent to your phone"}
              </p>
            </div>

            {/* Phone Input Step */}
            {step === 1 && (
              <motion.form
                onSubmit={handlePhoneSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Smartphone className="text-gray-400" size={20} />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="Enter your phone number"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-775 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || phone.length < 10}
                  className={`w-full py-3 rounded-lg font-medium flex items-center justify-center ${
                    isLoading || phone.length < 10
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-500"
                      : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90"
                  } transition-all`}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      Continue
                      <ChevronRight className="ml-2" size={18} />
                    </>
                  )}
                </button>

                <div className="relative flex items-center justify-center my-6">
                  <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                  <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400">
                    or
                  </span>
                  <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                </div>

                <button
                  type="button"
                  className="w-full py-3 rounded-lg font-medium flex items-center justify-center bg-gray-100 dark:bg-gray-775 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Mail className="mr-2" size={18} />
                  Continue with Email
                </button>
              </motion.form>
            )}

            {/* OTP Verification Step */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* OTP Inputs */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Enter 6-digit OTP
                  </label>
                  <div className="flex justify-between space-x-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        maxLength={1}
                        className="w-full h-14 text-center text-xl bg-gray-50 dark:bg-gray-775 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        inputMode="numeric"
                      />
                    ))}
                  </div>
                </div>

                {/* Timer and Resend */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="mr-1" size={16} />
                    {countdown > 0 ? `Resend in ${countdown}s` : "Code expired"}
                  </div>

                  <button
                    onClick={handleResendOtp}
                    disabled={isResendDisabled || isLoading}
                    className={`text-sm font-medium ${
                      isResendDisabled || isLoading
                        ? "text-gray-400 dark:text-gray-500"
                        : "text-pink-500 hover:text-pink-600 dark:hover:text-pink-400"
                    }`}
                  >
                    Resend Code
                  </button>
                </div>

                {/* Verification Button */}
                <button
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otp.some((d) => d === "")}
                  className={`w-full py-3 rounded-lg font-medium flex items-center justify-center ${
                    isLoading || otp.some((d) => d === "")
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-500"
                      : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90"
                  } transition-all`}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Verify Account"
                  )}
                </button>
              </motion.div>
            )}
          </div>

          {/* Success Message */}
          {isVerified && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white dark:bg-gray-825 rounded-2xl p-8 max-w-sm text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center text-green-500 mb-4">
                  <Check size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Account Verified!</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  You've successfully logged in to your account.
                </p>
                <button
                  onClick={() => setIsVerified(false)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg"
                >
                  Continue to Dashboard
                </button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* Footer */}
    </div>
  );
};

export default PhoneLoginPage;
