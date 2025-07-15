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
      <div className="mt-16 z-10 flex items-center space-x-2 relative">
        {/* 🔘 Classy Icon Logo */}
        <div className="relative w-10 h-10 rounded-full flex items-center justify-center border border-white/20 hover:border-white transition duration-300 shadow-md bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
          <img src="/logo.png" alt="cale Fund" className="w-6 h-6 z-10" />
        </div>

        {/* 🖋️ Elegant Brand Font */}
        <h1
          className="text-xl font-semibold tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          cale Fund
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

        {/* 🟢 Modern Glassy Join Button */}
        <button
          onClick={handleEnter}
          className="relative px-8 py-3 rounded-full bg-gradient-to-br from-emerald-500 via-green-400 to-lime-400 text-black font-semibold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
          style={{
            fontFamily: "'Inter', sans-serif",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        >
          ✨ Join Now
        </button>
      </div>
    </div>
  );
}