import React, { useState } from "react";
import { Home, BarChart2, Users, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./GlassNav.css"; // <-- We'll define your morphing styles here

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const [active, setActive] = useState(location.pathname);

  const tabs = [
    { path: "/", icon: <Home size={22} />, label: "Home" },
    { path: "/dashboard", icon: <BarChart2 size={22} />, label: "Dashboard" },
    { path: "/team", icon: <Users size={22} />, label: "Team" },
    { path: "/profile", icon: <User size={22} />, label: "Profile" },
  ];

  const handleTabClick = (path) => {
    setActive(path);
    navigate(path);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="relative w-[90vw] max-w-md mx-auto">
        {/* Glass-morphed container */}
        <motion.div
          className="glass-nav relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        <div className="relative flex justify-around items-center h-16 z-10">
          {tabs.map((tab) => {
            const isActive = active === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => handleTabClick(tab.path)}
                className="relative flex flex-col items-center justify-center text-white/80 hover:text-white transition-all duration-300"
              >
                <div className="relative flex items-center justify-center">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="bubble"
                        className="absolute -inset-3 bg-white/15 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                  <motion.div
                    animate={{
                      y: isActive ? -6 : 0,
                      scale: isActive ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    {tab.icon}
                  </motion.div>
                </div>
                <span
                  className={`text-[10px] font-medium mt-1 ${
                    isActive ? "text-white" : "text-white/60"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
