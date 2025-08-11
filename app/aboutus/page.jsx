import React from "react";
// Assuming you have Lucide React for icons. If not, you can use SVGs or other icon libraries.
import { Zap, Target, Clock, Users } from "lucide-react";

// Main App Component
export default function App() {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 font-sans">
      <AboutUs />
    </div>
  );
}

// About Us Component for Zapchat.world
function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto bg-gray-800 text-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-8 md:p-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            About Zapchat.world
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            We put your Instagram on autopilot, so you can focus on what
            matters.
          </p>
        </header>

        <main>
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-100">
                Who We Are
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Welcome to{" "}
                <span className="font-semibold text-purple-400">
                  Zapchat.world
                </span>
                , the future of social media management. We are a team of
                developers, marketers, and social media experts passionate about
                helping creators, brands, and influencers unlock their full
                potential on Instagram.
              </p>
              <p className="text-gray-400 leading-relaxed">
                In a world where time is your most valuable asset, we believe
                that automation is the key to sustainable growth. Our mission is
                to provide powerful, intuitive, and safe automation tools that
                handle the repetitive tasks, allowing you to focus on creating
                amazing content and building genuine connections with your
                audience.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50"></div>
                <Zap className="relative w-full h-full text-white p-8" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-8">
            <h2 className="text-3xl font-semibold text-center mb-8 text-gray-100">
              Why Automate With Us?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1: Time Saving */}
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-purple-500/20 p-4 rounded-full mb-4">
                  <Clock className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-200">
                  Save Countless Hours
                </h3>
                <p className="text-gray-400">
                  Stop wasting time on repetitive tasks like following,
                  unfollowing, and liking. Our system handles it all, 24/7.
                </p>
              </div>

              {/* Feature 2: Smarter Growth */}
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-pink-500/20 p-4 rounded-full mb-4">
                  <Target className="w-8 h-8 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-200">
                  Targeted Engagement
                </h3>
                <p className="text-gray-400">
                  Reach your ideal audience by automating interactions based on
                  hashtags, locations, and competitor accounts.
                </p>
              </div>

              {/* Feature 3: Audience Growth */}
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-teal-500/20 p-4 rounded-full mb-4">
                  <Users className="w-8 h-8 text-teal-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-200">
                  Grow Your Following
                </h3>
                <p className="text-gray-400">
                  Attract real, interested followers organically and watch your
                  community and influence expand effortlessly.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
