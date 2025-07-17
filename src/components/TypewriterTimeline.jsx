import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
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
          timeout = setTimeout(() => setIsDeleting(true), 2000); // Hold full text
        } else {
          setStepIndex((prev) => (prev + 1) % steps.length);
        }
      }, 800);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, stepIndex]);

  return (
    <div className="py-12 px-6 text-center w-full">
      <AnimatePresence mode="wait">
        <motion.p
          key={stepIndex}
          className="text-xl md:text-2xl font-semibold text-white tracking-tight mx-auto"
          style={{
            fontFamily: "'Inter', sans-serif",
            maxWidth: "90%",
            lineHeight: "1.6",
            background: "linear-gradient(90deg, #ffffff, #bbbbff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {displayedText}
          <span className="ml-1 animate-blink text-white">|</span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
};