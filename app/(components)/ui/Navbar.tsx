"use client";
import React, { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

// You can customize these navigation links
const navLinks = [
  { href: "#", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
];

// Dark Mode Toggle Component
const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // This effect runs once on mount to set the initial theme.
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

  // This function toggles the theme.
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
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-accent-foreground" />
      ) : (
        <Moon className="h-5 w-5 text-accent-foreground" />
      )}
    </button>
  );
};

// Main Navbar Component
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This effect handles locking the body scroll when the mobile menu is open.
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup function to reset scroll behavior when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          {/* Logo or Site Title */}
          <a href="#" className="mr-6 flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="h-6 w-6"
            >
              <rect width="256" height="256" fill="none"></rect>
              <line
                x1="208"
                y1="128"
                x2="128"
                y2="208"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></line>
              <line
                x1="192"
                y1="40"
                x2="40"
                y2="192"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></line>
            </svg>
            <span className="font-bold">YourBrand</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex flex-1 items-center justify-end space-x-2 md:hidden">
          <DarkModeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" />
            ) : (
              <Menu className="block h-6 w-6" />
            )}
          </button>
        </div>

        {/* Right side of Navbar for Desktop */}
        <div className="hidden md:flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center gap-4">
            <DarkModeToggle />
            <a
              href="#login"
              className="px-4 py-2 rounded-md text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90"
            >
              Sign In
            </a>
          </nav>
        </div>
      </div>

      {/* Mobile Menu - Full screen overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-14 z-40 bg-background/80 backdrop-blur-lg">
          <div
            className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-full overflow-auto"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="container pt-6">
              <nav className="grid gap-6 text-lg font-medium text-foreground">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="hover:text-foreground/80 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-8 border-t border-border pt-6">
                <a
                  href="#login"
                  className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md text-base font-medium text-primary-foreground bg-primary hover:bg-primary/90"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default App;
