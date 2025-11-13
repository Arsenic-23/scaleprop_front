import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoScroller } from "../components/LogoScroller";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");

  const handleSuccess = (uid: string) => {
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
      {/* Header Branding */}
      <div className="z-10 flex items-center space-x-3 mb-10 sm:mb-12">
        {/* Glassmorphic Logo Circle */}
        <div
          className="relative flex items-center justify-center rounded-full"
          style={{
            width: "48px",
            height: "48px",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            background:
              "linear-gradient(145deg, rgba(25,25,25,0.85), rgba(60,60,60,0.55))",
            border: "1px solid rgba(255,255,255,0.22)",
            boxShadow:
              "0 6px 22px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 2px rgba(255,255,255,0.1)",
          }}
        >
          <img
            src="/scale.png"
            alt="Scalefund Logo"
            className="w-8 h-8 object-contain z-10 select-none drop-shadow-[0_0_4px_rgba(255,255,255,0.25)]"
          />

          {/* Top highlight */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "55%",
              borderTopLeftRadius: "9999px",
              borderTopRightRadius: "9999px",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.28), transparent)",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Brand Text — White & Premium */}
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{
            color: "#FFFFFF",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            lineHeight: "2.4rem",
            letterSpacing: "-0.5px",
          }}
        >
          Scalefund
        </h1>
      </div>

      {/* Form Area */}
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

      {/* Footer */}
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
