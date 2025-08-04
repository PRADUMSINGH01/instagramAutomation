"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import {
  MessageSquare,
  Calendar,
  BarChart2,
  Zap,
  Users,
  Heart,
  Hash,
  Bell,
  ShieldCheck,
} from "lucide-react";

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const featureItems = [
    {
      icon: MessageSquare,
      title: "Smart DM Automation",
      description: "Personalized auto-replies that feel human, not robotic.",
    },
    {
      icon: Calendar,
      title: "Post Scheduling",
      description: "Plan and schedule content weeks in advance.",
    },
    {
      icon: BarChart2,
      title: "Performance Analytics",
      description: "Track engagement metrics and audience growth.",
    },
    {
      icon: Zap,
      title: "Quick Response",
      description: "Instant replies to comments and messages.",
    },
    {
      icon: Users,
      title: "Audience Targeting",
      description: "Reach the right people with precision.",
    },
    {
      icon: Heart,
      title: "Like Automation",
      description: "Automatically engage with relevant content.",
    },
    {
      icon: Hash,
      title: "Hashtag Suggestions",
      description: "Discover high-performing hashtags.",
    },
    {
      icon: Bell,
      title: "Activity Alerts",
      description: "Get notified about important interactions.",
    },
    {
      icon: ShieldCheck,
      title: "Security First",
      description: "Enterprise-grade security for your account.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container max-w-7xl">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-accent/10 px-4 py-1 rounded-full mb-4">
            <p className="text-sm font-medium text-primary">
              Powerful Features
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4">
            Everything You Need to Scale
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Advanced tools designed to put your Instagram growth on autopilot
          </p>
        </motion.div>

        {/* Animated grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featureItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className="relative group"
            >
              {/* Animated gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl blur-sm opacity-0 group-hover:opacity-75 transition-all duration-300"></div>

              <div className="relative h-full bg-card p-6 rounded-xl border border-border shadow-sm group-hover:shadow-md transition-all">
                <motion.div
                  className="inline-flex items-center justify-center p-3 rounded-lg bg-background mb-4"
                  variants={floatingVariants}
                  animate="float"
                >
                  <item.icon className="h-6 w-6 text-primary" />
                </motion.div>

                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="#signup"
            className="inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-white bg-foreground hover:bg-foreground/90 rounded-lg transition-colors group"
          >
            Explore All Features
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
