import React from "react";
import { Home, BarChart2, Users, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BarChart2, label: "Stats", path: "/stats" },
  { icon: Users, label: "Community", path: "/community" },
  { icon: User, label: "Profile", path: "/profile" },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] z-50">
      <motion.div
        className="rounded-3xl backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.25)]"
        style={{
          background: "rgba(255,255,255,0.05)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Deep grain overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "url('https://grainy-gradients.vercel.app/noise.png') repeat",
            opacity: 0.2,
            mixBlendMode: "overlay",
          }}
        />

        <div className="flex items-center justify-around p-3 relative">
          {tabs.map((tab) => {
            const active = location.pathname === tab.path;
            const Icon = tab.icon;

            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center gap-1"
              >
                <motion.div
                  animate={{
                    y: active ? -8 : 0,
                    scale: active ? 1.1 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative p-3 rounded-full"
                >
                  {active && (
                    <motion.div
                      layoutId="nav-highlight"
                      className="absolute inset-0 rounded-full blur-lg"
                      style={{
                        background: "rgba(0,200,255,0.18)", // reduced neon intensity
                      }}
                    />
                  )}

                  <Icon
                    size={22}
                    className={
                      active
                        ? "text-cyan-300 drop-shadow-[0_0_4px_rgba(0,200,255,0.4)]"
                        : "text-gray-300 opacity-70"
                    }
                  />
                </motion.div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
