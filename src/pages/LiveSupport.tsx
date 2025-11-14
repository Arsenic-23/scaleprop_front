import React from "react";
import Header from "../components/Header";

const LiveSupport: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col font-display bg-ios-bg text-ios-label">

      {/* Required */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />

      {/* Inline styles */}
      <style>{`
        body {
          background-color: #000000;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          min-height: max(884px, 100dvh);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <Header title="Live Chat" />

      <main className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-6">

          {/* Welcome Card */}
          <div className="rounded-xl bg-ios-bg-secondary p-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ios-bg-tertiary">
              <span className="material-symbols-outlined text-3xl text-ios-blue">
                support_agent
              </span>
            </div>
            <h2 className="mt-3 text-lg font-semibold text-ios-label">
              Welcome to Scalefund Support
            </h2>
            <p className="mt-1 text-sm text-ios-label-secondary">
              We're here to help. How can we assist you today?
            </p>
          </div>

          {/* Chat Messages */}
          <div className="flex flex-col gap-4">

            <p className="text-center text-xs text-ios-label-secondary">
              Today, 10:30 AM
            </p>

            {/* Agent Message */}
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-ios-bg-tertiary">
                <span className="material-symbols-outlined text-lg text-ios-blue">
                  support_agent
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="max-w-[80%] rounded-2xl rounded-bl-lg bg-ios-bg-tertiary px-3.5 py-2.5">
                  <p className="text-base text-ios-label">
                    Hello! My name is Alex. How can I assist you with your Scalefund account today?
                  </p>
                </div>
              </div>
            </div>

            {/* User Messages */}
            <div className="flex justify-end">
              <div className="flex max-w-[80%] flex-col gap-1.5">
                <div className="rounded-2xl rounded-br-lg bg-ios-blue px-3.5 py-2.5">
                  <p className="text-base text-white">
                    Hi Alex, I'm having trouble understanding the 'Trailing Stop' order type.
                  </p>
                </div>

                <div className="rounded-2xl rounded-br-lg bg-ios-blue px-3.5 py-2.5">
                  <p className="text-base text-white">
                    Can you explain how it works?
                  </p>
                </div>
              </div>
            </div>

            {/* Agent typing indicator */}
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-ios-bg-tertiary">
                <span className="material-symbols-outlined text-lg text-ios-blue">
                  support_agent
                </span>
              </div>

              <div className="mt-2.5 flex items-center gap-1.5 rounded-2xl rounded-bl-lg bg-ios-bg-tertiary px-3.5 py-2.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ios-label-secondary [animation-delay:-0.3s]"></span>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ios-label-secondary [animation-delay:-0.15s]"></span>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ios-label-secondary"></span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Input Bar */}
      <footer className="sticky bottom-0 z-10 mt-auto border-t border-ios-separator bg-ios-bg/80 p-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">

          {/* Add Button */}
          <button className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-ios-bg-tertiary active:bg-gray-700">
            <span className="material-symbols-outlined !text-2xl text-ios-blue">
              add
            </span>
          </button>

          {/* Input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full rounded-full border-none bg-ios-bg-tertiary py-2 pl-3.5 pr-9 text-base text-ios-label placeholder-ios-label-secondary focus:outline-none focus:ring-2 focus:ring-ios-blue focus:ring-opacity-50"
            />

            <button className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-ios-label-secondary">
              <span className="material-symbols-outlined">sentiment_satisfied</span>
            </button>
          </div>

          {/* Send */}
          <button className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-ios-blue text-white active:bg-blue-600">
            <span className="material-symbols-outlined !text-2xl -mr-0.5">
              arrow_upward
            </span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default LiveSupport;
