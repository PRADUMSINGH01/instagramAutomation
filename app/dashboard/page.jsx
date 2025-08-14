"use client"
import { useState } from 'react';
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
  X
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
    avatar: "/avatar-placeholder.png"
  };

  // Social platforms data
  const platforms = [
    { 
      name: "Instagram", 
      Icon: Instagram, 
      href: "/automation/instagram",
      color: "bg-gradient-to-r from-pink-500 to-rose-600",
      description: "Schedule posts and stories"
    },
    { 
      name: "WhatsApp", 
      Icon: MessageSquare, 
      href: "/automation/whatsapp",
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      description: "Automate messages and campaigns"
    },
    { 
      name: "Twitter", 
      Icon: Twitter, 
      href: "/automation/twitter",
      color: "bg-gradient-to-r from-sky-400 to-blue-600",
      description: "Schedule tweets and threads"
    },
    { 
      name: "LinkedIn", 
      Icon: Linkedin, 
      href: "/automation/linkedin",
      color: "bg-gradient-to-r from-blue-700 to-indigo-800",
      description: "Automate posts and engagement"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Navigation Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md bg-white shadow-md text-gray-600"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar - Responsive */}
      <div 
        className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity lg:hidden 
          ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:transform-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800">AutomateFlow</h1>
              <button 
                className="lg:hidden text-gray-500 hover:text-gray-700"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-6 flex items-center space-x-4 border-b">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <div>
              <h2 className="font-medium text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Plan & Usage */}
          <div className="p-6 space-y-6 border-b flex-1">
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <User className="w-4 h-4 mr-2" />
                <span>Current Plan</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">{user.plan}</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Active</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <PieChart className="w-4 h-4 mr-2" />
                <span>Usage</span>
              </div>
              <p className="font-medium">{user.usage}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: '45%' }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
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
                <Link href="#" className="flex items-center p-3 text-blue-600 bg-blue-50 rounded-lg">
                  <LayoutDashboard className="w-5 h-5 mr-3" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <CreditCard className="w-5 h-5 mr-3" />
                  <span>Billing</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg">
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
        <div className="lg:hidden p-4 bg-white border-b flex items-center justify-center">
          <h1 className="text-xl font-bold text-gray-800">AutomateFlow</h1>
        </div>
        
        <div className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <div className="flex items-center mb-2">
                <Link href="/" className="hidden sm:flex items-center mr-4 text-gray-600 hover:text-gray-900 transition-colors">
                  <ArrowBigLeft className="w-5 h-5" />
                  <span className="ml-1">Back</span>
                </Link>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Choose your Automation</h1>
              </div>
              <p className="text-gray-600 pl-0 sm:pl-9">Select a platform to configure automated workflows</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {platforms.map((platform, index) => (
                <Link key={index} href={platform.href}>
                  <div className={`${platform.color} rounded-xl p-4 sm:p-6 text-white transition-transform hover:scale-[1.02] shadow-md h-full`}>
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <platform.Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                      <span className="text-xs font-medium px-2 py-1 bg-white/20 rounded-full">NEW</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold">{platform.name}</h3>
                    <p className="text-xs sm:text-sm opacity-80 mt-2">{platform.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Mobile Back Button */}
            <div className="sm:hidden mt-8">
              <Link href="/" className="flex items-center justify-center w-full py-3 bg-white border rounded-lg shadow-sm text-gray-700 hover:bg-gray-50">
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