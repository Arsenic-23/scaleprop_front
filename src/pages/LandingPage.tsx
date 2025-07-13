import { LogoScroller } from "../components/LogoScroller";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/home");
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden font-sans">
      {/* Top Branding */}
      <header className="text-center py-6 text-4xl font-bold tracking-wider z-10">
        SCALE FUND
      </header>

      {/* Blurred Side Overlays */}
      <div className="absolute left-0 top-0 w-28 h-full bg-black/50 backdrop-blur-md z-0" />
      <div className="absolute right-0 top-0 w-28 h-full bg-black/50 backdrop-blur-md z-0" />

      {/* Logo Rows */}
      <div className="relative z-10 space-y-4 my-12">
        <LogoScroller direction="left" />
        <LogoScroller direction="right" />
      </div>

      {/* CTA Button */}
      <div className="absolute bottom-10 w-full flex justify-center z-10">
        <button
          onClick={handleEnter}
          className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:scale-105 transition-all duration-300"
        >
          🚀 Enter Prop Firm
        </button>
      </div>
    </div>
  );
}