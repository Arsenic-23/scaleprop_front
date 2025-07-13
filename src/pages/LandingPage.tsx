import { LogoScroller } from "../components/LogoScroller";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/home");
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans flex flex-col items-center justify-start overflow-hidden">
      {/* Branding */}
      <div className="mt-20 z-10 flex items-center space-x-3 relative">
        {/* 🔘 Ring effect around logo */}
        <div className="relative w-12 h-12 rounded-full flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse blur-md" />
          <img src="/logo.png" alt="Scale Fund" className="w-10 h-10 z-10" />
        </div>
        <h1 className="text-2xl font-serif font-semibold tracking-wide">Scale Fund</h1>
      </div>

      {/* Logo Scrollers */}
      <div className="mt-16 w-full max-w-6xl space-y-6 px-4 z-10">
        <LogoScroller direction="left" />
        <LogoScroller direction="right" />
      </div>

      {/* Line above CTA */}
      <div className="mt-16 w-1/2 h-px bg-white/20 z-10" />

      {/* CTA Button */}
      <div className="mt-6 w-full flex justify-center z-10">
        <button
          onClick={handleEnter}
          className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-xl hover:scale-105 transition-all duration-300"
        >
          🚀 Enter Prop Firm
        </button>
      </div>
    </div>
  );
}