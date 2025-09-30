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
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col items-center justify-center h-full px-6 py-16 text-center"
      >
        {/* Elegant Icon Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 80, damping: 18 }}
          className="relative w-24 h-24 mb-6 rounded-3xl bg-white/80 dark:bg-gray-900/70 backdrop-blur-2xl shadow-xl flex items-center justify-center overflow-hidden"
        >
          {/* Soft glowing ring */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              boxShadow: [
                "0 0 0px rgba(99,102,241,0)",
                "0 0 20px rgba(99,102,241,0.15)",
                "0 0 0px rgba(99,102,241,0)",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Icon with gentle scale animation */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <BellOff className="w-10 h-10 text-gray-600 dark:text-gray-200" />
          </motion.div>
        </motion.div>

        {/* Classy Title */}
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
        >
          {title}
        </motion.h3>

        {/* Elegant Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-[16rem] leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmptyState;