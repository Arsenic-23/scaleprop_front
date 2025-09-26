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
      window.history.back(); // default go back
    }
  };

  return (
    <header
      className="sticky top-0 z-10 flex items-center border-b border-white/20 p-3 backdrop-blur-sm"
      style={{ backgroundColor: `${COLORS.backgroundDark}cc` }}
    >
      {/* Back button */}
      <button
        onClick={handleBack}
        className="flex h-full w-11 items-center justify-center"
        style={{ color: COLORS.textDark }}
      >
        <span className="material-symbols-outlined">arrow_back_ios_new</span>
      </button>

      {/* Title */}
      <h1
        className="flex-1 text-center text-xl font-bold"
        style={{ fontFamily: "Manrope, sans-serif", color: COLORS.textDark }}
      >
        {title}
      </h1>

      {/* Spacer for symmetry */}
      <div className="h-full w-11" />
    </header>
  );
};

export default Header;