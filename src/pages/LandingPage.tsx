import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoScroller } from "../components/LogoScroller";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");

  const handleSuccess = (uid: string) => {
    console.log("Authenticated user:", uid);
    navigate("/home");
  };

  return (
    <div
      className="relative min-h-[100dvh] bg-[#050507] text-white flex flex-col items-center justify-between overflow-y-auto px-4 sm:px-6 lg:px-8"
      style={{
        paddingTop: "calc(2.5rem + env(safe-area-inset-top, 0px))",
        paddingBottom: "calc(3rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* Header Logo and Title */}
      <div className="z-10 flex flex-col items-center mt-6 sm:mt-8">
        <div className="flex items-center space-x-2 mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Scale Fund"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
          </div>
          <h1
            className="font-semibold tracking-tight text-green-200"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
            }}
          >
            ScaleFund
          </h1>
        </div>
      </div>

      {/* Center Form Area */}
      <div className="flex-grow flex items-center justify-center w-full z-10">
        {mode === "login" ? (
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToRegister={() => setMode("register")}
          />
        ) : (
          <RegisterForm
            onSuccess={handleSuccess}
            onSwitchToLogin={() => setMode("login")}
          />
        )}
      </div>

      {/* Footer Section — shifted further down */}
      <div className="w-full max-w-6xl z-10 mb-12 sm:mb-16 flex flex-col items-center space-y-10 sm:space-y-12">
        <LogoScroller />
        <p
          className="text-center font-light opacity-80 tracking-wide"
          style={{
            fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
            paddingInline: "0.75rem",
            marginTop: "0.5rem",
          }}
        >
          Crafted for those who dare to scale beyond limits.
        </p>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050507]/50 to-black pointer-events-none" />
    </div>
  );
};

export default LandingPage;
