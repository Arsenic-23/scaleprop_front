import { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";

const messages = [
  "Sign up and set your strategy.",
  "Prove your edge in the evaluation phase.",
  "Unlock funding up to $100,000.",
  "Withdraw profits. Scale without limits.",
];

export const TypewriterTimeline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 5000); // Delay before switching text
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-8 px-4 text-center">
      <h2 className="text-white text-xl md:text-2xl font-medium tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
        <Typewriter
          words={[messages[currentIndex]]}
          loop={false}
          cursor
          cursorStyle="|"
          typeSpeed={50}
          deleteSpeed={40}
          delaySpeed={2000}
        />
      </h2>
    </div>
  );
};