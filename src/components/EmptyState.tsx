import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellOff } from "lucide-react";

interface EmptyStateProps {
  title?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "All Clear",
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
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 90, damping: 20 }}
          className="relative w-20 h-20 mb-6 rounded-2xl bg-gradient-to-tr from-white/70 to-gray-100/60 dark:from-gray-800/60 dark:to-gray-900/60 backdrop-blur-xl shadow-lg flex items-center justify-center overflow-hidden"
        >
          {/* Soft glowing ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 0px rgba(99,102,241,0)",
                "0 0 18px rgba(99,102,241,0.2)",
                "0 0 0px rgba(99,102,241,0)",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Lucide Icon */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          >
            <BellOff className="w-9 h-9 text-gray-700 dark:text-gray-200" />
          </motion.div>
        </motion.div>

        {/* Title Only */}
        <motion.h3
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
        >
          {title}
        </motion.h3>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmptyState;