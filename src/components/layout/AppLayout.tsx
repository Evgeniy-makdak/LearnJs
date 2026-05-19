import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import FirstModuleModal from '../auth/FirstModuleModal';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../hooks/useTheme';
import { courseModules } from '../../data/courseData';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const initialize = useStore((state) => state.initialize);
  const isLoading = useStore((state) => state.isLoading);
  const { darkMode, toggleTheme } = useTheme();
  
  const authUser = useStore((state) => state.authUser);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const logout = useStore((state) => state.logout);
  const showFirstModuleComplete = useStore((state) => state.showFirstModuleComplete);
  const setShowFirstModuleComplete = useStore((state) => state.setShowFirstModuleComplete);
  const userState = useStore((state) => state.userState);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Check if first module is completed
  useEffect(() => {
    if (!isAuthenticated) {
      const module1 = courseModules.find(m => m.id === 'module-1');
      if (module1) {
        const allCompleted = module1.topics.every(
          t => userState.topicProgress[t.id]?.completed
        );
        if (allCompleted && !showFirstModuleComplete) {
          setShowFirstModuleComplete(true);
        }
      }
    }
  }, [userState.topicProgress, isAuthenticated, showFirstModuleComplete, setShowFirstModuleComplete]);

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
              {/* User info / Auth button */}
              {isAuthenticated && authUser ? (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:block text-sm text-gray-600 dark:text-gray-300">
                    {authUser.name}
                  </span>
                  <button
                    onClick={() => logout()}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-dark-border hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    title="Выйти"
                  >
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate('/auth')}
                  className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
                >
                  Войти
                </button>
              )}

              {/* Theme toggle */}
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

              {/* Progress (desktop) */}
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

      {/* First Module Complete Modal */}
      <AnimatePresence>
        {showFirstModuleComplete && (
          <FirstModuleModal
            onAuthClick={() => {
              setShowFirstModuleComplete(false);
              navigate('/auth');
            }}
            onClose={() => setShowFirstModuleComplete(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppLayout;
