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
            const radius = Math.random() * 100 + 80;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            const duration = Math.random() * 0.4 + 1.1;
            const delay = Math.random() * 0.05;

            return (
              <motion.span
                key={`${burstKey}-${i}`}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0.3,
                  opacity: 1,
                  rotate: 0,
                }}
                animate={{
                  x,
                  y,
                  scale: 1.4,
                  opacity: 0,
                  rotate: 360,
                }}
                transition={{
                  duration,
                  delay,
                  ease: [0.23, 1, 0.32, 1], // spring-like
                }}
                exit={{ opacity: 0 }}
                className="absolute dollar-burst text-2xl md:text-3xl"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                ✨
              </motion.span>
            );
          })}
      </AnimatePresence>

      <style jsx>{`
        .dollar-burst {
          font-weight: 700;
          background: linear-gradient(135deg, #00f6ff, #3effb7, #00ff95);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 1px 2px rgba(0, 255, 170, 0.3))
                  blur(0.4px)
                  brightness(1.2);
          opacity: 1;
          animation: hueRotate 6s infinite linear;
          pointer-events: none;
        }

        @keyframes hueRotate {
          0% {
            filter: hue-rotate(0deg) drop-shadow(0 1px 2px rgba(0, 255, 170, 0.3));
          }
          50% {
            filter: hue-rotate(180deg) drop-shadow(0 1px 4px rgba(0, 255, 170, 0.5));
          }
          100% {
            filter: hue-rotate(360deg) drop-shadow(0 1px 2px rgba(0, 255, 170, 0.3));
          }
        }
      `}</style>
    </div>
  );
}