import React, { useState } from "react";
import { Home, BarChart2, Users, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(location.pathname);

  const tabs = [
    { path: "/home", icon: <Home size={20} /> },
    { path: "/account", icon: <BarChart2 size={20} /> },
    { path: "/plans", icon: <Users size={20} /> },
    { path: "/profile", icon: <User size={20} /> },
  ];

  // iOS-like haptic feedback (works on mobile browsers)
  const triggerHaptic = (type = "light") => {
    if ("vibrate" in navigator) {
      if (type === "heavy") navigator.vibrate([10, 40, 10]);
      else if (type === "medium") navigator.vibrate(30);
      else navigator.vibrate(15);
    }
    // For iOS-like feel in desktop browsers:
    if (window && "navigator" in window && window.navigator.userActivation) {
      // no-op fallback (desktop haptic simulation)
    }
  };

  const handleTabClick = (path) => {
    if (active !== path) {
      triggerHaptic("light");
      setActive(path);
      navigate(path);
    } else {
      triggerHaptic("medium"); // subtle feedback on re-tap
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 select-none">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative w-[80vw] max-w-sm mx-auto"
      >
        {/* Glass Background */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{
            background: "rgba(35, 35, 35, 0.78)",
            backdropFilter: "blur(48px) saturate(180%)",
            WebkitBackdropFilter: "blur(48px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.22)",
            boxShadow:
              "0 18px 45px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(255,255,255,0.12)",
          }}
        />

        {/* Grain Texture Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "url('https://grainy-gradients.vercel.app/noise.png')",
            opacity: 0.25,
            mixBlendMode: "overlay",
          }}
        />

        {/* Tabs */}
        <div className="relative flex justify-around items-center h-14 z-10">
          {tabs.map((tab) => {
            const isActive = active === tab.path;
            return (
              <motion.button
                key={tab.path}
                onClick={() => handleTabClick(tab.path)}
                whileTap={{
                  scale: 0.88,
                  transition: { type: "spring", stiffness: 500, damping: 20 },
                }}
                transition={{ type: "spring", stiffness: 380, damping: 20 }}
                className="relative flex items-center justify-center p-3 focus:outline-none"
              >
                <div className="relative flex items-center justify-center">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="bubble"
                        className="absolute w-11 h-11 rounded-full"
                        style={{
                          background:
                            "linear-gradient(145deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06))",
                          backdropFilter: "blur(40px)",
                          WebkitBackdropFilter: "blur(40px)",
                          border: "1px solid rgba(255,255,255,0.28)",
                          boxShadow:
                            "0 4px 16px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.35)",
                        }}
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 22,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{
                      scale: isActive ? 1.25 : 1,
                      y: isActive ? -2 : 0,
                      rotate: isActive ? [0, -5, 0, 5, 0] : 0,
                    }}
                    transition={{
                      duration: 0.35,
                      ease: "easeOut",
                      bounce: 0.35,
                    }}
                    className={
                      isActive
                        ? "text-white drop-shadow-[0_2px_6px_rgba(255,255,255,0.25)]"
                        : "text-white/70"
                    }
                  >
                    {tab.icon}
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}