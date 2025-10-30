import { LogoScroller } from "../components/LogoScroller";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleEnter = () => {
    if (navigator.vibrate) navigator.vibrate(150);
    navigate("/home");
  };

  return (
    <div
      className="relative min-h-[100dvh] bg-black text-white flex flex-col items-center overflow-y-auto px-4 sm:px-6 lg:px-8"
      style={{
        paddingTop: "calc(2.5rem + env(safe-area-inset-top, 0px))",
        paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* Logo and Title */}
      <div className="z-10 flex items-center space-x-2 mb-6">
        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Scale Fund"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
        </div>
        <h1
          className="font-semibold tracking-tight"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
          }}
        >
          Scalefund
        </h1>
      </div>

      {/* Removed TypewriterTimeline — blank space retained for layout balance */}
      <div className="flex-grow flex items-center justify-center w-full z-10" />

      {/* Logo Scroller */}
      <div className="w-full max-w-6xl z-10 mb-10">
        <LogoScroller />
      </div>

      {/* CTA Section */}
      <div className="z-20 w-full flex flex-col items-center">
        <p
          className="text-center font-light opacity-80 mb-4 tracking-wide"
          style={{
            fontSize: "clamp(0.875rem, 1.5vw, 1.1rem)",
            paddingInline: "0.5rem",
          }}
        >
          Crafted for those who dare to scale beyond limits.
        </p>

        {/* Green Frost Glass CTA */}
        <button
          onClick={handleEnter}
          className="relative rounded-full font-medium transition-all duration-300 ease-in-out active:scale-[0.98] overflow-hidden group"
          style={{
            width: "clamp(140px, 40vw, 180px)",
            paddingBlock: "0.75rem",
            fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
            color: "#E9FFE9",
            background: "rgba(0,255,127,0.16)",
            backdropFilter: "blur(34px)",
            WebkitBackdropFilter: "blur(34px)",
            border: "1px solid rgba(0,255,127,0.28)",
            boxShadow:
              "0 8px 28px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.42), inset 0 -1px 0 rgba(0,255,127,0.14)",
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-[45%] rounded-t-full"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.38), rgba(255,255,255,0))",
              opacity: 0.85,
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none rounded-full"
            style={{
              background:
                "url('https://grainy-gradients.vercel.app/noise.png')",
              opacity: 0.2,
              mixBlendMode: "overlay",
            }}
          />

          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-18 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,255,127,0.35), transparent 72%)",
            }}
          />

          <span className="relative z-10 font-medium tracking-wide">
            Join Now
          </span>
        </button>
      </div>
    </div>
  );
}