import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellOff } from "lucide-react";

const EmptyState = ({
  title = "All Clear",
  subtitle = "You're up to date. No new notifications.",
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key="empty-state"
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col items-center justify-center h-full px-6 py-20 text-center"
        style={{
          background:
            "radial-gradient(ellipse at bottom, rgba(20,20,20,0.6), rgba(10,10,10,1))",
        }}
      >
        {/* Glassmorphic Bell Card */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.15,
            type: "spring",
            stiffness: 80,
            damping: 18,
          }}
          className="relative w-28 h-28 mb-8 flex items-center justify-center rounded-3xl overflow-hidden"
          style={{
            background: "rgba(15, 15, 15, 0.45)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 4px 24px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(255,255,255,0.03)",
            backdropFilter: "blur(30px) saturate(160%)",
            WebkitBackdropFilter: "blur(30px) saturate(160%)",
          }}
        >
          {/* Gloss reflection */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, rgba(0,0,0,0.25) 100%)",
              mixBlendMode: "overlay",
            }}
          />

          {/* Grain layer */}
          <div
            className="absolute inset-0 opacity-[0.18] pointer-events-none"
            style={{
              backgroundImage:
                "url('https://grainy-gradients.vercel.app/noise.png')",
              backgroundSize: "cover",
              mixBlendMode: "overlay",
            }}
          />

          {/* Gentle pulse glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              boxShadow: [
                "0 0 0px rgba(59,130,246,0)",
                "0 0 24px rgba(59,130,246,0.25)",
                "0 0 0px rgba(59,130,246,0)",
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Bell Icon */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <BellOff className="w-11 h-11 text-white/90" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="text-2xl font-semibold tracking-tight text-white"
        >
          {title}
        </motion.h3>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-sm text-white/60 mt-2 max-w-[18rem] leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmptyState;