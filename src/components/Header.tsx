import React from "react";

const COLORS = {
  backgroundDark: "#000000",
  textDark: "#FFFFFF",
};

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
  const triggerVibration = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  const handleBack = () => {
    triggerVibration();
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <header
      className="sticky top-0 z-10 flex items-center border-b border-white/20 p-4 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Glassmorphic Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center justify-center rounded-full p-2 transition-all duration-300 active:scale-95 hover:scale-105"
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 4px 20px rgba(255, 255, 255, 0.1)",
          width: "42px",
          height: "42px",
          color: COLORS.textDark,
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: "20px",
            color: "#fff",
            filter: "drop-shadow(0 0 3px rgba(255,255,255,0.3))",
          }}
        >
          arrow_back_ios_new
        </span>
      </button>

      {/* Title */}
      <h1
        className="flex-1 text-center text-xl font-bold tracking-wide"
        style={{
          fontFamily: "Manrope, sans-serif",
          color: COLORS.textDark,
        }}
      >
        {title}
      </h1>

      {/* Spacer for symmetry */}
      <div className="w-[42px]" />
    </header>
  );
};

export default Header;