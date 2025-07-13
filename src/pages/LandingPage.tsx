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
      <div className="flex items-center mt-10 z-10">
        <img src="/logo.png" alt="Scale Fund" className="w-10 h-10 mr-3" />
        <h1 className="text-3xl font-serif font-bold tracking-tight">SCALE FUND</h1>
      </div>

      {/* Logo Scrollers */}
      <div className="mt-24 w-full max-w-6xl space-y-6 px-2 z-10">
        <LogoScroller direction="left" />
        <LogoScroller direction="right" />
      </div>

      {/* CTA Button */}
      <div className="absolute bottom-10 w-full flex justify-center z-10">
        <button
          onClick={handleEnter}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-xl hover:scale-105 transition-all duration-300"
        >
          🚀 Enter Prop Firm
        </button>
      </div>
    </div>
  );
}