"use client";
import { motion } from "framer-motion";
import HowItWorksSection from "@/components/ui/Howitwork";
import FeatureSection from "@/components/ui/FeaturesSection";
import { CheckCircle, Twitter, Instagram, Linkedin } from "lucide-react";

// --- Page Sections ---

const HeroSection = () => (
  <section className="relative py-20 sm:py-32 overflow-hidden">
    {/* Floating Instagram-themed elements */}
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Floating DM bubbles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * 100,
            y: Math.random() * 100,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
            x: `calc(${Math.random() * 100}vw + ${i * 30}px)`,
            y: `calc(${Math.random() * 100}vh + ${i * 20}px)`,
            rotate: [0, i % 2 === 0 ? 15 : -15],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            className="text-blue-500/20"
          >
            <path
              fill="currentColor"
              d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
            />
          </svg>
        </motion.div>
      ))}

      {/* Floating hearts */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * 100,
            y: Math.random() * 100,
          }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0, 1.2, 0],
            y: `calc(${Math.random() * 100}vh + ${i * 40}px)`,
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            className="text-pink-500/20"
          >
            <path
              fill="currentColor"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </motion.div>
      ))}

      {/* Instagram logo particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * 100,
            y: Math.random() * 100,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0, 0.8, 0],
            x: `calc(${Math.random() * 100}vw + ${i * 25}px)`,
            rotate: [0, 360],
          }}
          transition={{
            duration: 20 + Math.random() * 15,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "linear",
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            className="text-purple-500/15"
          >
            <path
              fill="currentColor"
              d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
            />
          </svg>
        </motion.div>
      ))}
    </div>

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-primary/5 z-1"></div>

    <div className="container text-center relative z-10">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
      >
        Automate Your Instagram Engagement
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 max-w-2xl mx-auto relative"
      >
        <div className="absolute -inset-1 bg-primary/20 blur-2xl rounded-full"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full"></div>
        <motion.p
          className="relative text-lg sm:text-xl text-foreground bg-background/80 p-6 rounded-2xl backdrop-blur-sm border border-primary/10 shadow-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Stop wasting time on repetitive tasks. Automate your DMs, posts, and
          comments to grow your audience and build stronger connections, 24/7.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <motion.a
          href="#signup"
          className="group inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-primary-foreground bg-gradient-to-r from-primary to-purple-600 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Your Free Trial
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.a>

        <motion.a
          href="#features"
          className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-foreground bg-card rounded-xl border border-primary/10 hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent backdrop-blur-sm"
          whileHover={{
            scale: 1.05,
            background:
              "linear-gradient(to right, var(--accent), var(--primary))",
            color: "var(--primary-foreground)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
          </svg>
          Learn More
        </motion.a>
      </motion.div>

      {/* Animated chat preview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-16 mx-auto max-w-md bg-background/80 border border-primary/10 rounded-2xl backdrop-blur-sm shadow-xl overflow-hidden"
      >
        <div className="flex items-center p-3 border-b border-primary/10">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="flex-1 text-center font-medium text-sm text-foreground/80">
            Direct Message
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-start mb-3">
            <div className="bg-gray-200 rounded-2xl rounded-bl-none px-4 py-2 max-w-[70%]">
              <div className="h-2 w-20 bg-gray-400 rounded mb-1"></div>
              <div className="h-2 w-16 bg-gray-400 rounded"></div>
            </div>
          </div>

          <motion.div
            className="flex justify-end mb-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="bg-primary/10 rounded-2xl rounded-br-none px-4 py-2 max-w-[70%]">
              <div className="h-2 w-24 bg-primary rounded mb-1"></div>
              <div className="h-2 w-20 bg-primary rounded"></div>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
          >
            <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-none px-4 py-2 max-w-[70%]">
              <div className="h-2 w-16 bg-primary-foreground/80 rounded"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

const PricingSection = () => (
  <section id="pricing" className="py-20 sm:py-24 bg-secondary">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-4 text-lg text-foreground/60">
          Choose the plan that&quot;s right for your growth goals. Cancel
          anytime.
        </p>
      </div>
      <div className="mt-16 grid lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {/* Starter Plan */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border border-border rounded-lg p-8 flex flex-col hover:border-primary/50 transition-colors"
        >
          <h3 className="text-xl font-semibold text-foreground">Creator</h3>
          <p className="mt-2 text-foreground/60">
            For creators getting started.
          </p>
          <p className="mt-6 text-4xl font-bold text-foreground">
            0.00
            <span className="text-lg font-medium text-foreground/50">/mo</span>
          </p>
          <ul className="mt-8 space-y-4 text-foreground/80">
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary" /> 1 Instagram
              Account
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary" /> 10 DM & Comment
              Automation
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary" /> 10 Post
              Scheduling
            </li>
          </ul>
          <a
            href="#signup-creator"
            className="mt-auto w-full text-center inline-block mt-8 px-6 py-3 text-base font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20"
          >
            Choose Plan
          </a>
        </motion.div>
        {/* Pro Plan - Highlighted */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-2 border-primary rounded-lg p-8 flex flex-col relative shadow-2xl shadow-primary/20"
        >
          <div className="absolute top-0 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold rounded-full">
            Most Popular
          </div>
          <h3 className="text-xl font-semibold text-foreground">Pro</h3>
          <p className="mt-2 text-foreground/60">
            For professionals scaling their brand.
          </p>
          <p className="mt-6 text-4xl font-bold text-foreground">
            99.00
            <span className="text-lg font-medium text-foreground/50">/mo</span>
          </p>
          <ul className="mt-8 space-y-4 text-foreground/80">
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary" /> 5 Instagram
              Accounts
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary" /> Advanced DM &
              Comment Flows
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary" /> AI-Powered
              Suggestions
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary" /> Detailed
              Analytics & Reports
            </li>
          </ul>
          <a
            href="#signup-pro"
            className="mt-auto w-full text-center inline-block mt-8 px-6 py-3 text-base font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90"
          >
            Choose Plan
          </a>
        </motion.div>
        {/* Business Plan */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="border border-border rounded-lg p-8 flex flex-col hover:border-primary/50 transition-colors"
        >
          <h3 className="text-xl font-semibold text-foreground">Agency</h3>
          <p className="mt-2 text-foreground/60">
            For agencies managing clients.
          </p>
          <p className="mt-6 text-4xl font-bold text-foreground">
            1449
            <span className="text-lg font-medium text-foreground/50">/mo</span>
          </p>
          <ul className="mt-8 space-y-4 text-foreground/80">
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary" /> Unlimited
              Accounts
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary" /> All Pro Features
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary" /> Team Member
              Access
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary" /> Priority Support
            </li>
          </ul>
          <a
            href="#signup-agency"
            className="mt-auto w-full text-center inline-block mt-8 px-6 py-3 text-base font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20"
          >
            Choose Plan
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section id="testimonials" className="py-20 sm:py-24">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Loved by Creators Worldwide
        </h2>
        <p className="mt-4 text-lg text-foreground/60">
          Don&quot;t just take our word for it. HereDon&quot;s what our users
          say.
        </p>
      </div>
      <div className="mt-16 grid lg:grid-cols-2 gap-8">
        <div className="bg-card p-8 rounded-lg border border-border">
          <p className="text-card-foreground/80">
            &quot;InstaFlow has been a game-changer. I&quot;m saving at least 10
            hours a week on DMs alone. My engagement has never been
            higher!&quot;
          </p>
          <div className="mt-6 flex items-center gap-4">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              alt="User avatar"
            />
            <div>
              <p className="font-semibold text-card-foreground">Sarah K.</p>
              <p className="text-sm text-card-foreground/60">@sarahcreates</p>
            </div>
          </div>
        </div>
        <div className="bg-card p-8 rounded-lg border border-border">
          <p className="text-card-foreground/80">
            &quot;As a fitness coach, responding to every comment was
            impossible. Now, InstaFlow handles the common questions, and I can
            focus on my clients.&quot;
          </p>
          <div className="mt-6 flex items-center gap-4">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src="https://i.pravatar.cc/150?u=a042581f4e29026705d"
              alt="User avatar"
            />
            <div>
              <p className="font-semibold text-card-foreground">Mike R.</p>
              <p className="text-sm text-card-foreground/60">@fitcoachmike</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// const FaqSection = () => {
//   const faqItems = [
//     {
//       q: "Is it safe to connect my Instagram account?",
//       a: "Yes, absolutely. We use Instagram's official API for all interactions, ensuring your account is secure and compliant with their terms of service. We never ask for your password.",
//     },
//     {
//       q: "Can I customize the automated messages?",
//       a: "Of course. You have full control over all automated DMs and comments. You can create multiple templates and use personalization tags like [username] to make them feel authentic.",
//     },
//     {
//       q: "Will this get my account banned?",
//       a: "No. Our platform is designed to mimic human behavior and operates within Instagram's rate limits. We prioritize account safety above all else.",
//     },
//     {
//       q: "What if I want to cancel my subscription?",
//       a: "You can cancel your subscription at any time with just a few clicks from your account dashboard. No questions asked.",
//     },
//   ];

//   const [openIndex, setOpenIndex] = useState(null);

//   return (
//     <section id="faq" className="py-20 sm:py-24 bg-secondary">
//       <div className="container max-w-3xl mx-auto">
//         <div className="text-center">
//           <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
//             Frequently Asked Questions
//           </h2>
//         </div>
//         <div className="mt-12 space-y-4">
//           {faqItems.map((item, index) => (
//             <div
//               key={index}
//               className="border border-border rounded-lg bg-card overflow-hidden"
//             >
//               <button
//                 onClick={() => setOpenIndex(openIndex === index ? 0 : index)}
//                 className="w-full flex justify-between items-center p-6 text-left"
//               >
//                 <span className="text-lg font-medium text-card-foreground">
//                   {item.q}
//                 </span>
//                 <motion.div animate={{ rotate: openIndex === index ? 45 : 0 }}>
//                   <X className="h-6 w-6 text-card-foreground/50" />
//                 </motion.div>
//               </button>
//               <AnimatePresence>
//                 {openIndex === index && (
//                   <motion.div
//                     initial="collapsed"
//                     animate="open"
//                     exit="collapsed"
//                     variants={{
//                       open: { opacity: 1, height: "auto" },
//                       collapsed: { opacity: 0, height: 0 },
//                     }}
//                     transition={{
//                       duration: 0.3,
//                       ease: [0.04, 0.62, 0.23, 0.98],
//                     }}
//                   >
//                     <div className="p-6 pt-0 text-card-foreground/70">
//                       <p>{item.a}</p>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

const Footer = () => (
  <footer className="bg-secondary border-t border-border">
    <div className="container py-12 lg:py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand and Newsletter */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="h-6 w-6 text-primary"
            >
              <rect width="256" height="256" fill="none"></rect>
              <path
                d="M128,88a40,40,0,1,0,40,40A40,40,0,0,0,128,88Z"
                opacity="0.2"
              ></path>
              <path
                d="M128,24A104,104,0,1,0,232,128,104.1,104.1,0,0,0,128,24Zm0,168a64,64,0,1,1,64-64A64.1,64.1,0,0,1,128,192Z"
                fill="currentColor"
              ></path>
            </svg>
            <span className="text-lg font-bold text-foreground">InstaFlow</span>
          </div>
          <p className="mt-4 text-sm text-foreground/60">
            Your Instagram growth on autopilot.
          </p>
          <form className="mt-6 flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Spacer */}
        <div className="hidden md:block"></div>

        {/* Links */}
        <div className="grid grid-cols-2 md:col-span-2 gap-8">
          <div>
            <h4 className="font-semibold text-foreground">Product</h4>
            <nav className="mt-4 flex flex-col gap-2">
              <a
                href="#features"
                className="text-sm text-foreground/60 hover:text-foreground"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-sm text-foreground/60 hover:text-foreground"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-sm text-foreground/60 hover:text-foreground"
              >
                Testimonials
              </a>
              <a
                href="#faq"
                className="text-sm text-foreground/60 hover:text-foreground"
              >
                FAQ
              </a>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Legal</h4>
            <nav className="mt-4 flex flex-col gap-2">
              <a
                href="#"
                className="text-sm text-foreground/60 hover:text-foreground"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-foreground/60 hover:text-foreground"
              >
                Privacy Policy
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm text-foreground/60">
          &copy; {new Date().getFullYear()} InstaFlow. All rights reserved.
        </p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <a href="#" className="text-foreground/60 hover:text-foreground">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" className="text-foreground/60 hover:text-foreground">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="#" className="text-foreground/60 hover:text-foreground">
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App Component ---
const App = () => {
  return (
    <div className="bg-background font-sans">
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeatureSection />
        <PricingSection />
        <TestimonialsSection />
        {/* <FaqSection /> */}
      </main>
      <Footer />
    </div>
  );
};

export default App;
