"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  MessageSquare,
  Repeat,
  Send,
  Zap,
  Heart,
  ArrowRight,
  X,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

// --- Page Sections ---

const HeroSection = () => (
  <section className="relative py-20 sm:py-32 overflow-hidden">
    {/* The new creative background component is added here */}
    <div className="container text-center relative z-10">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground"
        style={{ textShadow: "0 2px 10px rgba(0,0,0,0.2)" }} // Added text shadow for better readability
      >
        Automate Your Instagram Engagement
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-foreground/80 bg-background/50 p-2 rounded-md backdrop-blur-sm"
      >
        Stop wasting time on repetitive tasks. Automate your DMs, posts, and
        comments to grow your audience and build stronger connections, 24/7.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <a
          href="#signup"
          className="group inline-flex items-center justify-center px-8 py-3 text-base font-medium text-primary-foreground bg-primary rounded-md shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
        >
          Start Your Free Trial
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
        <a
          href="#features"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-foreground bg-card rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
        >
          Learn More
        </a>
      </motion.div>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-20 sm:py-24 bg-secondary">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          How It Works in 3 Simple Steps
        </h2>
        <p className="mt-4 text-lg text-foreground/60">
          Get your Instagram on autopilot in minutes.
        </p>
      </div>
      <div className="mt-16 grid md:grid-cols-3 gap-10 md:gap-8">
        {[
          {
            icon: Zap,
            title: "Connect Your Account",
            description:
              "Securely link your Instagram profile with our platform. It's fast, safe, and easy.",
          },
          {
            icon: Repeat,
            title: "Set Your Rules",
            description:
              "Customize your automation settings. Define keywords for comment replies, create DM templates, and schedule your posts.",
          },
          {
            icon: Heart,
            title: "Watch Your Growth",
            description:
              "Sit back and let InstaFlow engage with your audience, freeing you up to focus on creating amazing content.",
          },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="text-center"
          >
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto">
              <item.icon className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-foreground/60">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const featureItems = [
  {
    icon: MessageSquare,
    title: "Automated DMs",
    description:
      "Instantly welcome new followers, reply to story mentions, or send promotional messages with personalized templates.",
  },
  {
    icon: Send,
    title: "Scheduled Posts",
    description:
      "Plan your content calendar in advance. Schedule photos, videos, and carousels to post at peak engagement times.",
  },
  {
    icon: Repeat,
    title: "Smart Comment Replies",
    description:
      "Automatically reply to comments based on keywords. Filter out spam and engage with your most loyal fans.",
  },
  {
    icon: CheckCircle,
    title: "Lead Generation",
    description:
      "Use DM automation to capture leads, answer common questions, and guide users to your sales funnel.",
  },
  {
    icon: Heart,
    title: "Audience Engagement",
    description:
      "Never miss an interaction. Ensure every follower feels seen and heard, building a stronger community.",
  },
  {
    icon: Zap,
    title: "24/7 Activity",
    description:
      "Your account stays active even when you're not. Engage with users across different time zones effortlessly.",
  },
];

const FeaturesSection = () => (
  <section id="features" className="py-20 sm:py-24">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Everything You Need to Scale
        </h2>
        <p className="mt-4 text-lg text-foreground/60">
          Powerful features designed to put your growth on autopilot.
        </p>
      </div>
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featureItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 bg-card border border-border rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-card-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-card-foreground/70">{item.description}</p>
          </motion.div>
        ))}
      </div>
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
          Choose the plan that's right for your growth goals. Cancel anytime.
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
            $29
            <span className="text-lg font-medium text-foreground/50">/mo</span>
          </p>
          <ul className="mt-8 space-y-4 text-foreground/80">
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary" /> 1 Instagram
              Account
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary" /> DM & Comment
              Automation
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary" /> Post Scheduling
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary" /> Basic Analytics
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
            $79
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
            $149
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
          Don't just take our word for it. Here's what our users say.
        </p>
      </div>
      <div className="mt-16 grid lg:grid-cols-2 gap-8">
        <div className="bg-card p-8 rounded-lg border border-border">
          <p className="text-card-foreground/80">
            "InstaFlow has been a game-changer. I'm saving at least 10 hours a
            week on DMs alone. My engagement has never been higher!"
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
            "As a fitness coach, responding to every comment was impossible.
            Now, InstaFlow handles the common questions, and I can focus on my
            clients."
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

const FaqSection = () => {
  const faqItems = [
    {
      q: "Is it safe to connect my Instagram account?",
      a: "Yes, absolutely. We use Instagram's official API for all interactions, ensuring your account is secure and compliant with their terms of service. We never ask for your password.",
    },
    {
      q: "Can I customize the automated messages?",
      a: "Of course. You have full control over all automated DMs and comments. You can create multiple templates and use personalization tags like [username] to make them feel authentic.",
    },
    {
      q: "Will this get my account banned?",
      a: "No. Our platform is designed to mimic human behavior and operates within Instagram's rate limits. We prioritize account safety above all else.",
    },
    {
      q: "What if I want to cancel my subscription?",
      a: "You can cancel your subscription at any time with just a few clicks from your account dashboard. No questions asked.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-20 sm:py-24 bg-secondary">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mt-12 space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-border rounded-lg bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="text-lg font-medium text-card-foreground">
                  {item.q}
                </span>
                <motion.div animate={{ rotate: openIndex === index ? 45 : 0 }}>
                  <X className="h-6 w-6 text-card-foreground/50" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <div className="p-6 pt-0 text-card-foreground/70">
                      <p>{item.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
