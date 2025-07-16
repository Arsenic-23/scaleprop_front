import { useState, useEffect } from "react";

const steps = [
  "Sign up and set your strategy.",
  "Prove your edge in the evaluation phase.",
  "Unlock funding up to $100,000.",
  "Withdraw profits. Scale without limits.",
];

export const TypewriterTimeline = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = steps[stepIndex];

    let timeout;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayedText(current.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 60);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(current.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 40);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting((prev) => !prev);
        if (!isDeleting) {
          timeout = setTimeout(() => setIsDeleting(true), 2000); // Pause after complete typing
        } else {
          setStepIndex((prev) => (prev + 1) % steps.length);
        }
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, stepIndex]);

  return (
    <div className="py-8 px-6 text-center">
      <p className="text-white text-xl md:text-2xl font-medium tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
        {displayedText}
        <span className="border-r-2 border-white animate-pulse ml-1">&nbsp;</span>
      </p>
    </div>
  );
};