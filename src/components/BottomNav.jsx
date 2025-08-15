import React, { useState } from "react";
import { Home, BarChart2, Users, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: BarChart2, label: "Dashboard", path: "/account" },
  { icon: Users, label: "Community", path: "/community" },
  { icon: User, label: "Account", path: "/profile" },
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

  const activeIndex = tabs.findIndex((tab) => tab.path === location.pathname);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50
      bg-white/70 dark:bg-neutral-900/50
      backdrop-blur-xl border-t border-white/20 dark:border-white/10"
    >
      <div className="flex justify-around items-center relative">
        {/* Active indicator */}
        {activeIndex >= 0 && (
          <motion.div
            layout
            initial={false}
            animate={{ x: `${activeIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-0 left-0 w-1/4 h-[3px] bg-blue-500 rounded-t-full"
          />
        )}

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
      </div>

      {popup && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2.5 py-1 rounded text-xs shadow-sm dark:bg-white/10">
          {popup}
        </div>
      )}
    </nav>
  );
}

function NavItem({
  icon: Icon,
  label,
  path,
  currentPath,
  navigate,
  onLongPressStart,
  onLongPressEnd,
}: {
  icon: React.ElementType;
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
      className="flex flex-col items-center justify-center py-2 w-full relative"
    >
      <Icon
        size={24}
        strokeWidth={isActive ? 2.5 : 2}
        className={`transition-colors duration-300 ${
          isActive
            ? "text-blue-500 dark:text-blue-400"
            : "text-gray-500 dark:text-gray-400"
        }`}
      />
      <span
        className={`text-[11px] mt-0.5 transition-colors duration-300 ${
          isActive
            ? "text-blue-500 dark:text-blue-400"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        {label}
      </span>
    </button>
  );
}