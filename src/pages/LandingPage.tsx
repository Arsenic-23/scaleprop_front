// src/pages/LandingPage.tsx
import { LogoScroller } from "../components/LogoScroller";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleEnter = () => {
    if (navigator.vibrate) {
      navigator.vibrate([100, 150, 100]);
    }
    navigate("/home");
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans flex flex-col items-center justify-between overflow-hidden pb-20">
      {/* Branding */}
      <div className="mt-20 z-10 flex items-center space-x-3 relative">
        <img src="/logo.png" alt="Scale Fund" className="w-8 h-8 object-contain" />
        <h1
          className="text-lg font-semibold tracking-tight"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Scale Fund
        </h1>
      </div>

      {/* Spacer to push scroller near the bottom */}
      <div className="flex-grow" />

      {/* Logo Scroller */}
      <div className="w-full max-w-6xl px-4 z-10 mb-6">
        <LogoScroller />
      </div>

      {/* CTA Section */}
      <div className="w-full flex flex-col items-center z-10 pb-10">
        <p className="text-sm md:text-base text-white font-light opacity-80 mb-4 tracking-wide text-center">
          Crafted for those who dare to scale beyond limits.
        </p>
        <button
          onClick={handleEnter}
          className="w-[160px] py-2.5 rounded-full bg-white text-black font-medium text-sm transition-all duration-300 ease-in-out active:scale-[0.98] shadow-md"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Join Now
        </button>
      </div>
    </div>
  );
}