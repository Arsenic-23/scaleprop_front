import React from "react";

const Support: React.FC = () => {
  return (
    <>
      {/* Inject required fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />

      {/* Inject original HTML styles */}
      <style>{`
        body {
          background-color: #000000;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          min-height: max(884px, 100dvh);
        }
        .ios-search-input::placeholder {
          color: #8E8E93;
        }
        .ios-search-input:focus {
          outline: none;
        }
      `}</style>

      <div className="relative flex min-h-screen w-full flex-col font-display bg-ios-bg text-ios-label">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-14 items-center justify-center bg-ios-bg/80 px-4 backdrop-blur-xl">
          <h1 className="text-lg font-semibold text-ios-label">Support</h1>
        </header>

        <main className="flex-1 flex flex-col gap-6 p-4">
          {/* Search */}
          <section>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-ios-label-secondary">
                search
              </span>
              <input
                type="search"
                placeholder="Search Help Center"
                className="ios-search-input block w-full rounded-lg border-none bg-ios-bg-secondary py-2.5 pl-10 pr-4 text-base text-ios-label placeholder-ios-label-secondary focus:ring-2 focus:ring-ios-blue focus:ring-opacity-50"
              />
            </div>
          </section>

          {/* Support List */}
          <section className="overflow-hidden rounded-xl bg-ios-bg-secondary">
            <ul className="flex flex-col">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-4 border-b border-ios-separator px-4 py-3 active:bg-gray-800/50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ios-blue">
                    <span className="material-symbols-outlined !text-xl text-white">
                      quiz
                    </span>
                  </div>
                  <p className="flex-1 text-base text-ios-label">FAQs</p>
                  <span className="material-symbols-outlined text-ios-label-secondary">
                    chevron_right
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center gap-4 border-b border-ios-separator px-4 py-3 active:bg-gray-800/50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ios-green">
                    <span className="material-symbols-outlined !text-xl text-white">
                      menu_book
                    </span>
                  </div>
                  <p className="flex-1 text-base text-ios-label">
                    Knowledge Base
                  </p>
                  <span className="material-symbols-outlined text-ios-label-secondary">
                    chevron_right
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center gap-4 border-b border-ios-separator px-4 py-3 active:bg-gray-800/50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
                    <span className="material-symbols-outlined !text-xl text-white">
                      forum
                    </span>
                  </div>
                  <p className="flex-1 text-base text-ios-label">
                    Community Forum
                  </p>
                  <span className="material-symbols-outlined text-ios-label-secondary">
                    chevron_right
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center gap-4 px-4 py-3 active:bg-gray-800/50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ios-red">
                    <span className="material-symbols-outlined !text-xl text-white">
                      support_agent
                    </span>
                  </div>
                  <p className="flex-1 text-base text-ios-label">
                    Contact Support
                  </p>
                  <span className="material-symbols-outlined text-ios-label-secondary">
                    chevron_right
                  </span>
                </a>
              </li>
            </ul>
          </section>

          {/* Live Chat */}
          <section className="flex flex-col gap-3 rounded-xl bg-ios-bg-secondary p-4">
            <h2 className="text-lg font-semibold text-ios-label">
              Still Need Help?
            </h2>
            <p className="text-sm text-ios-label-secondary">
              Our support team is available 24/7 to assist you with any
              questions or issues. You can reach us via live chat for the
              fastest response.
            </p>

            <div className="pt-2">
              <button className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-ios-blue text-base font-semibold text-white">
                <span className="material-symbols-outlined">chat_bubble</span>
                Start Live Chat
              </button>
            </div>
          </section>

          {/* Version Info */}
          <section>
            <p className="text-center text-xs text-ios-label-secondary">
              App Version 2.1.0 (Build 345)
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default Support;
