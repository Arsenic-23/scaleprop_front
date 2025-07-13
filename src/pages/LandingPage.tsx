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
      <div className="flex items-center mt-12 z-10">
        <img src="/logo.png" alt="Scale Fund" className="w-12 h-12 mr-4" />
        <h1 className="text-3xl font-extrabold tracking-wide">SCALE FUND</h1>
      </div>

      {/* Logos in frame */}
      <div className="mt-20 w-full max-w-5xl space-y-6 px-6 z-10">
        <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-md p-4 shadow-inner">
          <LogoScroller direction="left" />
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-md p-4 shadow-inner">
          <LogoScroller direction="right" />
        </div>
      </div>

      {/* CTA button */}
      <div className="absolute bottom-10 w-full flex justify-center z-10">
        <button
          onClick={handleEnter}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-xl hover:scale-105 transition-all duration-300"
        >
          🚀 Enter Prop Firm
        </button>
      </div>
    </div>
  );
}