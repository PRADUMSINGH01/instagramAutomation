// src/app/page.jsx
"use client";
import React, { useState } from "react";
import {
  FiMessageSquare,
  FiFileText,
  FiSend,
  FiSettings,
  FiPlus,
  FiFilter,
  FiSearch,
  FiX,
  FiChevronDown,
  FiActivity,
  FiUsers,
  FiBarChart2,
} from "react-icons/fi";
import {
  FaRegPauseCircle,
  FaRegPlayCircle,
  FaRegEdit,
  FaRegTrashAlt,
  FaRegCommentDots,
  FaRegPaperPlane,
} from "react-icons/fa";
import ConnectInstagramButton from "@/components/buttoms/InstagramAuthButton";
const AutomationDashboard = () => {
  const [activeTab, setActiveTab] = useState("comment");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [triggerType, setTriggerType] = useState("keyword");
  const [triggerValue, setTriggerValue] = useState("");
  const [actionType, setActionType] = useState("reply");
  const [actionContent, setActionContent] = useState("");

  // Mock data for posts
  const posts = [
    {
      id: 1,
      title: "The Future of AI in Marketing",
      content:
        "Exploring how artificial intelligence is transforming digital marketing strategies.",
      date: "2023-10-15",
      likes: 245,
      comments: 32,
      platform: "Twitter",
    },
    {
      id: 2,
      title: "Summer Product Launch",
      content:
        "Introducing our new summer collection with innovative features.",
      date: "2023-09-22",
      likes: 189,
      comments: 24,
      platform: "Instagram",
    },
    {
      id: 3,
      title: "Company Culture Insights",
      content:
        "How we maintain a positive work environment in remote settings.",
      date: "2023-10-05",
      likes: 321,
      comments: 41,
      platform: "LinkedIn",
    },
    {
      id: 4,
      title: "Industry Trends Report",
      content: "Quarterly analysis of emerging trends in our industry.",
      date: "2023-09-30",
      likes: 178,
      comments: 19,
      platform: "Facebook",
    },
  ];

  const [automations, setAutomations] = useState([
    {
      id: 1,
      post: "The Future of AI in Marketing",
      trigger: 'Keyword: "AI strategy"',
      action: "Reply with resources",
      status: "active",
      date: "2023-10-15",
      type: "comment",
    },
    {
      id: 2,
      post: "Summer Product Launch",
      trigger: "Question about pricing",
      action: "Send pricing sheet",
      status: "paused",
      date: "2023-09-22",
      type: "comment",
    },
    {
      id: 3,
      post: "Company Culture Insights",
      trigger: "Positive feedback",
      action: "Thank + offer discount",
      status: "active",
      date: "2023-10-05",
      type: "comment",
    },
    {
      id: 4,
      post: "Industry Trends Report",
      trigger: "Request for data sources",
      action: "Send methodology doc",
      status: "active",
      date: "2023-09-30",
      type: "comment",
    },
  ]);

  const toggleAutomationStatus = (id) => {
    setAutomations(
      automations.map((auto) =>
        auto.id === id
          ? { ...auto, status: auto.status === "active" ? "paused" : "active" }
          : auto
      )
    );
  };

  const deleteAutomation = (id) => {
    setAutomations(automations.filter((auto) => auto.id !== id));
  };

  const openNewAutomation = () => {
    setIsModalOpen(true);
  };

  const handleCreateAutomation = () => {
    if (!selectedPost || !triggerValue || !actionContent) {
      alert("Please fill all required fields");
      return;
    }

    const newAutomation = {
      id: automations.length + 1,
      post: selectedPost.title,
      trigger: `${
        triggerType === "keyword" ? "Keyword" : "Question type"
      }: "${triggerValue}"`,
      action: `${
        actionType === "reply" ? "Reply" : "Send message"
      }: ${actionContent.substring(0, 20)}...`,
      status: "active",
      date: new Date().toISOString().split("T")[0],
      type: "comment",
    };

    setAutomations([...automations, newAutomation]);
    setIsModalOpen(false);

    // Reset form
    setSelectedPost(null);
    setTriggerType("keyword");
    setTriggerValue("");
    setActionType("reply");
    setActionContent("");
  };

  // Filter automations by type
  const filteredAutomations = automations.filter(
    (auto) => auto.type === activeTab
  );

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <ConnectInstagramButton />
        </div>

        <nav className="flex-1 py-4">
          <button
            onClick={() => setActiveTab("comment")}
            className={`flex items-center w-full px-6 py-3 text-sm font-medium transition-colors duration-200 ${
              activeTab === "comment"
                ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600"
                : "hover:bg-gray-50"
            }`}
          >
            <FiMessageSquare className="mr-3" />
            Comments
          </button>

          <button
            onClick={() => setActiveTab("post")}
            className={`flex items-center w-full px-6 py-3 text-sm font-medium transition-colors duration-200 ${
              activeTab === "post"
                ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600"
                : "hover:bg-gray-50"
            }`}
          >
            <FiFileText className="mr-3" />
            Posts
          </button>

          <button
            onClick={() => setActiveTab("dms")}
            className={`flex items-center w-full px-6 py-3 text-sm font-medium transition-colors duration-200 ${
              activeTab === "dms"
                ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600"
                : "hover:bg-gray-50"
            }`}
          >
            <FiSend className="mr-3" />
            DMs
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50">
            <FiSettings className="mr-3" />
            Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold capitalize">
            {activeTab} Automation
          </h2>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab} automations...`}
                className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
              />
            </div>
            {activeTab === "comment" && (
              <button
                onClick={openNewAutomation}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <FiPlus className="mr-2" />
                New Automation
              </button>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Comment Automation Section */}
          {activeTab === "comment" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Filters */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                    All
                  </button>
                  <button className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
                    Active
                  </button>
                  <button className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
                    Paused
                  </button>
                </div>
                <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                  <FiFilter className="mr-1" />
                  Filters
                </button>
              </div>

              {/* Automation Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Post
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trigger
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Added
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredAutomations.map((auto) => (
                      <tr key={auto.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          <div className="flex items-center">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                            <div>
                              <div className="font-medium">{auto.post}</div>
                              <div className="text-xs text-gray-500">
                                Social Media Post
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-700">
                          {auto.trigger}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-700">
                          {auto.action}
                        </td>
                        <td className="py-4 px-6 text-sm">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              auto.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {auto.status.charAt(0).toUpperCase() +
                              auto.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-500">
                          {auto.date}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => toggleAutomationStatus(auto.id)}
                              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                              title={
                                auto.status === "active" ? "Pause" : "Resume"
                              }
                            >
                              {auto.status === "active" ? (
                                <FaRegPauseCircle size={18} />
                              ) : (
                                <FaRegPlayCircle size={18} />
                              )}
                            </button>
                            <button
                              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                              title="Edit"
                            >
                              <FaRegEdit size={16} />
                            </button>
                            <button
                              onClick={() => deleteAutomation(auto.id)}
                              className="p-1.5 rounded-md hover:bg-red-50 text-gray-500 hover:text-red-600"
                              title="Delete"
                            >
                              <FaRegTrashAlt size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {filteredAutomations.length === 0 && (
                <div className="py-16 text-center">
                  <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No comment automations yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Create your first automation to get started
                  </p>
                  <button
                    onClick={openNewAutomation}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Create Automation
                  </button>
                </div>
              )}

              {/* Pagination */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">
                    {filteredAutomations.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {filteredAutomations.length}
                  </span>{" "}
                  results
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Post Automation Section */}
          {activeTab === "post" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="text-center py-12">
                <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                  <FiBarChart2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Post Automation
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  Automate your social media posts. Schedule content, analyze
                  performance, and optimize your posting strategy.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                      <FiActivity size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Scheduled Posts
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Create and schedule posts in advance for optimal
                      engagement
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                      <FiUsers size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Audience Targeting
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Target specific audience segments for each automated post
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                      <FiBarChart2 size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Performance Analytics
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Track engagement metrics and optimize your posting
                      strategy
                    </p>
                  </div>
                </div>
                <div className="mt-10">
                  <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                    <FiPlus className="mr-2 inline" />
                    Create Post Automation
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DM Automation Section */}
          {activeTab === "dms" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="text-center py-12">
                <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                  <FaRegPaperPlane size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Direct Message Automation
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  Automate your direct message responses. Engage with your
                  audience instantly and efficiently.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mb-4">
                      <FaRegCommentDots size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Auto Replies
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Set up automatic replies to common questions and messages
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4">
                      <FiUsers size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Lead Generation
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Capture leads through automated DM conversations
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                      <FiActivity size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Engagement Tracking
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Monitor response rates and engagement metrics
                    </p>
                  </div>
                </div>
                <div className="mt-10">
                  <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                    <FiPlus className="mr-2 inline" />
                    Create DM Automation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Comment Automation Modal */}
      {isModalOpen && activeTab === "comment" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Create Comment Automation</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Step 1: Select Post */}
                <div>
                  <h4 className="font-medium mb-3">1. Select a Post</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedPost?.id === post.id
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mr-3" />
                          <div>
                            <div className="font-medium">{post.title}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {post.content.substring(0, 60)}...
                            </div>
                            <div className="flex text-xs text-gray-500 mt-2">
                              <span className="mr-3">{post.date}</span>
                              <span className="mr-3">
                                ❤️ {post.likes} likes
                              </span>
                              <span>💬 {post.comments} comments</span>
                            </div>
                            <div className="mt-1">
                              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                                {post.platform}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 2: Define Trigger */}
                <div>
                  <h4 className="font-medium mb-3">2. Define Trigger</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex space-x-4 mb-4">
                      <button
                        onClick={() => setTriggerType("keyword")}
                        className={`px-4 py-2 rounded-lg ${
                          triggerType === "keyword"
                            ? "bg-indigo-600 text-white"
                            : "bg-white border border-gray-300"
                        }`}
                      >
                        Keyword Trigger
                      </button>
                      <button
                        onClick={() => setTriggerType("question")}
                        className={`px-4 py-2 rounded-lg ${
                          triggerType === "question"
                            ? "bg-indigo-600 text-white"
                            : "bg-white border border-gray-300"
                        }`}
                      >
                        Question Type
                      </button>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {triggerType === "keyword"
                          ? "Enter keywords (comma separated)"
                          : "Select question type"}
                      </label>

                      {triggerType === "keyword" ? (
                        <input
                          type="text"
                          value={triggerValue}
                          onChange={(e) => setTriggerValue(e.target.value)}
                          placeholder="e.g. pricing, discount, features"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      ) : (
                        <div className="relative">
                          <select
                            value={triggerValue}
                            onChange={(e) => setTriggerValue(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Select question type</option>
                            <option value="pricing">Pricing questions</option>
                            <option value="features">Feature questions</option>
                            <option value="support">Support questions</option>
                            <option value="availability">
                              Availability questions
                            </option>
                          </select>
                          <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      )}
                    </div>

                    <div className="text-sm text-gray-600">
                      {triggerType === "keyword"
                        ? "Automation will trigger when comment contains any of these keywords"
                        : "Automation will trigger when comment matches this question type"}
                    </div>
                  </div>
                </div>

                {/* Step 3: Define Action */}
                <div>
                  <h4 className="font-medium mb-3">3. Define Action</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex space-x-4 mb-4">
                      <button
                        onClick={() => setActionType("reply")}
                        className={`px-4 py-2 rounded-lg ${
                          actionType === "reply"
                            ? "bg-indigo-600 text-white"
                            : "bg-white border border-gray-300"
                        }`}
                      >
                        Reply to Comment
                      </button>
                      <button
                        onClick={() => setActionType("message")}
                        className={`px-4 py-2 rounded-lg ${
                          actionType === "message"
                            ? "bg-indigo-600 text-white"
                            : "bg-white border border-gray-300"
                        }`}
                      >
                        Send Direct Message
                      </button>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {actionType === "reply"
                          ? "Your reply message"
                          : "Direct message content"}
                      </label>
                      <textarea
                        value={actionContent}
                        onChange={(e) => setActionContent(e.target.value)}
                        placeholder={`Enter your ${
                          actionType === "reply" ? "reply" : "message"
                        } content here...`}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div className="text-sm text-gray-600">
                      {actionType === "reply"
                        ? "This message will be posted as a reply to the matching comment"
                        : "This message will be sent as a direct message to the user"}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateAutomation}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Create Automation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomationDashboard;
