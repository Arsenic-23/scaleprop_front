import { LogoScroller } from "../components/LogoScroller";
import { TypewriterTimeline } from "../components/TypewriterTimeline";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleEnter = () => {
    if (navigator.vibrate) {
      navigator.vibrate([100, 250, 100]);
    }
    navigate("/home");
  };

  return (
    <div
      className="relative min-h-[100dvh] bg-black text-white font-sans flex flex-col items-center overflow-y-auto px-4 sm:px-6 lg:px-8"
      style={{
        paddingTop: "calc(2.5rem + env(safe-area-inset-top, 0px))",
        paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* Branding at top */}
      <div className="z-10 flex items-center space-x-2 mb-6">
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

      {/* Typewriter Timeline - vertically centered */}
      <div className="flex-grow flex items-center justify-center w-full z-10">
        <TypewriterTimeline />
      </div>

      {/* Logo Scroller - just above CTA */}
      <div className="w-full max-w-6xl z-10 mb-10">
        <LogoScroller />
      </div>

      {/* CTA Section - pinned above bottom */}
      <div className="z-20 w-full flex flex-col items-center">
        <p
          className="text-center font-light opacity-80 mb-4 tracking-wide"
          style={{
            fontSize: "clamp(0.875rem, 1.5vw, 1.1rem)",
            paddingInline: "0.5rem",
          }}
        >
          Crafted for those who dare to scale beyond limits.
        </p>
        <button
          onClick={handleEnter}
          className="rounded-full text-black font-medium transition-all duration-300 ease-in-out active:scale-[0.98] shadow-md"
          style={{
            fontFamily: "'Inter', sans-serif",
            backgroundColor: "#00FF7F", // Parrot Green
            width: "clamp(140px, 40vw, 180px)",
            paddingBlock: "0.75rem",
            fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
          }}
        >
          Join Now
        </button>
      </div>
    </div>
  );
}