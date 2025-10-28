import React, { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellOff } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

const EmptyState: FC<EmptyStateProps> = ({
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
          background: "radial-gradient(circle at 20% 10%, #111 0%, #000 100%)",
        }}
      >
        {/* Glassy Floating Card */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 80, damping: 18 }}
          className="relative w-28 h-28 mb-8 rounded-3xl overflow-hidden flex items-center justify-center"
          style={{
            background: "rgba(20,20,20,0.45)",
            border: "1px solid rgba(255,255,255,0.22)",
            boxShadow:
              "0 10px 32px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(255,255,255,0.10)",
            backdropFilter: "blur(22px) saturate(155%)",
            WebkitBackdropFilter: "blur(22px) saturate(155%)",
          }}
        >
          {/* Subtle Noise */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "url('https://grainy-gradients.vercel.app/noise.png')",
              backgroundSize: "cover",
            }}
          />

          {/* Floating Glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={{
              boxShadow: [
                "0 0 0px rgba(99,102,241,0)",
                "0 0 24px rgba(99,102,241,0.22)",
                "0 0 0px rgba(99,102,241,0)",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Icon */}
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <BellOff className="w-11 h-11 text-gray-200" />
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
