import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Github } from "lucide-react";

// Define the type for the props that include the toggleForm function
interface AuthFormProps {
  toggleForm: () => void;
}

// Google SVG Icon Component
const GoogleIcon = () => (
  <svg className="h-5 w-5 mr-2" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,34.556,44,29.86,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
  </svg>
);

// Main Authentication Component
const AuthenticationPage = () => {
  // State to toggle between 'login' and 'register' forms
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card p-8 rounded-xl shadow-lg border border-border"
        >
          {isLogin ? (
            <LoginForm toggleForm={toggleForm} />
          ) : (
            <RegisterForm toggleForm={toggleForm} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Login Form Component
const LoginForm = ({ toggleForm }: AuthFormProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-foreground mb-2">
        Welcome Back!
      </h2>
      <p className="text-center text-foreground/60 mb-8">
        Sign in to continue to InstaFlow.
      </p>

      <SocialLogins />

      <div className="flex items-center my-6">
        <hr className="w-full border-border" />
        <span className="px-4 text-foreground/50 text-sm">OR</span>
        <hr className="w-full border-border" />
      </div>

      <form className="space-y-6">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <a href="#" className="font-medium text-primary hover:underline">
            Forgot Password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-md hover:from-pink-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
        >
          Log In
        </button>
      </form>

      <p className="text-center text-sm text-foreground/60 mt-8">
        Don't have an account?{" "}
        <button
          onClick={toggleForm}
          className="font-medium text-primary hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

// Registration Form Component
const RegisterForm = ({ toggleForm }: AuthFormProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-foreground mb-2">
        Create an Account
      </h2>
      <p className="text-center text-foreground/60 mb-8">
        Get started with your 14-day free trial.
      </p>

      <SocialLogins />

      <div className="flex items-center my-6">
        <hr className="w-full border-border" />
        <span className="px-4 text-foreground/50 text-sm">OR</span>
        <hr className="w-full border-border" />
      </div>

      <form className="space-y-6">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-md hover:from-pink-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
        >
          Create Account
        </button>
      </form>

      <p className="text-center text-sm text-foreground/60 mt-8">
        Already have an account?{" "}
        <button
          onClick={toggleForm}
          className="font-medium text-primary hover:underline"
        >
          Log In
        </button>
      </p>
    </div>
  );
};

// Social Logins Component
const SocialLogins = () => (
  <div className="flex flex-col sm:flex-row gap-4">
    <button className="w-full inline-flex items-center justify-center py-3 border border-border rounded-md hover:bg-accent group transition-colors">
      <GoogleIcon />
      <span className="font-medium text-sm text-foreground/80 group-hover:text-foreground">
        Google
      </span>
    </button>
    <button className="w-full inline-flex items-center justify-center py-3 border border-border rounded-md hover:bg-accent group transition-colors">
      <Github className="h-5 w-5 mr-2 text-foreground/80 group-hover:text-foreground" />
      <span className="font-medium text-sm text-foreground/80 group-hover:text-foreground">
        GitHub
      </span>
    </button>
  </div>
);

export default AuthenticationPage;
