"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Instagram,
  Zap,
  MessageSquare,
  ThumbsUp,
  BarChart2,
  ShieldCheck,
  UserCheck,
  ChevronRight,
  Play,
  Check,
  Mail,
  Users,
  Smartphone,
  Settings,
  Star,
  User,
} from "lucide-react";

const InstagramAutomationLanding = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } transition-colors duration-300`}
    >
      {/* Navigation */}
      <nav className="fixed w-full z-50 py-4 px-6 backdrop-blur-md bg-white/80 dark:bg-gray-900/80">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Instagram className="text-pink-500" size={28} />
            <span className="text-xl font-bold">InstaFlow</span>
          </div>

          <div className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="hover:text-pink-500 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-pink-500 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="hover:text-pink-500 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="hover:text-pink-500 transition-colors"
            >
              Testimonials
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
            <Link
              href="/Get-Start"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-20 px-6"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full mb-4"
            >
              <span className="flex items-center">
                <Zap className="mr-1" size={16} />
                New Feature: AI-Powered Replies
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Automate Your Instagram
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                {" "}
                DMs & Comments
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
            >
              Save hours every day with our AI-powered automation tool that
              handles your Instagram DMs and comments while you focus on growing
              your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity flex items-center justify-center">
                Start Free Trial
                <ChevronRight className="ml-2" size={20} />
              </button>
              <button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-lg font-medium text-lg flex items-center justify-center">
                <Play className="mr-2 text-pink-500" size={20} />
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 flex items-center"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold border-2 border-white dark:border-gray-900"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="ml-4 text-gray-600 dark:text-gray-300">
                <span className="font-bold">5000+</span> businesses growing with
                InstaFlow
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl transform rotate-6"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm font-medium">InstaFlow Dashboard</div>
                <div></div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Automated Replies</div>
                  <div className="w-8 h-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-end p-0.5">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white mr-3">
                      <User size={16} />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3 flex-1">
                      <div className="text-sm">
                        Hey, I love your products! Do you offer discounts for
                        bulk orders?
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-3 max-w-xs">
                    <div className="text-sm text-white">
                      Thanks for reaching out! Yes, we offer discounts for
                      orders over $500. I&apos;ll send you our catalog with
                      pricing details.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block bg-gray-200 dark:bg-gray-800 text-pink-500 px-4 py-1 rounded-full mb-4">
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Automate Your Instagram Growth
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our platform handles all aspects of Instagram engagement so you
              can focus on what matters most.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="text-green-500 mr-2" size={16} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 px-6 bg-gray-100 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block bg-gray-200 dark:bg-gray-700 text-pink-500 px-4 py-1 rounded-full mb-4">
              Simple Setup
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Get started in minutes and automate your Instagram engagement
              today.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white mx-auto mb-6 text-2xl font-bold">
                  {index + 1}
                </div>
                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-pink-500 mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block bg-gray-200 dark:bg-gray-800 text-pink-500 px-4 py-1 rounded-full mb-4">
              Transparent Pricing
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Simple Plans for Every Business
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Start with our free plan and upgrade as your business grows.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl p-8 shadow-lg ${
                  index === 1
                    ? "border-2 border-pink-500 relative bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900"
                    : "bg-white dark:bg-gray-800"
                }`}
              >
                {index === 1 && (
                  <div className="absolute top-0 right-0 bg-pink-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-2xl font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    /month
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="text-green-500 mr-2" size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-medium ${
                    index === 1
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  } transition-opacity`}
                >
                  {index === 1 ? "Get Started" : "Choose Plan"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="py-20 px-6 bg-gray-100 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block bg-gray-200 dark:bg-gray-700 text-pink-500 px-4 py-1 rounded-full mb-4">
              Customer Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted by Thousands of Creators
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              See how businesses are growing with InstaFlow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 dark:text-gray-500"
                        }`}
                        size={20}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic mb-6">
                  &apos; {testimonial.text}&apos;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Automate Your Instagram?
            </h2>
            <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses saving time and growing their
              audience with InstaFlow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-pink-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
                Start Free Trial
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors">
                Schedule a Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Instagram className="text-pink-500" size={28} />
                <span className="text-xl font-bold text-white">InstaFlow</span>
              </div>
              <p className="mb-6 max-w-xs">
                Automate your Instagram DMs and comments to save time and grow
                your audience faster.
              </p>
            </div>

            {footerLinks.map((column, index) => (
              <div key={index}>
                <h3 className="text-white font-bold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="hover:text-pink-500 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 InstaFlow. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-pink-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Data
const features = [
  {
    icon: <MessageSquare size={24} />,
    title: "DM Automation",
    description:
      "Automate responses to your Instagram direct messages with AI-powered replies.",
    bullets: [
      "24/7 message response",
      "Customizable templates",
      "AI-powered replies",
      "Multi-language support",
    ],
  },
  {
    icon: <ThumbsUp size={24} />,
    title: "Comment Management",
    description:
      "Automatically respond to comments and engage with your audience.",
    bullets: [
      "Auto-reply to comments",
      "Filter spam & inappropriate content",
      "Tag-based responses",
      "Competitor comment monitoring",
    ],
  },
  {
    icon: <BarChart2 size={24} />,
    title: "Analytics Dashboard",
    description: "Track your engagement metrics and optimize your strategy.",
    bullets: [
      "Response rate analytics",
      "Engagement growth tracking",
      "Sentiment analysis",
      "Performance reports",
    ],
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Safe Automation",
    description:
      "Instagram-safe automation that follows all platform guidelines.",
    bullets: [
      "Human-like interaction patterns",
      "Randomized delays",
      "Activity limits",
      "Compliance monitoring",
    ],
  },
  {
    icon: <UserCheck size={24} />,
    title: "Audience Targeting",
    description: "Reach the right people with our advanced targeting options.",
    bullets: [
      "Follower targeting",
      "Location-based targeting",
      "Interest-based outreach",
      "Custom audience lists",
    ],
  },
  {
    icon: <Smartphone size={24} />,
    title: "Mobile App",
    description: "Manage everything on the go with our iOS and Android apps.",
    bullets: [
      "Real-time notifications",
      "Message from anywhere",
      "Performance tracking",
      "Quick response templates",
    ],
  },
];

const steps = [
  {
    icon: <Settings size={24} />,
    title: "Connect Your Account",
    description: "Securely connect your Instagram account in minutes",
  },
  {
    icon: <Mail size={24} />,
    title: "Set Up Templates",
    description: "Create custom response templates or use our AI suggestions",
  },
  {
    icon: <Users size={24} />,
    title: "Define Your Audience",
    description: "Target specific followers or engage with everyone",
  },
  {
    icon: <Zap size={24} />,
    title: "Activate Automation",
    description: "Turn on automation and watch your engagement grow",
  },
];

const plans = [
  {
    name: "Starter",
    price: "199",
    features: [
      "1 Instagram account",
      "100 automated DMs/month",
      "Comment automation",
      "Basic templates",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "449",
    features: [
      "3 Instagram accounts",
      "Unlimited DMs",
      "Advanced comment management",
      "AI-powered responses",
      "Priority support",
    ],
  },
  {
    name: "Business",
    price: "1999",
    features: [
      "10 Instagram accounts",
      "Unlimited DMs & comments",
      "Team collaboration",
      "Custom AI training",
      "Dedicated account manager",
    ],
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "E-commerce Owner",
    rating: 5,
    text: "InstaFlow has saved me at least 10 hours per week. My engagement has doubled since I started using it!",
  },
  {
    name: "Michael Chen",
    role: "Marketing Director",
    rating: 5,
    text: "The AI responses are so natural that customers don't realize they're talking to a bot. Game changer!",
  },
  {
    name: "Jessica Williams",
    role: "Influencer",
    rating: 4,
    text: "My response time went from hours to seconds. My followers love the quick replies and I love the time savings!",
  },
];

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "How It Works", "Pricing", "Integrations"],
  },
  {
    title: "Resources",
    links: ["Blog", "Guides", "Help Center", "API Docs"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Contact", "Partners"],
  },
];

export default InstagramAutomationLanding;
