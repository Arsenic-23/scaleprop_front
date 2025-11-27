import React, { useState } from "react";
import { Home, BarChart2, Users, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(location.pathname);

  const tabs = [
    { path: "/home", icon: <Home size={22} /> },
    { path: "/plans", icon: <BarChart2 size={22} /> },
    { path: "/account", icon: <Users size={22} /> },
    { path: "/profile", icon: <User size={22} /> },
  ];

  const handleTabClick = (path: string) => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(40);
    }
    setActive(path);
    navigate(path);
  };

  return (
    <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        className="relative w-[82vw] max-w-sm mx-auto h-[68px] rounded-3xl overflow-hidden"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          backdropFilter: "blur(38px)",
          WebkitBackdropFilter: "blur(38px)",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow:
            "0 22px 45px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -2px 6px rgba(0,0,0,0.16)",
        }}
      >
        {/* Top Shine Layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))",
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />

        {/* Glass Bloom Gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% -10%, rgba(255,255,255,0.25), transparent 60%)",
            pointerEvents: "none",
            opacity: 0.55,
          }}
        />

        {/* Noise Layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "url('https://grainy-gradients.vercel.app/noise.png')",
            opacity: 0.24,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />

        {/* Button Row */}
        <div className="relative z-20 h-full flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = active === tab.path;

            return (
              <button
                key={tab.path}
                onClick={() => handleTabClick(tab.path)}
                className="relative flex items-center justify-center w-14 h-full"
              >
                <div className="relative flex items-center justify-center">
                  <AnimatePresence mode="popLayout">
                    {isActive && (
                      <motion.div
                        layoutId="activeBubble"
                        className="absolute w-12 h-12 rounded-2xl"
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.4 }}
                        transition={{
                          type: "spring",
                          stiffness: 240,
                          damping: 20,
                        }}
                        style={{
                          backdropFilter: "blur(24px)",
                          WebkitBackdropFilter: "blur(24px)",
                          background: "rgba(255,255,255,0.18)",
                          border: "1px solid rgba(255,255,255,0.28)",
                          boxShadow:
                            "0 6px 26px rgba(0,0,0,0.55), inset 0 1px 2px rgba(255,255,255,0.45)",
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{
                      scale: isActive ? 1.28 : 1,
                      y: isActive ? -2 : 0,
                      opacity: isActive ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.22 }}
                    className={isActive ? "text-white" : "text-white/50"}
                  >
                    {tab.icon}
                  </motion.div>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
