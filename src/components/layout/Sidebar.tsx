import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { courseModules } from '../../data/courseData';
import { useStore } from '../../store/useStore';
import { TopicSummary } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedModules, setExpandedModules] = useState<string[]>(['module-1']);
  
  const isTopicLocked = useStore((state) => state.isTopicLocked);
  const isTopicCompleted = useStore((state) => state.isTopicCompleted);
  const getTopicScore = useStore((state) => state.getTopicScore);
  const getTotalProgress = useStore((state) => state.getTotalProgress);
  const getCompletedTopicsCount = useStore((state) => state.getCompletedTopicsCount);
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getTopicSummary = (topicId: string, moduleId: string): TopicSummary => {
    const allTopics = courseModules.flatMap((m) => m.topics);
    const topic = allTopics.find((t) => t.id === topicId);

    return {
      id: topicId,
      title: topic?.title || '',
      order: topic?.order || 0,
      isLocked: isTopicLocked(topicId),
      isCompleted: isTopicCompleted(topicId),
      score: getTopicScore(topicId),
      moduleId
    };
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  // Filter modules for non-authenticated users
  const visibleModules = isAuthenticated 
    ? courseModules 
    : courseModules.filter(m => m.id === 'module-1');

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50
          w-72 bg-white dark:bg-dark-card border-r border-dark-border 
          flex flex-col h-screen overflow-hidden
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Логотип */}
        <div className="p-6 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-js rounded-lg flex items-center justify-center js-glow">
              <span className="text-dark-bg font-bold text-lg">JS</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">JS Simulator</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {getCompletedTopicsCount()} из {courseModules.flatMap(m => m.topics).length} тем
              </p>
            </div>
          </div>

          {/* Общий прогресс */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500 dark:text-gray-400">Прогресс курса</span>
              <span className="text-primary font-semibold">{getTotalProgress()}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${getTotalProgress()}%` }} />
            </div>
          </div>

          {/* Auth status */}
          {!isAuthenticated && (
            <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-xs text-yellow-600 dark:text-yellow-400">
                Демо-режим: доступен только 1-й модуль
              </p>
            </div>
          )}
        </div>

        {/* Список модулей */}
        <nav className="flex-1 overflow-y-auto p-4">
          {visibleModules.map((module, moduleIndex) => (
            <div key={module.id} className="mb-2">
              {/* Заголовок модуля */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-dark-bg dark:bg-gray-700 flex items-center justify-center text-xs font-semibold text-gray-400">
                    {moduleIndex + 1}
                  </span>
                  <span className="font-semibold text-gray-700 dark:text-gray-200 text-left">
                    {module.title}
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${
                    expandedModules.includes(module.id) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Темы модуля */}
              <AnimatePresence>
                {expandedModules.includes(module.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-6 mt-2 space-y-1">
                      {module.topics.map((topic) => {
                        const summary = getTopicSummary(topic.id, module.id);
                        const isActive = location.pathname.includes(`/lesson/${topic.id}`);

                        return (
                          <Link
                            key={topic.id}
                            to={`/lesson/${topic.id}`}
                            onClick={handleLinkClick}
                            className={`nav-item text-sm ${
                              summary.isLocked
                                ? 'locked-item cursor-not-allowed'
                                : isActive
                                ? 'nav-item-active'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-border'
                            }`}
                          >
                            {summary.isCompleted ? (
                              <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : summary.isLocked ? (
                              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex-shrink-0" />
                            )}

                            <span className="truncate">{topic.title}</span>

                            {!summary.isLocked && summary.score > 0 && !summary.isCompleted && (
                              <span className="text-xs text-gray-400 ml-auto">{summary.score}%</span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Show login prompt for non-authenticated */}
          {!isAuthenticated && (
            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">
                Войдите, чтобы получить доступ ко всем модулям
              </p>
              <Link
                to="/auth"
                onClick={handleLinkClick}
                className="block w-full text-center py-2 px-4 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition-colors"
              >
                Войти / Зарегистрироваться
              </Link>
            </div>
          )}
        </nav>

        {/* Футер сайдбара */}
        <div className="p-4 border-t border-dark-border">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            v1.0.0 • PWA Ready
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
