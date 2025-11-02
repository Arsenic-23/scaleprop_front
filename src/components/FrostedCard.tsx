import React, { ReactNode } from "react";

interface FrostedCardProps {
  children: ReactNode;
  className?: string;
}

const FrostedCard: React.FC<FrostedCardProps> = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl p-8 w-full max-w-md bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] ${className}`}
  >
    {children}
  </div>
);

export default FrostedCard;
