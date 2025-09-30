import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EmptyStateProps {
  icon?: string;
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "notifications_off",
  title = "No Notifications",
  subtitle = "You’re all caught up! We’ll let you know when something new arrives.",
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key="empty-state"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col items-center justify-center h-full px-8 py-16 text-center"
      >
        {/* Pulsing Icon */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 120, damping: 14 }}
          className="w-16 h-16 mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow-sm"
        >
          <motion.span
            className="material-symbols-outlined text-gray-600 dark:text-gray-300 text-3xl"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            {icon}
          </motion.span>
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
        >
          {title}
        </motion.h3>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed max-w-sm"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmptyState;