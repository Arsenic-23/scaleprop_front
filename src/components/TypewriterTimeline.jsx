import { useEffect, useState } from "react";

const steps = [
  "Step 1: Sign up and set your strategy.",
  "Step 2: Complete our risk-free challenge.",
  "Step 3: Get funded with up to $100,000.",
  "Step 4: Withdraw profits, scale higher.",
];

export const TypewriterTimeline = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-6 px-4 text-center">
      <p className="text-base md:text-lg text-white font-mono transition-all duration-500 ease-in-out">
        <span className="border-r-2 border-white pr-2 animate-pulse">
          {steps[currentStep]}
        </span>
      </p>
    </div>
  );
};