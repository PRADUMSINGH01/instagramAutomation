"use client";
import React, { useState, useEffect, useRef } from "react";
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  {
    href: "/",
    label: "Home",
    subLinks: null,
  },
  {
    href: "#features",
    label: "Features",
    subLinks: [
      { href: "#dm-automation", label: "DM Automation" },
      { href: "#post-scheduling", label: "Post Scheduling" },
      { href: "#analytics", label: "Analytics" },
    ],
  },
  {
    href: "#pricing",
    label: "Pricing",
    subLinks: null,
  },
  {
    href: "#about",
    label: "About",
    subLinks: [
      { href: "#team", label: "Our Team" },
      { href: "#mission", label: "Mission" },
    ],
  },
];

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);

    if (newIsDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary hover:bg-accent focus:outline-none"
      aria-label="Toggle dark mode"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-accent-foreground" />
      ) : (
        <Moon className="h-5 w-5 text-accent-foreground" />
      )}
    </motion.button>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setActiveSubMenu(null);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary to-purple-600 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              InstaFlow
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center ml-10 gap-8 text-sm">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                <a
                  href={link.href}
                  className="flex items-center font-medium text-foreground/80 transition-colors hover:text-foreground group-hover:text-primary"
                >
                  {link.label}
                  {link.subLinks && (
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                  )}
                </a>

                {link.subLinks && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-0 top-full mt-2 w-56 rounded-lg bg-background border border-border shadow-lg py-2 hidden group-hover:block"
                  >
                    {link.subLinks.map((subLink) => (
                      <a
                        key={subLink.label}
                        href={subLink.href}
                        className="block px-4 py-2 text-foreground/80 hover:bg-accent hover:text-foreground"
                      >
                        {subLink.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex flex-1 items-center justify-end space-x-2 md:hidden">
          <DarkModeToggle />
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-accent"
            aria-expanded={isMenuOpen}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" />
            ) : (
              <Menu className="block h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex flex-1 items-center justify-end space-x-3">
          <DarkModeToggle />

          <a
            href="/SignUp"
            className="px-4 py-2 rounded-md text-sm font-medium text-primary-foreground bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 top-16 z-40 bg-background/90 backdrop-blur-sm"
            ref={menuRef}
          >
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-background border-l border-border shadow-lg overflow-auto"
            >
              <div className="container pt-6 pb-10">
                <nav className="flex flex-col gap-1 font-medium">
                  {navLinks.map((link) => (
                    <div key={link.label} className="border-b border-border/10">
                      <button
                        onClick={() =>
                          link.subLinks
                            ? setActiveSubMenu(
                                activeSubMenu === link.label ? null : link.label
                              )
                            : setIsMenuOpen(false)
                        }
                        className={`flex items-center justify-between w-full py-4 text-left ${
                          activeSubMenu === link.label
                            ? "text-primary"
                            : "text-foreground/80"
                        }`}
                      >
                        <span>{link.label}</span>
                        {link.subLinks && (
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              activeSubMenu === link.label ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>

                      {link.subLinks && activeSubMenu === link.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="pl-4 pb-2 flex flex-col gap-2"
                        >
                          {link.subLinks.map((subLink) => (
                            <a
                              key={subLink.label}
                              href={subLink.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="py-2 px-4 rounded hover:bg-accent text-foreground/80 hover:text-foreground"
                            >
                              {subLink.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-border/20">
                  <div className="flex flex-col gap-4">
                    <a
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full text-center py-3 rounded-md font-medium text-foreground border border-border hover:bg-accent"
                    >
                      Sign In
                    </a>
                    <a
                      href="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full text-center py-3 rounded-md font-medium text-primary-foreground bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
