import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DollarBurst from "./DollarBurst"; // 💸 Updated animation

const steps = [
  "Sign up and set your strategy.",
  "Prove your edge in the evaluation phase.",
  "Unlock funding up to $100,000.",
  "Withdraw profits. Scale without limits.",
];

export const TypewriterTimeline = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [burst, setBurst] = useState(false);
  const [initialDelayDone, setInitialDelayDone] = useState(false);

  useEffect(() => {
    const initialDelay = setTimeout(() => setInitialDelayDone(true), 1000);
    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (!initialDelayDone) return;

    const currentText = steps[stepIndex];
    let timeout;

    if (!isDeleting && charIndex <= currentText.length) {
      setDisplayedText(currentText.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex(charIndex + 1), 60);
    } else if (isDeleting && charIndex >= 0) {
      setDisplayedText(currentText.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex(charIndex - 1), 30);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(!isDeleting);

        if (!isDeleting) {
          timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else {
          setStepIndex((prev) => {
            const next = (prev + 1) % steps.length;
            setBurst(true);
            setTimeout(() => setBurst(false), 150);
            return next;
          });
        }
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, stepIndex, initialDelayDone]);

  return (
    <div className="relative py-24 px-6 text-center w-full overflow-visible flex justify-center items-center">
      {/* 💸 Animated Burst */}
      <DollarBurst trigger={burst} count={18} />

      {/* 📝 Typewriter Text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={stepIndex}
          className="text-xl md:text-2xl font-semibold text-white tracking-tight mx-auto relative z-10"
          style={{
            fontFamily: "'Inter', sans-serif",
            maxWidth: "90%",
            lineHeight: "1.6",
            background: "linear-gradient(90deg, #ffffff, #bbffcc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {displayedText}
          <span className="ml-1 animate-blink text-white">|</span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
};