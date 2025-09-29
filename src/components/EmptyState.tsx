import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EmptyStateProps {
  icon?: string;
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "notifications_off",
  title = "You’re all caught up",
  subtitle = "Come back later for new updates.",
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key="empty-state"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col items-center justify-center h-full px-8 py-16 text-center"
      >
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
          className="material-symbols-outlined text-6xl text-gray-400 mb-4"
        >
          {icon}
        </motion.span>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-xl font-semibold text-gray-900 dark:text-gray-100"
        >
          {title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-base text-gray-500 dark:text-gray-400 mt-2 leading-relaxed max-w-sm"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmptyState;