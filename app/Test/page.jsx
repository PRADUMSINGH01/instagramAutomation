"use client"
"use client";

import React, { useState, createContext, useContext, useEffect, useMemo } from "react";
import {
  LayoutDashboard,
  Instagram,
  MessageCircle,
  Twitter,
  Pin,
  Linkedin,
  Settings,
  LogOut,
  Shield,
  ShoppingBag,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Users,
  Sun,
  Moon,
} from "lucide-react";

// --- THEME AND CONTEXT ---
const THEMES = {
  light: {
    sidebarBg: "#FFFFFF",
    mainBg: "#f8fafc",
    border: "#f1f5f9",
    textPrimary: "#1e293b",
    textSecondary: "#64748b",
    activeBg: "#0ea5e9",
    activeText: "#FFFFFF",
    hoverBg: "#e0f2fe",
    hoverText: "#0369a1",
    logo: "#0ea5e9",
    alert: "#ef4444",
    cardBg: "#FFFFFF",
    cardBorder: "#e2e8f0",
  },
  dark: {
    sidebarBg: "#1e293b",
    mainBg: "#0f172a",
    border: "#334155",
    textPrimary: "#f1f5f9",
    textSecondary: "#94a3b8",
    activeBg: "#0ea5e9",
    activeText: "#FFFFFF",
    hoverBg: "#1e3a8a",
    hoverText: "#7dd3fc",
    logo: "#7dd3fc",
    alert: "#f87171",
    cardBg: "#1e293b",
    cardBorder: "#334155",
  },
};

const SidebarContext = createContext();
const AppContext = createContext();

// --- REUSABLE COMPONENTS ---
function SidebarItem({ icon, text, active, alert, onClick }) {
  const { expanded } = useContext(SidebarContext);
  const { theme } = useContext(AppContext);

  return (
    <li
      onClick={onClick}
      className={`
        relative flex items-center py-2.5 px-3 my-1
        font-medium rounded-lg cursor-pointer
        transition-all duration-200 ease-in-out
        ${active 
          ? `text-[${theme.activeText}] bg-[${theme.activeBg}]`
          : `text-[${theme.textSecondary}] hover:bg-[${theme.hoverBg}] hover:text-[${theme.hoverText}]`
        }
      `}
    >
      <div className="flex items-center">
        {React.cloneElement(icon, { size: 20, className: "flex-shrink-0" })}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          } whitespace-nowrap`}
        >
          {text}
        </span>
      </div>
      
      {alert && (
        <span className="absolute top-2 right-3 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
      )}
      
      {!expanded && (
        <div 
          className={`absolute left-full ml-4 px-3 py-1.5 rounded-md text-sm font-medium z-20
                     invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100
                     bg-[${theme.cardBg}] text-[${theme.textPrimary}] shadow-lg border border-[${theme.border}]`}
        >
          {text}
        </div>
      )}
    </li>
  );
}

const socialLinks = [
  { icon: <Instagram />, text: "Instagram" },
  { icon: <MessageCircle />, text: "WhatsApp" },
  { icon: <Twitter />, text: "Twitter" },
  { icon: <Pin />, text: "Pinterest" },
  { icon: <Linkedin />, text: "LinkedIn" },
];

function SocialsDropdown({ activeItem, setActiveItem }) {
  const { expanded } = useContext(SidebarContext);
  const { theme } = useContext(AppContext);
  const [socialsOpen, setSocialsOpen] = useState(false);

  const isSocialsActive = socialLinks.some(link => link.text === activeItem);

  useEffect(() => {
    if (!expanded) setSocialsOpen(false);
  }, [expanded]);

  return (
    <div className="transition-all duration-300 ease-in-out">
      <SidebarItem
        icon={<Users />}
        text="Socials"
        active={isSocialsActive}
        onClick={() => expanded && setSocialsOpen(prev => !prev)}
        customContent={
          expanded && (
            <ChevronDown
              size={16}
              className={`ml-auto transition-transform duration-200 ${
                socialsOpen ? "rotate-180" : ""
              }`}
            />
          )
        }
      />
      
      {socialsOpen && expanded && (
        <div className="pl-4 mt-1 space-y-1 transition-all duration-300">
          {socialLinks.map((link) => (
            <SidebarItem
              key={link.text}
              icon={link.icon}
              text={link.text}
              active={activeItem === link.text}
              onClick={() => setActiveItem(link.text)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// --- MAIN SIDEBAR COMPONENT ---
function Sidebar({ children, activeItem, setActiveItem }) {
  const { theme } = useContext(AppContext);
  const [expanded, setExpanded] = useState(true);

  return (
    <aside 
      className="sticky top-0 h-screen transition-all duration-300 ease-in-out"
      style={{ minWidth: expanded ? "260px" : "80px" }}
    >
      <nav
        className="h-full flex flex-col shadow-sm overflow-hidden"
        style={{ 
          backgroundColor: theme.sidebarBg, 
          borderRight: `1px solid ${theme.border}` 
        }}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className={`flex items-center gap-2 overflow-hidden transition-all ${expanded ? "w-auto" : "w-0"}`}>
            <Shield className="w-7 h-7 flex-shrink-0" style={{ color: theme.logo }} />
            <span 
              className="text-lg font-bold whitespace-nowrap"
              style={{ color: theme.textPrimary }}
            >
              BrandHub
            </span>
          </div>
          <button
            onClick={() => setExpanded(curr => !curr)}
            className="p-1.5 rounded-lg hover:bg-opacity-20 transition-colors"
            style={{ backgroundColor: theme.hoverBg }}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {expanded ? (
              <ChevronLeft size={20} style={{ color: theme.textPrimary }} />
            ) : (
              <ChevronRight size={20} style={{ color: theme.textPrimary }} />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-2 py-3">{children}</ul>
        </SidebarContext.Provider>

        <div 
          className="border-t p-4"
          style={{ borderColor: theme.border }}
        >
          <div className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex-shrink-0" />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-tight">
                <h4
                  className="font-semibold whitespace-nowrap"
                  style={{ color: theme.textPrimary }}
                >
                  John Doe
                </h4>
                <span
                  className="text-xs whitespace-nowrap"
                  style={{ color: theme.textSecondary }}
                >
                  johndoe@example.com
                </span>
              </div>
              <button 
                className="p-1 rounded-md hover:bg-opacity-20 transition-colors"
                style={{ backgroundColor: theme.hoverBg }}
                aria-label="Logout"
              >
                <LogOut
                  size={18}
                  style={{ color: theme.textSecondary }}
                  className="hover:text-red-500 transition-colors"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isDarkMode, setDarkMode] = useState(false);
  
  const toggleTheme = () => setDarkMode(!isDarkMode);
  const theme = isDarkMode ? THEMES.dark : THEMES.light;

  const contextValue = useMemo(() => ({ 
    theme, 
    toggleTheme,
    isDarkMode
  }), [theme, toggleTheme, isDarkMode]);

  return (
    <AppContext.Provider value={contextValue}>
      <div
        style={{ backgroundColor: theme.mainBg }}
        className="flex min-h-screen"
      >
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem}>
          <SidebarItem
            icon={<LayoutDashboard />}
            text="Dashboard"
            active={activeItem === "Dashboard"}
            onClick={() => setActiveItem("Dashboard")}
          />
          <SocialsDropdown
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <SidebarItem
            icon={<ShoppingBag />}
            text="Orders"
            alert
            active={activeItem === "Orders"}
            onClick={() => setActiveItem("Orders")}
          />
          <SidebarItem
            icon={<Settings />}
            text="Settings"
            active={activeItem === "Settings"}
            onClick={() => setActiveItem("Settings")}
          />
        </Sidebar>
        <MainContent activeItem={activeItem} />
      </div>
    </AppContext.Provider>
  );
}

function MainContent({ activeItem }) {
  const { theme, toggleTheme, isDarkMode } = useContext(AppContext);
  
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1800px] mx-auto w-full">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h1
          style={{ color: theme.textPrimary }}
          className="text-2xl md:text-3xl font-bold"
        >
          {activeItem}
        </h1>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center text-sm font-medium" style={{ color: theme.textSecondary }}>
            {isDarkMode ? 'Dark' : 'Light'} Mode
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg shadow transition-colors"
            style={{
              backgroundColor: theme.cardBg,
              color: theme.textPrimary,
              border: `1px solid ${theme.border}`
            }}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
      
      <div className="mb-8" style={{ color: theme.textSecondary }}>
        <p className="max-w-3xl">
          Manage your {activeItem.toLowerCase()} settings and preferences. 
          {activeItem === "Dashboard" && " Here's an overview of your account activity."}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ 
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.cardBorder}`
            }}
          >
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
            <h3
              className="font-semibold mb-2"
              style={{ color: theme.textPrimary }}
            >
              Card {i + 1}
            </h3>
            <p className="text-sm">
              This card contains relevant information about your {activeItem.toLowerCase()} section.
            </p>
            <div className="mt-4 pt-4 border-t" style={{ borderColor: theme.border }}>
              <button 
                className="text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
                style={{
                  backgroundColor: theme.hoverBg,
                  color: theme.hoverText
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}