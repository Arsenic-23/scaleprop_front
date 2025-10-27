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
      <div className="relative w-[80vw] max-w-sm mx-auto">

        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.45) 100%)",
            backdropFilter: "blur(34px)",
            WebkitBackdropFilter: "blur(34px)",
            border: "1.2px solid rgba(255,255,255,0.14)",
            boxShadow:
              "0 12px 45px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(255,255,255,0.06)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
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
                className="relative flex items-center justify-center p-2"
              >
                <div className="relative flex items-center justify-center">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="bubble"
                        className="absolute w-10 h-10 rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.12)",
                          backdropFilter: "blur(34px)",
                          WebkitBackdropFilter: "blur(34px)",
                          boxShadow:
                            "0 0 10px rgba(255,255,255,0.18)",
                        }}
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      />
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{
                      scale: isActive ? 1.25 : 1,
                      y: isActive ? -2 : 0,
                    }}
                    transition={{ duration: 0.15 }}
                    className={`${
                      isActive ? "text-white" : "text-white/55"
                    }`}
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
