import React from "react";
import { motion } from "framer-motion";

interface SwipeableNotificationProps {
  id: number;
  children: React.ReactNode;
  onRemove: (id: number) => void;
}

const SwipeableNotification: React.FC<SwipeableNotificationProps> = ({
  id,
  children,
  onRemove,
}) => {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(event, info) => {
        if (info.offset.x < -100) {
          onRemove(id);
        }
      }}
      initial={{ opacity: 1, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

export default SwipeableNotification;