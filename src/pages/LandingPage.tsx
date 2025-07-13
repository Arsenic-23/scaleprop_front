import { LogoScroller } from "../components/LogoScroller";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/home");
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans flex flex-col items-center justify-between overflow-hidden pb-20">
      {/* Branding */}
      <div className="mt-14 z-10 flex items-center space-x-3 relative">
        {/* 🔘 Ring effect around logo */}
        <div className="relative w-12 h-12 rounded-full flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse blur-md" />
          <img src="/logo.png" alt="Scale Fund" className="w-10 h-10 z-10" />
        </div>
        <h1 className="text-2xl font-serif font-semibold tracking-wide">Scale Fund</h1>
      </div>

      {/* Logo Scrollers */}
      <div className="mt-10 w-full max-w-6xl space-y-6 px-4 z-10">
        <LogoScroller direction="left" />
        <LogoScroller direction="right" />
      </div>

      {/* CTA Button pinned bottom with elegant line above */}
      <div className="w-full flex flex-col items-center z-10">
        <div className="w-1/2 h-px bg-white/20 my-6" />
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