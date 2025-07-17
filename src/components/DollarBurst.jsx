import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DollarBurst({ trigger = false, count = 12 }) {
  const [burstKey, setBurstKey] = useState(0);

  useEffect(() => {
    if (trigger) {
      // Restart animation on trigger
      setBurstKey((prev) => prev + 1);
    }
  }, [trigger]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      <AnimatePresence>
        {trigger &&
          Array.from({ length: count }).map((_, i) => {
            const x = Math.random() * 300 - 150; // random x offset
            const y = Math.random() * 300 - 150; // random y offset
            const scale = Math.random() * 1.5 + 0.8;
            const opacity = Math.random() * 0.4 + 0.4;
            const duration = Math.random() * 0.8 + 0.9;

            return (
              <motion.span
                key={`${burstKey}-${i}`}
                initial={{ x: 0, y: 0, scale, opacity }}
                animate={{ x, y, opacity: 0, rotate: 180 }}
                exit={{ opacity: 0 }}
                transition={{ duration, ease: "easeOut" }}
                className="absolute text-green-400 text-2xl blur-sm select-none"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                $
              </motion.span>
            );
          })}
      </AnimatePresence>
    </div>
  );
}