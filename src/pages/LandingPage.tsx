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
      className="relative min-h-[100dvh] bg-[#050507] text-white flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{
        paddingTop: "calc(2.5rem + env(safe-area-inset-top, 0px))",
        paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* Header Logo */}
      <div className="z-10 flex items-center space-x-2 mb-10 sm:mb-12">
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

      {/* Form Area — centered */}
      <div className="relative z-10 flex items-center justify-center w-full mt-2 mb-[160px] sm:mb-[180px]">
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

      {/* Footer — pinned closer to bottom */}
      <div className="absolute bottom-[40px] sm:bottom-[60px] w-full max-w-6xl z-10 flex flex-col items-center space-y-8 sm:space-y-10">
        <LogoScroller />
        <p
          className="text-center font-light opacity-80 tracking-wide"
          style={{
            fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
            paddingInline: "0.75rem",
          }}
        >
          Crafted for those who dare to scale beyond limits.
        </p>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050507]/40 to-black pointer-events-none" />
    </div>
  );
};

export default LandingPage;
