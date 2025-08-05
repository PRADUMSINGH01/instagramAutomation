"use client";
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
} from "lucide-react";

// --- LOGIN POPUP COMPONENT ---
const LoginPopup = ({ isOpen, onClose }) => {
  // IMPORTANT: Replace these with your actual Instagram App ID and Redirect URI from the Meta Developer Dashboard.
  const INSTAGRAM_APP_ID = "YOUR_INSTAGRAM_APP_ID";
  const REDIRECT_URI = "https://your-app-callback-url.com/instagram-auth";

  // This is the URL for the Instagram OAuth dialog
  const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;

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
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-pink-600" />
              <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                Connect to Instagram
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                To get started, please log in with your Instagram account. We
                use the official Meta API for a secure connection.
              </p>
            </div>

            <div className="mt-8">
              <a
                href={instagramAuthUrl}
                className="w-full flex items-center justify-center px-4 py-3 font-semibold text-white rounded-lg transition-transform transform hover:scale-105"
                style={{
                  background:
                    "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                }}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="white"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.44c-3.116 0-3.474.011-4.69.068-2.698.123-3.912 1.33-4.034 4.034-.057 1.216-.068 1.574-.068 4.69s.011 3.474.068 4.69c.123 2.698 1.33 3.912 4.034 4.034 1.216.057 1.574.068 4.69.068s3.474-.011 4.69-.068c2.698-.123 3.912-1.33 4.034-4.034.057-1.216.068-1.574.068-4.69s-.011-3.474-.068-4.69c-.123-2.698-1.33-3.912-4.034-4.034-1.216-.057-1.574-.068-4.69-.068z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M12 6.837a5.163 5.163 0 100 10.326 5.163 5.163 0 000-10.326zm0 8.887a3.724 3.724 0 110-7.448 3.724 3.724 0 010 7.448z"
                    clipRule="evenodd"
                  />
                  <path d="M16.949 6.837a1.228 1.228 0 11-2.456 0 1.228 1.228 0 012.456 0z" />
                </svg>
                Log In with Instagram
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
              Instagram password.
            </li>
            <li>
              We do <span className="font-semibold">not</span> store your
              personal conversation data.
            </li>
            <li>
              This service uses the{" "}
              <span className="font-semibold">official Meta API</span> to ensure
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

// --- SIDEBAR (DESKTOP) ---
const Sidebar = ({ activePage, setActivePage, userRole }) => (
  <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
    <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-800 px-4">
      <MessageSquare className="h-8 w-8 text-pink-600" />
      <span className="ml-3 text-xl font-bold text-gray-800 dark:text-white">
        DM Automate
      </span>
    </div>
    <nav className="flex-1 px-4 py-6 space-y-2">
      <NavItem
        icon={Home}
        isActive={activePage === "Home"}
        onClick={() => setActivePage("Home")}
      >
        Home
      </NavItem>
      <NavItem
        icon={MessageCircle}
        isActive={activePage === "Comments"}
        onClick={() => setActivePage("Comments")}
      >
        Comments
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
        Users
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
                DM Automate
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-500 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-6 w-6" />
            </button>
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
              Home
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
              Users
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
const Header = ({ onMenuClick, theme, setTheme, setIsLoginOpen }) => {
  return (
    <header className="flex items-center justify-between h-20 px-4 sm:px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="md:hidden mr-3 p-2 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="hidden md:flex relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <button className="p-2 text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="h-5 w-5" />
        </button>
        <button
          onClick={() => setIsLoginOpen(true)}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-semibold text-sm"
        >
          Connect Instagram
        </button>
      </div>
    </header>
  );
};

// --- COMMENTS AUTOMATION COMPONENT ---
const CommentsAutomation = () => {
  // ... component code ...
  return <div></div>;
};

// --- BILLING COMPONENT ---
const Billing = () => {
  // ... component code ...
  return <div></div>;
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

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("Home");
  const [theme, setTheme] = useState("dark");
  const [showAlert, setShowAlert] = useState(false);
  const [userRole, setUserRole] = useState("pro"); // 'trial' or 'pro'
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
        return (
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {[
              {
                icon: DollarSign,
                title: "Total Revenue",
                value: "$4,294",
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
                title: "DMs Sent",
                value: "27k",
                iconColor: "text-pink-500",
              },
              {
                icon: CheckCircle,
                title: "Campaigns Done",
                value: "98",
                iconColor: "text-indigo-500",
              },
            ].map((item, index) => (
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
        );
      case "Comments":
        return <CommentsAutomation />;
      case "Billing":
        return <Billing />;
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
      <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <div className="flex min-h-screen">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          userRole={userRole}
        />
        <MobileMenu
          isOpen={isMobileMenuOpen}
          setIsOpen={setIsMobileMenuOpen}
          activePage={activePage}
          setActivePage={setActivePage}
          userRole={userRole}
        />

        <div className="flex flex-col flex-1 w-full min-w-0">
          <Header
            onMenuClick={() => setIsMobileMenuOpen(true)}
            theme={theme}
            setTheme={setTheme}
            setIsLoginOpen={setIsLoginOpen}
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
                {activePage === "Home" ? "Welcome Back, Admin!" : activePage}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1 mb-6">
                {activePage === "Home"
                  ? "Here's a snapshot of your DM campaigns."
                  : `Manage your ${activePage.toLowerCase()}.`}
              </p>
            </motion.div>

            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
