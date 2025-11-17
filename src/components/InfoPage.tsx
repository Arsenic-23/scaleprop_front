import React from "react";
import Header from "../components/Header";

interface InfoPageProps {
  headerTitle: string;
  backLabel?: string; 
  children: React.ReactNode;
}

const InfoPage: React.FC<InfoPageProps> = ({ headerTitle, children }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col font-display bg-ios-bg text-ios-label">

      {/* Load fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />

      <Header title={headerTitle} />

      <main className="flex-1 space-y-6 overflow-y-auto px-4 pb-8 pt-4">
        {children}
      </main>
    </div>
  );
};

export default InfoPage;
