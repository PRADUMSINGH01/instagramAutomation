"use client";
import { Zap, Settings, BarChart } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const HowItWorksSection = () => {
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

  const steps = [
    {
      icon: Zap,
      title: "Connect Your Account",
      description:
        "Securely link your Instagram profile with our platform. Authorization takes less than 1 minute.",
      accent: "text-blue-500",
    },
    {
      icon: Settings,
      title: "Configure Settings",
      description:
        "Customize automation rules, DM templates, and posting schedules to match your brand voice.",
      accent: "text-purple-500",
    },
    {
      icon: BarChart,
      title: "Track Performance",
      description:
        "Monitor engagement metrics and audience growth through our analytics dashboard.",
      accent: "text-teal-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section id="how-it-works" className="py-20 bg-background ">
      <div className="container max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-foreground"
          >
            Streamlined Instagram Automation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Transform your Instagram strategy in three simple steps
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="relative"
            >
              <div className="h-full bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow ">
                {/* Step indicator */}
                <div className="absolute top-0 left-8 -translate-y-1/2 bg-background px-4 py-1 rounded-full border border-border text-sm font-medium text-muted-foreground">
                  Step {index + 1}
                </div>

                <div className="flex flex-col items-center">
                  <div
                    className={`mb-6 p-4 rounded-lg bg-background ${step.accent}`}
                  >
                    <step.icon className="h-8 w-8" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider with arrow */}
        <div className="hidden md:flex justify-center mt-10 mb-14">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="h-0.5 w-16 bg-border" />
              <div className="mx-2 p-1 rounded-full bg-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-foreground"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#signup"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-foreground hover:bg-foreground/90 rounded-lg transition-colors"
          >
            Start Your Free Trial
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-4 w-4"
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
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required • 14-day free trial
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
