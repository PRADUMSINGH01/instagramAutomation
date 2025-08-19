"use client";
import { useState } from "react";
import {
  Instagram,
  Twitter,
  Linkedin,
  MessageSquare,
  ArrowBigLeft,
  User,
  CreditCard,
  PieChart,
  LayoutDashboard,
  Menu,
  PinIcon,
  X,
} from "lucide-react";
import Link from "next/link";

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // User data
  const user = {
    name: "Alex Morgan",
    email: "alex@example.com",
    plan: "Premium Plan",
    usage: "45% of 10k actions used",
    nextBilling: "May 15, 2025",
    avatar: "/avatar-placeholder.png",
  };

  // Social platforms data
  const platforms = [
    {
      name: "Instagram",
      Icon: Instagram,
      href: "/dashboard/automation/Instagram",
      description: "Schedule posts and stories",
    },
    {
      name: "WhatsApp",
      Icon: MessageSquare,
      href: "/dashboard/automation/Whatsapp",
      description: "Automate messages and campaigns",
    },
    {
      name: "Twitter",
      Icon: Twitter,
      href: "/dashboard/automation/Twitter",
      description: "Schedule tweets and threads",
    },
    {
      name: "LinkedIn",
      Icon: Linkedin,
      href: "/dashboard/automation/Linkdin",
      description: "Automate posts and engagement",
    },
    {
      name: "Pinterest",
      Icon: PinIcon,
      href: "/dashboard/automation/Pinterest",
      description: "Automate posts and engagement",
    },
  ];

  return (
    <div className="flex h-screen bg-white text-black">
      {/* Mobile Navigation Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md bg-black text-white shadow-md"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden 
          ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-black shadow-lg transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:transform-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-black">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold  text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                AutomateFlow
              </h1>
              <button
                className="lg:hidden text-black hover:text-red-600"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-6 flex items-center space-x-4 border-b border-black">
            <div className="bg-white border-2 border-dashed border-black rounded-xl w-16 h-16" />
            <div>
              <h2 className="font-medium">{user.name}</h2>
              <p className="text-sm text-gray-700">{user.email}</p>
            </div>
          </div>

          {/* Plan & Usage */}
          <div className="p-6 space-y-6 border-b border-black flex-1">
            <div>
              <div className="flex items-center text-sm text-gray-700 mb-1">
                <User className="w-4 h-4 mr-2" />
                <span>Current Plan</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">{user.plan}</span>
                <span className="px-2 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs rounded-full">
                  Active
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center text-sm text-gray-700 mb-1">
                <PieChart className="w-4 h-4 mr-2" />
                <span>Usage</span>
              </div>
              <p className="font-medium">{user.usage}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-black h-2 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center text-sm text-gray-700 mb-1">
                <CreditCard className="w-4 h-4 mr-2" />
                <span>Next Billing</span>
              </div>
              <p className="font-medium">{user.nextBilling}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="flex items-center p-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                >
                  <LayoutDashboard className="w-5 h-5 mr-3" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center p-3 border border-black rounded-lg hover:bg-gradient-to-r from-pink-500 to-purple-600 hover:text-white transition hover:border-white"
                >
                  <CreditCard className="w-5 h-5 mr-3" />
                  <span>Billing</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center p-3 border border-black rounded-lg hover:bg-gradient-to-r from-pink-500 to-purple-600 hover:border-white hover:text-white transition"
                >
                  <PieChart className="w-5 h-5 mr-3" />
                  <span>Usage</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 bg-white border-b border-black flex items-center justify-center">
          <h1 className="text-xl font-bold">AutomateFlow</h1>
        </div>

        <div className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8 sm:mb-12">
              <div className="flex items-center mb-2">
                <Link
                  href="/"
                  className="hidden sm:flex items-center mr-4 text-black hover:text-gray-700 transition-colors"
                >
                  <ArrowBigLeft className="w-5 h-5" />
                  <span className="ml-1">Back</span>
                </Link>
                <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  Choose your Automation
                </span>
              </div>
              <p className="text-gray-700 pl-0 sm:pl-9">
                Select a platform to configure automated workflows
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {platforms.map((platform, index) => (
                <Link key={index} href={platform.href}>
                  <div className="border-2 border-dashed border-transparent rounded-xl p-6 bg-white hover:bg-black hover:text-white transition-all shadow-md h-full">
                    <div className="flex items-center justify-between mb-4">
                      <platform.Icon className="w-8 h-8" />
                      <span className="text-xs font-medium px-2 py-1 rounded-full text-white bg-gradient-to-r from-pink-500 to-purple-600">
                        NEW
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                      {platform.name}
                    </h3>
                    <p className="text-sm opacity-80 mt-2">
                      {platform.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Back Button */}
            <div className="sm:hidden mt-8">
              <Link
                href="/"
                className="flex items-center justify-center w-full py-3 border border-black rounded-lg shadow-sm bg-white text-black hover:bg-black hover:text-white transition"
              >
                <ArrowBigLeft className="w-5 h-5 mr-2" />
                <span>Back to home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
