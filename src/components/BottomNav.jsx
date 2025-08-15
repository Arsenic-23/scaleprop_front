import React, { useState } from "react";
import { Home, BarChart2, Users, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { icon: <Home size={16} strokeWidth={2} />, label: "", path: "/home" },
  { icon: <BarChart2 size={16} strokeWidth={2} />, label: "", path: "/account" },
  { icon: <Users size={16} strokeWidth={2} />, label: "", path: "/community" },
  { icon: <User size={16} strokeWidth={2} />, label: "", path: "/profile" },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null);
  let pressTimer;

  const handleLongPressStart = (label) => {
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
      className="fixed bottom-0 left-0 w-full  
      bg-white dark:bg-neutral-900  
      text-neutral-800 dark:text-neutral-100  
      flex justify-around items-center  
      z-50 border-t border-neutral-300 dark:border-neutral-700 py-2"
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
      className={`flex flex-col items-center justify-center px-2 py-0.5 transition-all duration-200 ${
        isActive
          ? "text-blue-500 dark:text-white font-semibold"
          : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}