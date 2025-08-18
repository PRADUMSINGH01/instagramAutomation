"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import {
  LayoutDashboard,
  Instagram,
  MessageCircle,
  FileText,
  MessageSquare,
  Settings,
  User,
  ChevronDown,
  Check,
  X,
  Plus,
  Search,
  Bell,
  BarChart2,
  Send,
  Calendar,
  MessageSquareMore,
  ArrowRight,
  ChevronRight,
  Mail,
  Image,
  ThumbsUp,
  List,
  Link as LinkIcon,
  Globe,
  Bookmark,
  LogOut,
  Loader2,
  AlertTriangle,
  Menu,
} from "lucide-react";
import DM_AUTOMATION from "@/components/Instagram/dmauto";
import POST_AUTOMATION from "@/components/Instagram/postauto";
import COMMENT_AUTOMATION from "@/components/Instagram/commentauto";
// ============================================================================
// FILE: src/constants/index.js
// ============================================================================

export const PATHS = {
  DASHBOARD: "/",
  INSTAGRAM: "/instagram",
  DM_AUTOMATION: "/dm-automation",
  POST_AUTOMATION: "/post-automation",
  COMMENT_AUTOMATION: "/comment-automation",
  SETTINGS: "/settings",
};

export const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: PATHS.DASHBOARD },
  { icon: Instagram, label: "Instagram", path: PATHS.INSTAGRAM },
  { icon: MessageCircle, label: "DM Automation", path: PATHS.DM_AUTOMATION },
  { icon: FileText, label: "Post Automation", path: PATHS.POST_AUTOMATION },
  {
    icon: MessageSquare,
    label: "Comment Automation",
    path: PATHS.COMMENT_AUTOMATION,
  },
  { icon: Settings, label: "Settings", path: PATHS.SETTINGS },
];

// ============================================================================
// FILE: src/context/AppContext.jsx
// ============================================================================

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user] = useState({ name: "Sarah Johnson", plan: "Premium" });
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [activePage, setActivePage] = useState(PATHS.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleConnect = () => {
    if (isConnected) return;
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 1500);
  };

  const handleDisconnect = () => setIsConnected(false);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((prevState) => !prevState);

  const value = {
    user,
    isConnected,
    isConnecting,
    handleConnect,
    handleDisconnect,
    activePage,
    setActivePage,
    isSidebarOpen,
    closeSidebar,
    toggleSidebar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

// ============================================================================
// FILE: src/components/ui/Card.jsx
// ============================================================================

/**
 * A reusable card component with consistent styling.
 * @param {{children: React.ReactNode, className?: string}} props
 */
const Card = ({ children, className = "" }) => (
  <div
    className={`border border-dotted border-black rounded-xl bg-white p-6 ${className}`}
  >
    {children}
  </div>
);

// ============================================================================
// FILE: src/components/ui/Modal.jsx
// ============================================================================

/**
 * A responsive modal dialog component.
 * @param {{isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode}} props
 */
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl border border-dotted border-black p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

// ============================================================================
// FILE: src/components/shared/StatCard.jsx
// ============================================================================

/**
 * Displays a single statistic with an icon, label, value, and change.
 * @param {{icon: React.ElementType, label: string, value: string, change: string, isLoading: boolean}} props
 */
export const StatCard = ({ icon: Icon, label, value, change, isLoading }) => {
  if (isLoading) return <StatCard.Skeleton />;

  return (
    <Card className="p-5 flex items-center gap-4">
      <div className="bg-zinc-100 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-black" />
      </div>
      <div>
        <p className="text-sm text-zinc-600">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold">{value}</p>
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
    </Card>
  );
};

/**
 * A skeleton loader for the StatCard component.
 */
StatCard.Skeleton = () => (
  <div className="border border-dotted border-black rounded-xl bg-white p-5 flex items-center gap-4 animate-pulse">
    <div className="bg-zinc-200 rounded-lg w-12 h-12"></div>
    <div className="flex-1">
      <div className="h-4 bg-zinc-200 rounded w-3/4 mb-2"></div>
      <div className="h-6 bg-zinc-200 rounded w-1/2"></div>
    </div>
  </div>
);

// ============================================================================
// FILE: src/components/shared/SectionHeader.jsx
// ============================================================================

/**
 * A header for a page section with a title, icon, and optional action button.
 * @param {{icon: React.ElementType, title: string, actionText?: string, onActionClick?: () => void}} props
 */
export const SectionHeader = ({
  icon: Icon,
  title,
  actionText,
  onActionClick,
}) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
    <h2 className="text-2xl font-bold flex items-center gap-3">
      <Icon className="w-7 h-7 text-black" />
      {title}
    </h2>
    {actionText && (
      <button
        onClick={onActionClick}
        className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-zinc-800 transition-colors whitespace-nowrap"
      >
        <Plus className="w-4 h-4" />
        {actionText}
      </button>
    )}
  </div>
);

// ============================================================================
// FILE: src/components/layout/Sidebar.jsx
// ============================================================================

const Sidebar = () => {
  const { user, activePage, setActivePage, closeSidebar } = useAppContext();

  const handleNavClick = (path) => {
    setActivePage(path);
    closeSidebar(); // Close sidebar on mobile after navigation
  };

  return (
    <aside className="w-64 border-r border-dotted border-black p-6 flex flex-col bg-white h-full">
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-black p-2 rounded-lg">
          <Instagram className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold">InstaAuto</h1>
      </div>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavClick(item.path)}
            className={`flex items-center justify-between text-left gap-3 p-3 rounded-xl transition-colors w-full ${
              activePage === item.path
                ? "bg-black text-white"
                : "hover:bg-zinc-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        ))}
      </nav>
      <div className="mt-auto p-4 bg-white rounded-xl border border-dotted border-black">
        <div className="flex items-center gap-3">
          <div className="bg-zinc-100 border-2 border-dashed rounded-xl w-10 h-10" />
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-zinc-600">Admin Account</p>
          </div>
        </div>
        <button className="mt-3 w-full flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-100 transition-colors text-left">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

// ============================================================================
// FILE: src/components/layout/Topbar.jsx
// ============================================================================

const Topbar = () => {
  const { user, toggleSidebar } = useAppContext();
  return (
    <header className="border-b border-dotted border-black p-4 flex justify-between items-center bg-white">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-full hover:bg-zinc-100 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg sm:text-2xl font-bold flex items-center gap-2">
          <Instagram className="w-6 h-6" />
          <span className="hidden sm:inline">Instagram Automation</span>
        </h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="p-2 rounded-full hover:bg-zinc-100 transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-zinc-100 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-black flex-shrink-0"></div>
          <div className="hidden sm:block">
            <p className="font-medium text-sm whitespace-nowrap">{user.name}</p>
            <p className="text-xs text-zinc-600">{user.plan} Plan</p>
          </div>
          <ChevronDown className="w-4 h-4 hidden sm:block" />
        </div>
      </div>
    </header>
  );
};

// ============================================================================
// FILE: src/components/layout/AppLayout.jsx
// ============================================================================

const AppLayout = ({ children }) => {
  const { isSidebarOpen, closeSidebar } = useAppContext();

  return (
    <div className="min-h-screen flex text-black font-sans bg-zinc-50">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

// ============================================================================
// FILE: src/pages/DashboardPage.jsx
// ============================================================================

const DashboardPage = () => {
  const { isConnected, isConnecting, handleConnect, setActivePage } =
    useAppContext();
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setStats([
        {
          label: "Engagement Rate",
          value: "4.8%",
          change: "+12%",
          icon: BarChart2,
        },
        { label: "Followers", value: "24.5K", change: "+320", icon: User },
        {
          label: "Avg. Response Time",
          value: "23 min",
          change: "-8 min",
          icon: MessageCircle,
        },
      ]);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <StatCard.Skeleton />
            <StatCard.Skeleton />
            <StatCard.Skeleton />
          </>
        ) : (
          stats.map((stat) => <StatCard key={stat.label} {...stat} />)
        )}
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-zinc-100 text-black">
            <Instagram className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold">Instagram Connection</h2>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-zinc-700">
            {isConnected
              ? "Your account @sarahjohnson is connected and ready for automation."
              : "Connect your Instagram account to unlock automation features."}
          </p>
          <button
            onClick={handleConnect}
            disabled={isConnected || isConnecting}
            className={`px-4 py-2 border border-black rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
              isConnected
                ? "bg-zinc-100 text-black cursor-default"
                : "hover:bg-black hover:text-white"
            } ${isConnecting ? "opacity-75" : ""}`}
          >
            {isConnecting ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" /> Connecting...
              </>
            ) : (
              <>
                {isConnected ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}{" "}
                {isConnected ? "Connected" : "Connect Account"}
              </>
            )}
          </button>
        </div>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-4">Get Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="flex flex-col gap-4 transition-transform duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-zinc-100">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">DM Automation</h2>
            </div>
            <p className="text-zinc-700 flex-grow">
              Automate your direct messaging workflow with personalized
              responses.
            </p>
            <button
              onClick={() => setActivePage(PATHS.DM_AUTOMATION)}
              className="px-4 py-2 border border-black rounded-lg flex items-center gap-2 w-fit transition-colors hover:bg-black hover:text-white"
            >
              <Send className="w-4 h-4" />
              Setup DM Flow
            </button>
          </Card>
          <Card className="flex flex-col gap-4 transition-transform duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-zinc-100">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Post Automation</h2>
            </div>
            <p className="text-zinc-700 flex-grow">
              Schedule and automate your posts for optimal engagement.
            </p>
            <button
              onClick={() => setActivePage(PATHS.POST_AUTOMATION)}
              className="px-4 py-2 border border-black rounded-lg flex items-center gap-2 w-fit transition-colors hover:bg-black hover:text-white"
            >
              <Calendar className="w-4 h-4" />
              Schedule Posts
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// FILE: src/pages/InstagramPage.jsx
// ============================================================================

const InstagramPage = () => {
  // Other pages would be structured similarly to DashboardPage
  return <PagePlaceholder title="Instagram" icon={Instagram} />;
};

// ... other page components would be similarly structured ...

const DMAutomationPage = () => {
  return <DM_AUTOMATION />;
};

const PostAutomationPage = () => {
  return <POST_AUTOMATION />;
};

const CommentAutomationPage = () => {
  return <COMMENT_AUTOMATION />;
};

const SettingsPage = () => {
  return <PagePlaceholder title="Settings" icon={Settings} />;
};

/**
 * A placeholder component for pages that are not fully implemented.
 * @param {{title: string, icon: React.ElementType}} props
 */
const PagePlaceholder = ({ title, icon }) => (
  <>
    <SectionHeader icon={icon} title={title} />
    <Card>
      <p className="text-zinc-600 text-center py-24">
        Content for {title} page goes here.
      </p>
    </Card>
  </>
);

// ============================================================================
// FILE: src/App.jsx
// ============================================================================

const pageMap = {
  [PATHS.DASHBOARD]: <DashboardPage />,
  [PATHS.INSTAGRAM]: <InstagramPage />,
  [PATHS.DM_AUTOMATION]: <DMAutomationPage />,
  [PATHS.POST_AUTOMATION]: <PostAutomationPage />,
  [PATHS.COMMENT_AUTOMATION]: <CommentAutomationPage />,
  [PATHS.SETTINGS]: <SettingsPage />,
};

const CurrentPage = () => {
  const { activePage } = useAppContext();
  return pageMap[activePage] || <div>404 - Page Not Found</div>;
};

function App() {
  return (
    <AppProvider>
      <AppLayout>
        <CurrentPage />
      </AppLayout>
    </AppProvider>
  );
}

export default App;
