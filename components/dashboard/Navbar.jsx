"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Home,
  BarChart2,
  Users,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  DollarSign,
  UserPlus,
  CheckCircle,
  Sun,
  Moon,
  MessageCircle,
  Plus,
  Trash2,
  Edit,
  CreditCard,
  Download,
  Info,
  Lock,
  Zap,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Send,
  Share2,
  ThumbsUp,
  Heart,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

// --- LOGIN POPUP COMPONENT ---
const LoginPopup = ({ isOpen, onClose, platform }) => {
  // IMPORTANT: Replace these with your actual App ID and Redirect URI from the Developer Dashboard.
  const getPlatformDetails = () => {
    switch (platform) {
      case "Instagram":
        return {
          name: "Instagram",
          icon: <Instagram className="h-6 w-6 mr-2" />,
          color:
            "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
          authUrl: `https://api.instagram.com/oauth/authorize?client_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user_profile,user_media&response_type=code`,
        };
      case "WhatsApp":
        return {
          name: "WhatsApp",
          icon: <MessageSquare className="h-6 w-6 mr-2" />,
          color: "#25D366",
          authUrl: `https://api.whatsapp.com/oauth/authorize?client_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user_profile&response_type=code`,
        };
      case "Twitter":
        return {
          name: "Twitter",
          icon: <Twitter className="h-6 w-6 mr-2" />,
          color: "#1DA1F2",
          authUrl: `https://api.twitter.com/oauth/authorize?client_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI&scope=tweet.read%20tweet.write&response_type=code`,
        };
      case "Pinterest":
        return {
          name: "Pinterest",
          icon: <Bookmark className="h-6 w-6 mr-2" />,
          color: "#E60023",
          authUrl: `https://api.pinterest.com/oauth/authorize?client_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI&scope=boards:read%20pins:read&response_type=code`,
        };
      default:
        return {
          name: "Social Platform",
          icon: <Share2 className="h-6 w-6 mr-2" />,
          color: "#8B5CF6",
          authUrl: "#",
        };
    }
  };

  const platformDetails = getPlatformDetails();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            className="relative bg-white dark:bg-gray-900 w-full max-w-md m-4 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                {platformDetails.icon}
              </div>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                Connect to {platformDetails.name}
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                To get started, please log in with your {platformDetails.name}{" "}
                account. We use the official API for a secure connection.
              </p>
            </div>

            <div className="mt-8">
              <a
                href={platformDetails.authUrl}
                className="w-full flex items-center justify-center px-4 py-3 font-semibold text-white rounded-lg transition-transform transform hover:scale-105"
                style={{ background: platformDetails.color }}
              >
                {platformDetails.icon}
                Log In with {platformDetails.name}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- THEME TOGGLE ---
const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition-colors duration-200"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

// --- ALERT COMPONENT ---
const Alert = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.2 } }}
      className="bg-blue-100 dark:bg-blue-900/50 border-l-4 border-blue-500 text-blue-800 dark:text-blue-200 p-4 rounded-lg shadow-md mb-6"
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <Info className="h-5 w-5 text-blue-500" />
        </div>
        <div className="ml-3 flex-1">
          <p className="font-bold">Important Notice</p>
          <ul className="list-disc list-inside text-sm mt-1 space-y-1">
            <li>
              We will <span className="font-semibold">never</span> ask for your
              social media passwords.
            </li>
            <li>
              We do <span className="font-semibold">not</span> store your
              personal conversation data.
            </li>
            <li>
              This service uses{" "}
              <span className="font-semibold">official APIs</span> to ensure
              security.
            </li>
          </ul>
        </div>
        <button
          onClick={onClose}
          className="ml-3 -mr-1 -mt-1 p-1 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
};

// --- NAVIGATION ITEM ---
const NavItem = ({
  icon: Icon,
  children,
  isActive,
  onClick,
  isLocked = false,
}) => (
  <a
    href="#"
    onClick={isLocked ? (e) => e.preventDefault() : onClick}
    className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-pink-600 text-white shadow-lg"
        : isLocked
        ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`}
  >
    <div className="flex items-center">
      <Icon className="h-5 w-5" />
      <span className="ml-3">{children}</span>
    </div>
    {isLocked && (
      <span className="text-xs font-bold text-pink-500 bg-pink-100 dark:bg-pink-900/50 px-2 py-0.5 rounded-full flex items-center">
        <Lock className="h-3 w-3 mr-1" /> PRO
      </span>
    )}
  </a>
);

// --- STATS CARD ---
const StatCard = ({ icon: Icon, title, value, iconColor }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
    </div>
  </div>
);

// --- PLATFORM SELECTOR ---
const PlatformSelector = ({ platforms, activePlatform, setActivePlatform }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "Instagram":
        return <Instagram className="h-5 w-5" />;
      case "WhatsApp":
        return <MessageSquare className="h-5 w-5" />;
      case "Twitter":
        return <Twitter className="h-5 w-5" />;
      case "Pinterest":
        return <Bookmark className="h-5 w-5" />;
      default:
        return <Share2 className="h-5 w-5" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center">
          <div className="mr-3">{getPlatformIcon(activePlatform)}</div>
          <span className="font-semibold">{activePlatform}</span>
        </div>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <ul>
              {platforms.map((platform) => (
                <li key={platform}>
                  <button
                    onClick={() => {
                      setActivePlatform(platform);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 flex items-center text-sm ${
                      activePlatform === platform
                        ? "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="mr-3">{getPlatformIcon(platform)}</div>
                    {platform}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- SIDEBAR (DESKTOP) ---
const Sidebar = ({
  activePage,
  setActivePage,
  userRole,
  platforms,
  activePlatform,
  setActivePlatform,
}) => (
  <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
    <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-800 px-4">
      <div className="flex items-center">
        <MessageSquare className="h-8 w-8 text-pink-600" />
        <span className="ml-3 text-xl font-bold text-gray-800 dark:text-white">
          Social Automate
        </span>
      </div>
    </div>
    <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-800">
      <PlatformSelector
        platforms={platforms}
        activePlatform={activePlatform}
        setActivePlatform={setActivePlatform}
      />
    </div>
    <nav className="flex-1 px-4 py-6 space-y-2">
      <NavItem
        icon={Home}
        isActive={activePage === "Home"}
        onClick={() => setActivePage("Home")}
      >
        Dashboard
      </NavItem>

      <NavItem
        icon={CreditCard}
        isActive={activePage === "Billing"}
        onClick={() => setActivePage("Billing")}
      >
        Billing
      </NavItem>
      <NavItem
        icon={BarChart2}
        isActive={activePage === "Analytics"}
        onClick={() => setActivePage("Analytics")}
        isLocked={userRole === "trial"}
      >
        Analytics
      </NavItem>
      <NavItem
        icon={Users}
        isActive={activePage === "Users"}
        onClick={() => setActivePage("Users")}
      >
        Team
      </NavItem>
      <NavItem
        icon={Settings}
        isActive={activePage === "Settings"}
        onClick={() => setActivePage("Settings")}
      >
        Settings
      </NavItem>
    </nav>
  </aside>
);

// --- MOBILE MENU ---
const MobileMenu = ({
  isOpen,
  setIsOpen,
  activePage,
  setActivePage,
  userRole,
  platforms,
  activePlatform,
  setActivePlatform,
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="md:hidden fixed inset-0 z-50 flex"
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-pink-600" />
              <span className="ml-3 text-xl font-bold text-gray-800 dark:text-white">
                Social Automate
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-500 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-800">
            <PlatformSelector
              platforms={platforms}
              activePlatform={activePlatform}
              setActivePlatform={setActivePlatform}
            />
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            <NavItem
              icon={Home}
              isActive={activePage === "Home"}
              onClick={() => {
                setActivePage("Home");
                setIsOpen(false);
              }}
            >
              Dashboard
            </NavItem>
            <NavItem
              icon={MessageCircle}
              isActive={activePage === "Comments"}
              onClick={() => {
                setActivePage("Comments");
                setIsOpen(false);
              }}
            >
              Comments
            </NavItem>
            <NavItem
              icon={Send}
              isActive={activePage === "DMs"}
              onClick={() => {
                setActivePage("DMs");
                setIsOpen(false);
              }}
            >
              Direct Messages
            </NavItem>
            <NavItem
              icon={CreditCard}
              isActive={activePage === "Billing"}
              onClick={() => {
                setActivePage("Billing");
                setIsOpen(false);
              }}
            >
              Billing
            </NavItem>
            <NavItem
              icon={BarChart2}
              isActive={activePage === "Analytics"}
              onClick={() => {
                setActivePage("Analytics");
                setIsOpen(false);
              }}
              isLocked={userRole === "trial"}
            >
              Analytics
            </NavItem>
            <NavItem
              icon={Users}
              isActive={activePage === "Users"}
              onClick={() => {
                setActivePage("Users");
                setIsOpen(false);
              }}
            >
              Team
            </NavItem>
            <NavItem
              icon={Settings}
              isActive={activePage === "Settings"}
              onClick={() => {
                setActivePage("Settings");
                setIsOpen(false);
              }}
            >
              Settings
            </NavItem>
          </nav>
        </motion.div>
        <div
          className="flex-1 bg-black/60"
          onClick={() => setIsOpen(false)}
        ></div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- HEADER ---
const Header = ({
  onMenuClick,
  theme,
  setTheme,
  setIsLoginOpen,
  activePlatform,
}) => {
  return (
    <header className="flex items-center justify-between h-20 px-4 sm:px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="md:hidden mr-3 p-2 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="hidden md:flex items-center">
          {activePlatform === "Instagram" && (
            <Instagram className="h-6 w-6 text-pink-600 mr-2" />
          )}
          {activePlatform === "WhatsApp" && (
            <MessageSquare className="h-6 w-6 text-green-600 mr-2" />
          )}
          {activePlatform === "Twitter" && (
            <Twitter className="h-6 w-6 text-blue-500 mr-2" />
          )}
          {activePlatform === "Pinterest" && (
            <Bookmark className="h-6 w-6 text-red-600 mr-2" />
          )}
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {activePlatform} Automation
          </h2>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="relative md:hidden">
          <div className="flex items-center text-gray-800 dark:text-gray-200">
            {activePlatform === "Instagram" && (
              <Instagram className="h-5 w-5 text-pink-600 mr-1" />
            )}
            {activePlatform === "WhatsApp" && (
              <MessageSquare className="h-5 w-5 text-green-600 mr-1" />
            )}
            {activePlatform === "Twitter" && (
              <Twitter className="h-5 w-5 text-blue-500 mr-1" />
            )}
            {activePlatform === "Pinterest" && (
              <Bookmark className="h-5 w-5 text-red-600 mr-1" />
            )}
            <span className="font-medium">{activePlatform}</span>
          </div>
        </div>
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <button className="p-2 text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="h-5 w-5" />
        </button>
        <button
          onClick={() => setIsLoginOpen(true)}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-semibold text-sm flex items-center"
        >
          <Send className="h-4 w-4 mr-1" />
          Connect
        </button>
      </div>
    </header>
  );
};

// --- COMMENTS AUTOMATION COMPONENT ---
const CommentsAutomation = ({ platform }) => {
  const [comments, setComments] = useState([
    { id: 1, text: "Awesome post! Keep it up. 👍" },
    { id: 2, text: "Love this! ❤️" },
    { id: 3, text: "Great content, thanks for sharing!" },
  ]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    setComments([...comments, { id: Date.now(), text: newComment }]);
    setNewComment("");
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleUpdateComment = () => {
    if (!editingComment || editingComment.text.trim() === "") return;
    setComments(
      comments.map((comment) =>
        comment.id === editingComment.id ? editingComment : comment
      )
    );
    setEditingComment(null);
  };

  const getPlatformSpecificContent = () => {
    if (platform === "Instagram") {
      return {
        title: "Instagram Comment Automation",
        placeholder: "Add a new comment for Instagram posts...",
        description:
          "Automatically comment on new posts with your predefined messages.",
      };
    } else if (platform === "Twitter") {
      return {
        title: "Twitter Reply Automation",
        placeholder: "Add a new reply for Twitter tweets...",
        description: "Automatically reply to tweets that match your keywords.",
      };
    } else if (platform === "Pinterest") {
      return {
        title: "Pinterest Comment Automation",
        placeholder: "Add a new comment for Pinterest pins...",
        description: "Automatically comment on relevant pins in your niche.",
      };
    } else {
      return {
        title: "Comment Automation",
        placeholder: "Add a new comment...",
        description:
          "Automatically comment on posts with your predefined messages.",
      };
    }
  };

  const platformContent = getPlatformSpecificContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {platformContent.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {platformContent.description}
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={platformContent.placeholder}
              className="w-full sm:w-auto flex-grow py-2 px-3 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              onClick={handleAddComment}
              className="p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 shadow-md"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center"
            >
              {editingComment && editingComment.id === comment.id ? (
                <input
                  type="text"
                  value={editingComment.text}
                  onChange={(e) =>
                    setEditingComment({
                      ...editingComment,
                      text: e.target.value,
                    })
                  }
                  className="w-full sm:w-auto flex-grow py-2 px-3 text-gray-800 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 mb-2 sm:mb-0"
                  onKeyDown={(e) => e.key === "Enter" && handleUpdateComment()}
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-300 flex-grow mb-2 sm:mb-0">
                  {comment.text}
                </p>
              )}
              <div className="flex items-center space-x-2 self-end sm:self-center">
                {editingComment && editingComment.id === comment.id ? (
                  <button
                    onClick={handleUpdateComment}
                    className="p-2 text-green-500 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingComment(comment)}
                    className="p-2 text-blue-500 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="p-2 text-red-500 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">
              No automated comments yet. Add one above!
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// --- BILLING PAGE COMPONENT ---
const BillingPage = () => {
  // Same as before
  // ... (omitted for brevity)
};

// --- UPGRADE NOTICE COMPONENT ---
const UpgradeNotice = ({ setActivePage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800"
    >
      <div className="mx-auto bg-pink-100 dark:bg-pink-900/50 h-12 w-12 rounded-full flex items-center justify-center">
        <Lock className="h-6 w-6 text-pink-600" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
        Analytics is a Pro Feature
      </h3>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Upgrade your plan to unlock detailed analytics, track your performance,
        and grow your audience.
      </p>
      <button
        onClick={() => setActivePage("Billing")}
        className="mt-6 px-5 py-2.5 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center mx-auto"
      >
        <Zap className="h-5 w-5 mr-2" />
        Upgrade to Pro
      </button>
    </motion.div>
  );
};

// --- PLATFORM DASHBOARD VIEW ---
const PlatformDashboard = ({ platform }) => {
  // Sample data for demonstration
  const stats = {
    Instagram: [
      {
        icon: DollarSign,
        title: "Engagement Rate",
        value: "4.8%",
        iconColor: "text-blue-500",
      },
      {
        icon: UserPlus,
        title: "New Followers",
        value: "1,203",
        iconColor: "text-green-500",
      },
      {
        icon: MessageSquare,
        title: "Comments",
        value: "1,892",
        iconColor: "text-pink-500",
      },
      {
        icon: ThumbsUp,
        title: "Likes",
        value: "27.4k",
        iconColor: "text-indigo-500",
      },
    ],
    Twitter: [
      {
        icon: DollarSign,
        title: "Engagement Rate",
        value: "2.3%",
        iconColor: "text-blue-500",
      },
      {
        icon: UserPlus,
        title: "New Followers",
        value: "847",
        iconColor: "text-green-500",
      },
      {
        icon: MessageSquare,
        title: "Replies",
        value: "1,203",
        iconColor: "text-pink-500",
      },
      {
        icon: Heart,
        title: "Likes",
        value: "9.8k",
        iconColor: "text-indigo-500",
      },
    ],
    Pinterest: [
      {
        icon: DollarSign,
        title: "Engagement Rate",
        value: "1.7%",
        iconColor: "text-blue-500",
      },
      {
        icon: UserPlus,
        title: "New Followers",
        value: "432",
        iconColor: "text-green-500",
      },
      {
        icon: MessageSquare,
        title: "Comments",
        value: "567",
        iconColor: "text-pink-500",
      },
      {
        icon: Bookmark,
        title: "Saves",
        value: "4.2k",
        iconColor: "text-indigo-500",
      },
    ],
    WhatsApp: [
      {
        icon: DollarSign,
        title: "Engagement Rate",
        value: "8.2%",
        iconColor: "text-blue-500",
      },
      {
        icon: UserPlus,
        title: "New Contacts",
        value: "328",
        iconColor: "text-green-500",
      },
      {
        icon: MessageSquare,
        title: "Messages",
        value: "2,843",
        iconColor: "text-pink-500",
      },
      {
        icon: CheckCircle,
        title: "Replies",
        value: "1,924",
        iconColor: "text-indigo-500",
      },
    ],
  };

  const getPlatformStats = stats[platform] || stats.Instagram;

  return (
    <div>
      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {getPlatformStats.map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <StatCard {...item} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-start p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-2 mr-4">
                {platform === "Instagram" && (
                  <Instagram className="h-5 w-5 text-pink-600" />
                )}
                {platform === "Twitter" && (
                  <Twitter className="h-5 w-5 text-blue-500" />
                )}
                {platform === "Pinterest" && (
                  <Bookmark className="h-5 w-5 text-red-600" />
                )}
                {platform === "WhatsApp" && (
                  <MessageSquare className="h-5 w-5 text-green-500" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  New comment posted
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Your automated comment was posted on a relevant post.
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  2 hours ago
                </p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const platforms = ["Instagram", "WhatsApp", "Twitter", "Pinterest"];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("Home");
  const [theme, setTheme] = useState("dark");
  const [showAlert, setShowAlert] = useState(false);
  const [userRole, setUserRole] = useState("pro"); // 'trial' or 'pro'
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activePlatform, setActivePlatform] = useState("Instagram");

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    root.classList.toggle("light", !isDark);
  }, [theme]);

  useEffect(() => {
    const alertShown = sessionStorage.getItem("dmAutomateAlertShown");
    if (!alertShown) {
      setShowAlert(true);
    }
  }, []);

  const handleCloseAlert = () => {
    setShowAlert(false);
    sessionStorage.setItem("dmAutomateAlertShown", "true");
  };

  const renderContent = () => {
    switch (activePage) {
      case "Home":
        return <PlatformDashboard platform={activePlatform} />;
      case "Comments":
        return <CommentsAutomation platform={activePlatform} />;
      case "Billing":
        return <BillingPage />;
      case "Analytics":
        if (userRole === "trial") {
          return <UpgradeNotice setActivePage={setActivePage} />;
        }
        return (
          <div className="mt-8 bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Analytics
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Analytics charts and data go here.
            </p>
          </div>
        );
      default:
        return (
          <div className="mt-8 bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Content for {activePage}
            </h2>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-100 font-sans">
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        platform={activePlatform}
      />
      <div className="flex min-h-screen">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          userRole={userRole}
          platforms={platforms}
          activePlatform={activePlatform}
          setActivePlatform={setActivePlatform}
        />
        <MobileMenu
          isOpen={isMobileMenuOpen}
          setIsOpen={setIsMobileMenuOpen}
          activePage={activePage}
          setActivePage={setActivePage}
          userRole={userRole}
          platforms={platforms}
          activePlatform={activePlatform}
          setActivePlatform={setActivePlatform}
        />

        <div className="flex flex-col flex-1 w-full min-w-0">
          <Header
            onMenuClick={() => setIsMobileMenuOpen(true)}
            theme={theme}
            setTheme={setTheme}
            setIsLoginOpen={setIsLoginOpen}
            activePlatform={activePlatform}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <AnimatePresence>
              {showAlert && <Alert onClose={handleCloseAlert} />}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {activePage === "Home"
                  ? `${activePlatform} Dashboard`
                  : activePage}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1 mb-6">
                {activePage === "Home"
                  ? `Manage your ${activePlatform} automation and campaigns`
                  : `Manage your ${activePlatform} ${activePage.toLowerCase()} automation`}
              </p>
            </motion.div>

            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
