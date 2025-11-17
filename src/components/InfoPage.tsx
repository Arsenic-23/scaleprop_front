import React from "react";

interface InfoPageProps {
  headerTitle: string;
  backLabel?: string;
  children: React.ReactNode;
}

const InfoPage: React.FC<InfoPageProps> = ({ headerTitle, backLabel = "Support", children }) => {
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

      <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-ios-bg/80 px-4 backdrop-blur-xl">
        <a className="flex items-center text-ios-blue" href="#">
          <span className="material-symbols-outlined !text-2xl">chevron_left</span>
          <span className="text-base">{backLabel}</span>
        </a>
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-ios-label">
          {headerTitle}
        </h1>
      </header>

      <main className="flex-1 space-y-6 overflow-y-auto px-4 pb-8 pt-4">
        {children}
      </main>
    </div>
  );
};

export default InfoPage;
