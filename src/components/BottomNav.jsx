import React, { useState } from "react";
import { Home, BarChart2, Users, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { icon: <Home size={20} strokeWidth={2} />, label: "Home", path: "/home" },
  { icon: <BarChart2 size={20} strokeWidth={2} />, label: "Dashboard", path: "/account" },
  { icon: <Users size={20} strokeWidth={2} />, label: "Community", path: "/community" },
  { icon: <User size={20} strokeWidth={2} />, label: "Account", path: "/profile" },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [popup, setPopup] = useState<string | null>(null);
  let pressTimer: NodeJS.Timeout;

  const handleLongPressStart = (label: string) => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate([50, 30, 50]);
    }
    pressTimer = setTimeout(() => setPopup(label), 500);
  };

  const handleLongPressEnd = () => {
    clearTimeout(pressTimer);
    setPopup(null);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0
      bg-white dark:bg-neutral-900
      text-neutral-800 dark:text-neutral-100
      flex justify-around items-center z-50
      border-t border-neutral-200 dark:border-neutral-800"
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
        <div className="absolute bottom-14 bg-black/80 text-white px-2.5 py-1 rounded text-xs shadow-sm dark:bg-white/10">
          {popup}
        </div>
      )}
    </nav>
  );
}

function NavItem({
  icon,
  label,
  path,
  currentPath,
  navigate,
  onLongPressStart,
  onLongPressEnd,
}: {
  icon: JSX.Element;
  label: string;
  path: string;
  currentPath: string;
  navigate: (path: string) => void;
  onLongPressStart: (label: string) => void;
  onLongPressEnd: () => void;
}) {
  const isActive = currentPath === path;

  const handleClick = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate([10, 15, 10]);
    }
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
      className={`flex flex-col items-center justify-center py-2 w-full transition-all duration-200 ${
        isActive
          ? "text-blue-500 dark:text-blue-400 font-medium"
          : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
      }`}
    >
      {icon}
      <span className="text-xs mt-0.5">{label}</span>
    </button>
  );
}