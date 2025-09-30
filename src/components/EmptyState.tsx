import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellOff } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
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
        className="flex flex-col items-center justify-center h-full px-6 py-20 text-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900/20 dark:via-gray-900/10 dark:to-gray-900/20"
      >
        {/* Floating Card Container */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 80, damping: 18 }}
          className="relative w-28 h-28 mb-8 rounded-3xl bg-white/80 dark:bg-gray-900/70 backdrop-blur-3xl shadow-2xl flex items-center justify-center overflow-hidden"
        >
          {/* Floating Shadow/Glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              boxShadow: [
                "0 0 0px rgba(99,102,241,0)",
                "0 0 24px rgba(99,102,241,0.18)",
                "0 0 0px rgba(99,102,241,0)",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Bell Icon */}
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <BellOff className="w-11 h-11 text-gray-700 dark:text-gray-200" />
          </motion.div>
        </motion.div>

        {/* Elegant Title */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
        >
          {title}
        </motion.h3>

        {/* Refined Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-[18rem] leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmptyState;