import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DollarBurst({ trigger = false, count = 22 }) {
  const [burstKey, setBurstKey] = useState(0);

  useEffect(() => {
    if (trigger) {
      setBurstKey((prev) => prev + 1);
    }
  }, [trigger]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence>
        {trigger &&
          Array.from({ length: count }).map((_, i) => {
            const angle = (360 / count) * i;
            const radius = Math.random() * 80 + 90;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            const duration = Math.random() * 0.3 + 1.0;

            return (
              <motion.span
                key={`${burstKey}-${i}`}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1,
                  rotate: 0,
                }}
                animate={{
                  x,
                  y,
                  scale: 1.6,
                  opacity: 0,
                  rotate: 180,
                }}
                transition={{ duration, ease: "easeOut" }}
                exit={{ opacity: 0 }}
                className="absolute dollar-burst text-2xl md:text-3xl"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                💸
              </motion.span>
            );
          })}
      </AnimatePresence>

      <style jsx>{`
        .dollar-burst {
          font-weight: 700;
          background: radial-gradient(circle at center, #00ffcc, #00ffaa, #00ee88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: blur(0.8px) brightness(1.2);
          opacity: 1;
          animation: hueRotate 5s infinite linear;
          pointer-events: none;
        }

        @keyframes hueRotate {
          0% {
            filter: hue-rotate(0deg);
          }
          50% {
            filter: hue-rotate(180deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}