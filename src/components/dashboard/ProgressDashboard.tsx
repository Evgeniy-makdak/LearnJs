import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { courseModules } from '../../data/courseData';
import { useStore } from '../../store/useStore';

const ProgressDashboard: React.FC = () => {
  const totalProgress = useStore((state) => state.getTotalProgress());
  const completedTopicsCount = useStore((state) => state.getCompletedTopicsCount());
  const isTopicCompleted = useStore((state) => state.isTopicCompleted);
  const isTopicLocked = useStore((state) => state.isTopicLocked);
  const getTopicScore = useStore((state) => state.getTopicScore);

  const totalTopics = courseModules.flatMap((m) => m.topics).length;
  const completedCount = completedTopicsCount;

  const allTopics = courseModules.flatMap((m) => m.topics);
  const nextTopic = allTopics.find((t) => !isTopicCompleted(t.id) && !isTopicLocked(t.id));

  const moduleStats = courseModules.map((module) => {
    const moduleTopics = module.topics;
    const completedInModule = moduleTopics.filter((t) => isTopicCompleted(t.id)).length;
    const avgScore = moduleTopics.reduce((acc, t) => acc + getTopicScore(t.id), 0) / moduleTopics.length;

    return {
      module,
      completedInModule,
      totalInModule: moduleTopics.length,
      avgScore: Math.round(avgScore)
    };
  });

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Панель прогресса
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Отслеживайте свой прогресс в изучении JavaScript
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Общий прогресс</p>
              <p className="text-2xl font-bold text-primary">{totalProgress}%</p>
            </div>
          </div>
          <div className="mt-4 progress-bar">
            <div className="progress-fill" style={{ width: `${totalProgress}%` }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-js to-js-light rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-dark-bg" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Пройдено тем</p>
              <p className="text-2xl font-bold text-js">{completedCount} из {totalTopics}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Следующий урок</p>
              {nextTopic ? (
                <Link
                  to={`/lesson/${nextTopic.id}`}
                  className="text-lg font-semibold text-blue-500 hover:text-blue-400"
                >
                  {nextTopic.title}
                </Link>
              ) : (
                <p className="text-lg font-semibold text-gray-500">
                  {completedCount === totalTopics ? 'Курс пройден!' : 'Начать курс'}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="space-y-6">
        {moduleStats.map((stat, index) => (
          <motion.div
            key={stat.module.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-dark-bg dark:bg-gray-700 flex items-center justify-center text-sm font-semibold text-gray-400">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {stat.module.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.module.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Прогресс модуля
                </p>
                <p className="text-xl font-bold text-primary">
                  {Math.round((stat.completedInModule / stat.totalInModule) * 100)}%
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {stat.module.topics.map((topic) => {
                const isCompleted = isTopicCompleted(topic.id);
                const isLocked = isTopicLocked(topic.id);
                const score = getTopicScore(topic.id);

                if (isLocked) {
                  return (
                    <div
                      key={topic.id}
                      className="p-3 rounded-lg border border-dark-border bg-gray-100/50 dark:bg-gray-800/50 opacity-60 cursor-not-allowed select-none"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-500 dark:text-gray-500 truncate">
                            {topic.title}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 progress-bar h-1.5 bg-gray-300 dark:bg-gray-700">
                              <div className="progress-fill h-full bg-gray-400 dark:bg-gray-600" style={{ width: '0%' }} />
                            </div>
                            <span className="text-xs text-gray-400 dark:text-gray-600">
                              0%
                            </span>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 dark:text-gray-600 flex-shrink-0 ml-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={topic.id}
                    to={`/lesson/${topic.id}`}
                    className={`p-3 rounded-lg border transition-all ${
                      isCompleted
                        ? 'completed-item border-green-500/50 bg-green-500/10'
                        : 'border-dark-border hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-dark-border'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                          {topic.title}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 progress-bar h-1.5">
                            <div
                              className={`progress-fill h-full ${
                                isCompleted ? 'bg-green-500' : 'bg-primary'
                              }`}
                              style={{ width: `${score}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {score}%
                          </span>
                        </div>
                      </div>
                      {isCompleted && (
                        <svg
                          className="w-5 h-5 text-green-500 flex-shrink-0 ml-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProgressDashboard;
