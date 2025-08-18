"use client";

import { MessageCircle, Send, XCircle, Reply } from "lucide-react";

export default function StatsCards() {
  const stats = [
    {
      title: "Messages Sent",
      value: "1,250",
      icon: <Send className="w-6 h-6" />,
    },
    {
      title: "Not Sent",
      value: "45",
      icon: <XCircle className="w-6 h-6" />,
    },
    {
      title: "Received",
      value: "980",
      icon: <MessageCircle className="w-6 h-6" />,
    },
    {
      title: "Replies",
      value: "320",
      icon: <Reply className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6  text-black">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="border-2  p-6 bg-white rounded-2xl shadow-sm hover:shadow-sm transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-gray-100">{stat.icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-700">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
