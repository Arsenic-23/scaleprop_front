import { LogoScroller } from "../components/LogoScroller";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function LandingPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-[100dvh] bg-black text-white flex flex-col items-center overflow-y-auto px-4 sm:px-6 lg:px-8"
      style={{
        paddingTop: "calc(2.5rem + env(safe-area-inset-top, 0px))",
        paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* Logo and Title */}
      <div className="z-10 flex items-center space-x-2 mt-6 sm:mt-8 mb-12 sm:mb-14">
        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Scale Fund"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
        </div>
        <h1
          className="font-semibold tracking-tight"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
          }}
        >
          Scalefund
        </h1>
      </div>

      {/* Center empty space for balanced composition */}
      <div className="flex-grow flex items-center justify-center w-full z-10">
        {/* Intentionally left empty to maintain aesthetic balance */}
      </div>

      {/* LogoScroller and Tagline near bottom */}
      <div className="w-full max-w-6xl z-10 mb-8 sm:mb-10 flex flex-col items-center space-y-8 sm:space-y-10">
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
    </div>
  );
}