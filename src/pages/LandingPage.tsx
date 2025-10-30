import { LogoScroller } from "../components/LogoScroller";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
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
      <div className="z-10 flex items-center space-x-2 mt-4 sm:mt-6 mb-10 sm:mb-12">
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

      {/* Middle space for clean breathing room */}
      <div className="flex-grow flex items-center justify-center w-full z-10">
        {/* Empty space intentionally left for balanced composition */}
      </div>

      {/* Logo Scroller + Tagline Section */}
      <div className="w-full max-w-6xl z-10 mb-24 sm:mb-28 flex flex-col items-center space-y-8 sm:space-y-10">
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