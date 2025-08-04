import { Twitter, Instagram, Linkedin, Send, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand and Newsletter */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-primary to-purple-600 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  InstaFlow
                </span>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Instagram Growth Automation
                </p>
              </div>
            </div>
          </div>

          {/* Links Grid - Mobile optimized */}
          <div className="md:col-span-2 lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                Product
              </h4>
              <nav className="flex flex-col gap-2 sm:gap-3">
                {["Features", "Pricing", "Testimonials", "FAQ", "Roadmap"].map(
                  (item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </a>
                  )
                )}
              </nav>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                Resources
              </h4>
              <nav className="flex flex-col gap-2 sm:gap-3">
                {["Blog", "Guides", "Tutorials", "Webinars", "Community"].map(
                  (item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </a>
                  )
                )}
              </nav>
            </div>

            <div className="mt-4 sm:mt-0">
              <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                Company
              </h4>
              <nav className="flex flex-col gap-2 sm:gap-3">
                {["About", "Careers", "Contact", "Partners", "Press"].map(
                  (item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </a>
                  )
                )}
              </nav>
            </div>

            <div className="mt-4 sm:mt-0">
              <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                Legal
              </h4>
              <nav className="flex flex-col gap-2 sm:gap-3">
                {["Terms", "Privacy", "Cookies", "Compliance", "Security"].map(
                  (item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </a>
                  )
                )}
              </nav>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 mb-8 sm:my-12 h-px bg-border/50"></div>

        {/* Bottom Bar - Mobile optimized */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            &copy; {currentYear} InstaFlow, Inc. All rights reserved.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
            <div className="flex justify-center gap-4 sm:gap-5 w-full sm:w-auto">
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.a>
            </div>

            <div className="hidden sm:block h-4 w-px bg-border/50"></div>
            <div className="sm:hidden w-full h-px bg-border/20 my-2"></div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#"
                className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
