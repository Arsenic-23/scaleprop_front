import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EmptyStateProps {
  icon?: string;
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "notifications_off",
  title = "You’re all caught up 🎉",
  subtitle = "We’ll let you know when something new arrives.",
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key="empty-state"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex flex-col items-center justify-center h-full text-center px-6 py-12"
      >
        <span className="material-symbols-outlined text-5xl text-gray-500 mb-3">
          {icon}
        </span>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmptyState;