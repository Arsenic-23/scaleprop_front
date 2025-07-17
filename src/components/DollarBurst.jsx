import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DollarBurst({ trigger = false, count = 18 }) {
  const [burstKey, setBurstKey] = useState(0);

  useEffect(() => {
    if (trigger) {
      setBurstKey((prev) => prev + 1);
    }
  }, [trigger]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      <AnimatePresence>
        {trigger &&
          Array.from({ length: count }).map((_, i) => {
            const angle = (360 / count) * i;
            const radius = Math.random() * 120 + 80;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            const scale = Math.random() * 0.6 + 0.8;
            const duration = Math.random() * 0.8 + 1.2;

            return (
              <motion.span
                key={`${burstKey}-${i}`}
                initial={{ x: 0, y: 0, scale: 0.3, opacity: 1, rotate: 0 }}
                animate={{ x, y, scale, opacity: 0, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ duration, ease: "easeOut" }}
                className="absolute text-3xl font-bold blur-sm select-none dollar-gradient"
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

      {/* Add gradient styling via tailwind or inline if needed */}
      <style jsx>{`
        .dollar-gradient {
          background: linear-gradient(45deg, #00ff88, #00ffaa, #1fff77);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientPulse 3s ease infinite;
        }

        @keyframes gradientPulse {
          0% {
            filter: hue-rotate(0deg);
          }
          50% {
            filter: hue-rotate(45deg);
          }
          100% {
            filter: hue-rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}