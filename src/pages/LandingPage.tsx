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
      <div className="mt-20 z-10 flex items-center space-x-3 relative">
        {/* 🔘 Circle effect around logo with hover */}
        <div className="relative w-12 h-12 rounded-full flex items-center justify-center border border-white/30 hover:border-white transition-all duration-300 hover:shadow-[0_0_12px_2px_rgba(255,255,255,0.2)]">
          <img src="/logo.png" alt="Scale Fund" className="w-8 h-8 z-10" />
        </div>
        <h1 className="text-xl font-serif font-semibold tracking-wide">Scale Fund</h1>
      </div>

      {/* Logo Scrollers */}
      <div className="mt-10 w-full max-w-6xl space-y-6 px-4 z-10">
        <LogoScroller direction="left" />
        <LogoScroller direction="right" />
      </div>

      {/* CTA Text + Button */}
      <div className="w-full flex flex-col items-center z-10">
        <p className="text-sm text-white/70 font-light italic mb-4">
          Crafted for those who dare to scale beyond limits.
        </p>
        <div className="w-1/2 h-px bg-white/20 my-4" />
        <button
          onClick={handleEnter}
          className="bg-white text-black px-8 py-3 rounded-full text-lg font-medium shadow-xl hover:scale-105 transition-all duration-300"
        >
          🚀 Enter Prop Firm
        </button>
      </div>
    </div>
  );
}