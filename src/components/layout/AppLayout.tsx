import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../hooks/useTheme';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const initialize = useStore((state) => state.initialize);
  const isLoading = useStore((state) => state.isLoading);
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 flex flex-col min-h-screen w-full lg:w-auto">
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border-b border-dark-border px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-dark-border hover:bg-gray-200 dark:hover:bg-dark-bg transition-colors"
                aria-label="Открыть меню"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div>
                <h1 className="text-lg lg:text-xl font-bold text-gradient">
                  JavaScript Simulator
                </h1>
                <p className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
                  Путь от новичка до профи
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-border hover:bg-gray-200 dark:hover:bg-dark-bg transition-colors"
                aria-label="Переключить тему"
              >
                {darkMode ? (
                  <svg className="w-5 h-5 text-js" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Общий прогресс:
                </span>
                <div className="w-32 progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${useStore.getState().getTotalProgress()}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
