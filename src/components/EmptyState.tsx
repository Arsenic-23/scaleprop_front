import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EmptyStateProps {
  icon?: string;
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "notifications_off",
  title = "Nothing new right now",
  subtitle = "You’ll see updates here as soon as they’re available.",
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key="empty-state"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col items-center justify-center h-full px-8 py-20 text-center"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 120, damping: 12 }}
          className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500 flex items-center justify-center shadow-lg"
        >
          <span className="material-symbols-outlined text-white text-4xl">
            {icon}
          </span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-2xl font-medium tracking-tight text-gray-900 dark:text-gray-100"
        >
          {title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-base text-gray-500 dark:text-gray-400 mt-3 leading-relaxed max-w-md"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmptyState;