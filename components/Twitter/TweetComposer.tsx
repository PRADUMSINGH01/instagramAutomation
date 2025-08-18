// app/components/TweetScheduler.tsx

"use client";

import React from "react";
import { useState, FormEvent, useRef, ChangeEvent } from "react";

// --- Mock Session Data ---
// In a real Next.js app, you would use the `useSession` hook from "next-auth/react".
// For this component to be portable, we're simulating the session object.
const mockSession = {
  user: {
    name: "John Doe",
    image: "https://placehold.co/48x48/E2E8F0/4A5568?text=JD",
  },
};
const authStatus = "authenticated";
// -------------------------

// Define a type for the status states for better type safety
type Status = {
  state: "idle" | "loading" | "success" | "error";
  message: string;
};

// Define a type for the attached file
type AttachedFile = {
  file: File;
  previewUrl: string;
  type: "image" | "video";
};

// Reverted to a simple emoji array to resolve dependency issues.
const EMOJIS = [
  "😀", "😂", "😍", "🤔", "😊", "😎", "😢", "🙏", "👋", "🥳",
  "💡", "💻", "📱", "💰", "📈", "📉", "🔗", "📌", "🗓️", "⏰",
  "🚀", "🎉", "🔥", "👍", "❤️", "💯", "✅", "❌", "➡️", "⬅️",
  "🌍", "🌟", "☀️", "🌳", "�", "🐱", "👇", "👆", "👀", "💼"
];


// Circular progress component for character count
const CharacterCountCircle = ({ count, limit }: { count: number; limit: number }) => {
  const percentage = (count / limit) * 100;
  const strokeDasharray = 2 * Math.PI * 12; // Circumference of the circle
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;
  const isOverLimit = count > limit;
  const strokeColor = isOverLimit ? "#ef4444" : "#3b82f6";

  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <svg className="absolute w-full h-full" viewBox="0 0 28 28">
        <circle
          cx="14"
          cy="14"
          r="12"
          fill="transparent"
          stroke="#e5e7eb"
          strokeWidth="2.5"
        />
        <circle
          cx="14"
          cy="14"
          r="12"
          fill="transparent"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 14 14)"
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
      <span className={`text-xs font-semibold ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
        {limit - count}
      </span>
    </div>
  );
};


export default function TweetScheduler() {
  const session = mockSession;
  const [tweetText, setTweetText] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle", message: "" });
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      if (isImage || isVideo) {
        setAttachedFile({
          file,
          previewUrl: URL.createObjectURL(file),
          type: isImage ? "image" : "video",
        });
      } else {
        setStatus({ state: "error", message: "Only images and videos are allowed." });
      }
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const newText = text.substring(0, start) + emoji + text.substring(end);
      setTweetText(newText);
      textarea.focus();
      setTimeout(() => textarea.setSelectionRange(start + emoji.length, start + emoji.length), 0);
    }
    setShowEmojiPicker(false);
  };

  const handleScheduleTweet = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });

    const formData = new FormData();
    formData.append("tweetText", tweetText);
    formData.append("scheduleAt", scheduleDate);
    if (attachedFile) {
      formData.append("file", attachedFile.file);
    }

    const response = await fetch("/api/schedule", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      setStatus({ state: "success", message: "Tweet scheduled successfully!" });
      setTweetText("");
      setScheduleDate("");
      setAttachedFile(null);
    } else {
      setStatus({ state: "error", message: result.error || "Failed to schedule tweet." });
    }
  };
  
  if (authStatus !== "authenticated") {
    return <p className="text-center text-gray-600">Please sign in to schedule a post.</p>;
  }

  const charCount = tweetText.length;
  const charLimit = 280;
  const isButtonDisabled = status.state === "loading" || !tweetText.trim() || charCount > charLimit || !scheduleDate;

  return (
    <div className="max-w-2xl mx-auto my-8 p-4 sm:p-6 bg-white rounded-2xl shadow-2xl shadow-slate-200/70 border border-slate-100 font-sans">
      <form onSubmit={handleScheduleTweet}>
        <div className="flex items-start space-x-4">
          <img src={session.user.image} alt="User avatar" width={48} height={48} className="rounded-full flex-shrink-0" />
          <div className="w-full">
            <textarea
              ref={textareaRef}
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
              placeholder="What's happening?"
              rows={5}
              className="w-full p-2 text-xl border-none focus:ring-0 resize-none placeholder-gray-400 bg-transparent"
            />
          </div>
        </div>

        {attachedFile && (
          <div className="ml-16 mt-3 relative w-fit">
            {attachedFile.type === "image" ? (
              <img src={attachedFile.previewUrl} alt="Preview" className="rounded-2xl max-h-80 border border-gray-200" />
            ) : (
              <video src={attachedFile.previewUrl} controls className="rounded-2xl max-h-80 border border-gray-200" />
            )}
            <button
              type="button"
              onClick={() => setAttachedFile(null)}
              className="absolute top-2 right-2 bg-black bg-opacity-60 text-white rounded-full p-1.5 hover:bg-opacity-80 transition-opacity"
              aria-label="Remove attachment"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
        
        <div className="border-t border-gray-200 mt-4 pt-4"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 relative">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*,video/*" className="hidden" />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors" aria-label="Attach file">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </button>
            <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors" aria-label="Add emoji">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
            {showEmojiPicker && (
              <div className="absolute top-12 left-0 z-10 bg-white shadow-lg rounded-lg p-2 flex flex-wrap gap-2 w-64 border">
                 {EMOJIS.map(emoji => (
                  <button key={emoji} type="button" onClick={() => handleEmojiSelect(emoji)} className="text-2xl hover:bg-gray-200 rounded-md p-1">{emoji}</button>
                ))}
              </div>
            )}
             <div className="relative">
                <input type="datetime-local" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} min={getMinDateTime()} className="p-2 pl-10 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 w-48 text-sm text-gray-600" />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <CharacterCountCircle count={charCount} limit={charLimit} />
            <button type="submit" disabled={isButtonDisabled} className="px-6 py-2.5 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all transform hover:scale-105">
              {status.state === 'loading' ? 'Scheduling...' : 'Schedule'}
            </button>
          </div>
        </div>
      </form>
      {status.message && (
        <p className={`mt-4 text-center font-medium ${status.state === 'success' ? 'text-green-600' : 'text-red-600'}`} aria-live="polite">
          {status.message}
        </p>
      )}
    </div>
  );
}
