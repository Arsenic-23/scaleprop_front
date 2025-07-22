import React, { useState } from "react";
import { Home, BarChart2, Users, User, LucideIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface Tab {
  icon: LucideIcon;
  label: string;
  path: string;
}

const tabs: Tab[] = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: BarChart2, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Community", path: "/community" },
  { icon: User, label: "Account", path: "/account" },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [popup, setPopup] = useState<string | null>(null);
  let pressTimer: NodeJS.Timeout;

  const handleLongPressStart = (label: string) => {
    window.navigator.vibrate?.([30, 20, 30]);
    pressTimer = setTimeout(() => setPopup(label), 500);
  };

  const handleLongPressEnd = () => {
    clearTimeout(pressTimer);
    setPopup(null);
  };

  return (
    <nav
      className="fixed bottom-3 left-1/2 transform -translate-x-1/2
      bg-black/80 text-white dark:bg-neutral-900/80 dark:text-neutral-100
      backdrop-blur-lg rounded-full px-4 py-2
      flex justify-around items-center z-50 w-[90%] max-w-md
      shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-white/10"
      style={{
        background: "linear-gradient(145deg, rgba(0,0,0,0.9), rgba(25,25,25,0.85))",
      }}
    >
      {tabs.map((tab, index) => (
        <NavItem
          key={index}
          icon={tab.icon}
          label={tab.label}
          path={tab.path}
          currentPath={location.pathname}
          navigate={navigate}
          onLongPressStart={handleLongPressStart}
          onLongPressEnd={handleLongPressEnd}
        />
      ))}

      {popup && (
        <div className="absolute bottom-14 bg-black/80 text-white px-3 py-1 rounded text-xs shadow-sm animate-fadeIn">
          {popup}
        </div>
      )}
    </nav>
  );
}

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  currentPath: string;
  navigate: (path: string) => void;
  onLongPressStart: (label: string) => void;
  onLongPressEnd: () => void;
}

function NavItem({
  icon: Icon,
  label,
  path,
  currentPath,
  navigate,
  onLongPressStart,
  onLongPressEnd,
}: NavItemProps) {
  const isActive = currentPath === path;

  const handleClick = () => {
    window.navigator.vibrate?.([10, 15, 10]);
    navigate(path);
  };

  return (
    <button
      onClick={handleClick}
      onMouseDown={() => onLongPressStart(label)}
      onMouseUp={onLongPressEnd}
      onMouseLeave={onLongPressEnd}
      onTouchStart={() => onLongPressStart(label)}
      onTouchEnd={onLongPressEnd}
      className={`flex flex-col items-center justify-center px-3 py-1 transition-all duration-200 ${
        isActive
          ? "text-white scale-110 font-semibold"
          : "text-gray-400 hover:text-white"
      }`}
    >
      <Icon size={20} strokeWidth={2} />
    </button>
  );
}