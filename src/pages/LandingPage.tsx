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
      <div className="mt-20 z-10 flex items-center space-x-2 relative">
        <div className="relative w-10 h-10 rounded-full flex items-center justify-center border border-white/20 hover:border-white transition duration-300">
          <img src="/logo.png" alt="Scale Fund" className="w-7 h-7 z-10" />
        </div>
        <h1 className="text-lg font-semibold tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
          Scale Fund
        </h1>
      </div>

      {/* Logo Scrollers */}
      <div className="mt-10 w-full max-w-6xl space-y-6 px-4 z-10">
        <LogoScroller direction="left" />
        <LogoScroller direction="right" />
      </div>

      {/* CTA */}
      <div className="w-full flex flex-col items-center z-10 pb-10">
        <p className="text-sm md:text-base text-white font-light opacity-80 mb-4 tracking-wide text-center">
          Crafted for those who dare to scale beyond limits.
        </p>
        <button
          onClick={handleEnter}
          className="relative w-[200px] py-3 rounded-full bg-white text-black font-semibold text-base overflow-hidden transition-all duration-300 ease-in-out active:scale-[0.98] shadow-md"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Join Now
        </button>
      </div>
    </div>
  );
}