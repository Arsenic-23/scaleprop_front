import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EmptyStateProps {
  icon?: string;
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "notifications_off",
  title = "All Clear",
  subtitle = "There’s nothing waiting for you right now.",
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key="empty-state"
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col items-center justify-center h-full px-8 py-16 text-center"
      >
        {/* Pulsing Icon */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 18 }}
          className="w-14 h-14 mb-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow-sm"
        >
          <motion.span
            className="material-symbols-outlined text-gray-600 dark:text-gray-300 text-2xl"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            {icon}
          </motion.span>
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100"
        >
          {title}
        </motion.h3>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed max-w-xs"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmptyState;