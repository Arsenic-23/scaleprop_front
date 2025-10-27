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

  const handleTabClick = (path) => {
    setActive(path);
    navigate(path);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="relative w-[82vw] max-w-sm mx-auto">
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(23px)",
            WebkitBackdropFilter: "blur(23px)",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(255,255,255,0.1)",
            position: "relative",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div
            className="pointer-events-none"
            style={{
              content: "",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
            }}
          />
          <div
            className="pointer-events-none"
            style={{
              content: "",
              position: "absolute",
              top: 0,
              left: 0,
              width: "1px",
              height: "100%",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.8), transparent, rgba(255,255,255,0.3))",
            }}
          />
        </motion.div>

        <div className="relative flex justify-around items-center h-14 z-10">
          {tabs.map((tab) => {
            const isActive = active === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => handleTabClick(tab.path)}
                className="relative flex items-center justify-center p-2 transition-all duration-300"
              >
                <div className="relative flex items-center justify-center">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="bubble"
                        className="absolute w-10 h-10 rounded-full bg-white/10 backdrop-blur-md"
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      />
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{
                      scale: isActive ? 1.28 : 1,
                      y: isActive ? -2 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className={`${isActive ? "text-white" : "text-white/60"}`}
                  >
                    {tab.icon}
                  </motion.div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
