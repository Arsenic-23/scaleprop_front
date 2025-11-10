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
      className="relative min-h-[100dvh] bg-[#050507] text-white flex flex-col items-center justify-between overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{
        paddingTop: "calc(1.5rem + env(safe-area-inset-top, 0px))",
        paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* Header */}
      <div className="z-10 flex flex-col items-center w-full mt-4">
        <div className="flex items-center space-x-2 mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Scale Fund"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
          </div>
          <h1
            className="font-medium tracking-tight text-green-200"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
            }}
          >
            ScaleFund
          </h1>
        </div>

        {/* Form Area */}
        <div className="relative z-10 flex items-center justify-center w-full max-w-md px-2 sm:px-0 mb-6 sm:mb-10">
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
      </div>

      {/* Footer */}
      <div className="z-10 w-full max-w-6xl flex flex-col items-center space-y-6 sm:space-y-8 mb-8 sm:mb-10">
        <LogoScroller />
        <p
          className="text-center font-light opacity-80 tracking-wide"
          style={{
            fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)",
            lineHeight: 1.5,
          }}
        >
          Crafted for those who dare to scale beyond limits.
        </p>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050507]/30 to-black pointer-events-none" />
    </div>
  );
};

export default LandingPage;
