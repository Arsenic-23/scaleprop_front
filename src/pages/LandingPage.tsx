import { LogoScroller } from "../components/LogoScroller";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/home");
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center overflow-hidden">
      {/* Side blur overlays */}
      <div className="absolute left-0 top-0 w-24 h-full bg-black/50 backdrop-blur-md z-0" />
      <div className="absolute right-0 top-0 w-24 h-full bg-black/50 backdrop-blur-md z-0" />

      {/* Branding */}
      <div className="flex items-center mt-16 z-10">
        <img src="/logo.png" alt="Scale Fund" className="w-10 h-10 mr-3" />
        <h1 className="text-2xl font-extrabold tracking-wide">SCALE FUND</h1>
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
          className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-xl hover:scale-105 transition-all duration-300"
        >
          🚀 Enter Prop Firm
        </button>
      </div>
    </div>
  );
}