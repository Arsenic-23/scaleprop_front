import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellOff } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "All Clear",
  subtitle = "You’re fully up to date — nothing needs your attention.",
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key="empty-state"
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col items-center justify-center h-full px-8 py-16 text-center"
      >
        {/* Elegant Pulsing Icon Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 18 }}
          className="relative w-20 h-20 mb-6 rounded-2xl bg-gradient-to-tr from-gray-50 via-white to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-lg flex items-center justify-center overflow-hidden"
        >
          {/* Soft glowing ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 0px rgba(99,102,241,0)",
                "0 0 14px rgba(99,102,241,0.25)",
                "0 0 0px rgba(99,102,241,0)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Lucide Icon */}
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          >
            <BellOff className="w-9 h-9 text-gray-700 dark:text-gray-200" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
        >
          {title}
        </motion.h3>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed max-w-sm"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmptyState;