// src/components/BottomNavigation.jsx
import React, { useState, useEffect } from "react";
import { Home, BarChart2, Users, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./GlassNav.css"; // make sure this file is next to this component

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  // sync active with current route so nav updates when route changes externally
  const [active, setActive] = useState(location.pathname);
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  // Use icon components (not JSX elements) so we can render them consistently
  const tabs = [
    { path: "/home", icon: Home, label: "Home" },
    { path: "/dashboard", icon: BarChart2, label: "Dashboard" },
    { path: "/team", icon: Users, label: "Team" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const handleTabClick = (path) => {
    if (path === active) return; // optional: avoid navigating to same route
    setActive(path);
    navigate(path);
  };

  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.path === active)
  ); // fallback to 0 if not found

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="relative w-[86vw] max-w-md mx-auto">
        {/* Glass background (keeps being the background layer) */}
        <motion.div
          className="glass-nav relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Navigation icons layer */}
        <div className="relative flex justify-around items-center h-14 z-10 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.path;

            return (
              <button
                key={tab.path}
                onClick={() => handleTabClick(tab.path)}
                aria-label={tab.label}
                className="relative flex flex-col items-center justify-center text-white/75 hover:text-white transition-all duration-200 w-14"
                type="button"
              >
                <div className="relative flex items-center justify-center">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="bubble"
                        className="absolute -inset-2 bg-white/12 backdrop-blur-md rounded-full shadow-[0_0_12px_rgba(255,255,255,0.12)]"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                      />
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={isActive ? { y: -6, scale: 1.08 } : { y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 350, damping: 24 }}
                    className={`relative z-10 ${
                      isActive ? "text-white" : "text-white/60"
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.9} />
                  </motion.div>
                </div>

                <span
                  className={`text-[10px] font-medium mt-1 ${
                    isActive ? "text-white" : "text-white/55"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Animated underline/wave: positions based on activeIndex */}
        <motion.div
          className="absolute bottom-1 left-0 h-[2px] bg-gradient-to-r from-white/40 via-white/90 to-white/40 rounded-full z-0"
          initial={false}
          animate={{
            left: `${(activeIndex * 100) / tabs.length}%`,
            width: `${100 / tabs.length}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 30,
          }}
        />
      </div>
    </div>
  );
}
