import React from "react";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 bg-zinc-900 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-semibold text-center mb-8">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
