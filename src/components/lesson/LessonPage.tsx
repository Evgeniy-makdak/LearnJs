import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { courseModules } from '../../data/courseData';
import { useStore } from '../../store/useStore';
import TheoryViewer from './TheoryViewer';
import TaskRunner from './TaskRunner';

const LessonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'theory' | 'tasks'>('theory');
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [, setCompletedTasks] = useState<Set<string>>(new Set());

  const isTopicLocked = useStore((state) => state.isTopicLocked);
  const isTopicCompleted = useStore((state) => state.isTopicCompleted);
  const getTopicScore = useStore((state) => state.getTopicScore);
  const setCurrentTopic = useStore((state) => state.setCurrentTopic);

  // Находим текущую тему
  const allTopics = courseModules.flatMap((m) => m.topics);
  const topic = allTopics.find((t) => t.id === id);
  const topicIndex = allTopics.findIndex((t) => t.id === id);
  
  const prevTopic = topicIndex > 0 ? allTopics[topicIndex - 1] : null;
  const nextTopic = topicIndex < allTopics.length - 1 ? allTopics[topicIndex + 1] : null;

  useEffect(() => {
    if (topic) {
      setCurrentTopic(topic.id);
    }
  }, [topic, setCurrentTopic]);

  // Проверяем, заблокирована ли тема
  useEffect(() => {
    if (id && isTopicLocked(id)) {
      navigate('/');
    }
  }, [id, isTopicLocked, navigate]);

  if (!topic) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Тема не найдена
        </h2>
        <button onClick={() => navigate('/')} className="btn-primary">
          На главную
        </button>
      </div>
    );
  }

  const completed = isTopicCompleted(topic.id);
  const score = getTopicScore(topic.id);

  const handleTaskComplete = () => {
    setCompletedTasks((prev) => new Set([...prev, topic.tasks[currentTaskIndex].type === 'quiz' ? `quiz-${currentTaskIndex}` : `coding-${currentTaskIndex}`]));
  };

  const handleNextTask = () => {
    if (currentTaskIndex < topic.tasks.length - 1) {
      setCurrentTaskIndex((prev) => prev + 1);
    }
  };

  const handlePrevTask = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Заголовок темы */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Урок {topic.order} из {allTopics.length}
          </span>
          {completed && (
            <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-xs rounded-full font-semibold">
              ✓ Пройден
            </span>
          )}
          {score > 0 && !completed && (
            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full font-semibold">
              {score}%
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {topic.title}
        </h1>
      </motion.div>

      {/* Переключатель вкладок */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('theory')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'theory'
              ? 'bg-primary text-white'
              : 'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-border'
          }`}
        >
          📚 Теория
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'tasks'
              ? 'bg-primary text-white'
              : 'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-border'
          }`}
        >
          📝 Задания
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
            {topic.tasks.length}
          </span>
        </button>
      </div>

      {/* Содержимое вкладки */}
      <AnimatePresence mode="wait">
        {activeTab === 'theory' ? (
          <motion.div
            key="theory"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="card">
              <TheoryViewer theory={topic.theory} />
            </div>

            {/* Кнопка перехода к заданиям */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveTab('tasks')}
                className="btn-primary flex items-center gap-2"
              >
                Перейти к заданиям
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="tasks"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Индикатор текущего задания */}
            <div className="flex items-center gap-2 mb-4">
              {topic.tasks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTaskIndex(index)}
                  className={`flex-1 h-2 rounded-full transition-all ${
                    index === currentTaskIndex
                      ? 'bg-primary'
                      : index < currentTaskIndex
                      ? 'bg-primary/50'
                      : 'bg-gray-200 dark:bg-dark-border'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevTask}
                disabled={currentTaskIndex === 0}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
              >
                ← Предыдущее
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Задание {currentTaskIndex + 1} из {topic.tasks.length}
              </span>
              <button
                onClick={handleNextTask}
                disabled={currentTaskIndex === topic.tasks.length - 1}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
              >
                Следующее →
              </button>
            </div>

            <TaskRunner
              task={topic.tasks[currentTaskIndex]}
              taskId={`${topic.id}-task-${currentTaskIndex}`}
              topicId={topic.id}
              onComplete={handleTaskComplete}
            />

            {/* Навигация между темами */}
            <div className="flex items-center justify-between pt-6 border-t border-dark-border">
              {prevTopic ? (
                <button
                  onClick={() => navigate(`/lesson/${prevTopic.id}`)}
                  className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {prevTopic.title}
                </button>
              ) : (
                <div />
              )}

              {nextTopic && !isTopicLocked(nextTopic.id) && (
                <button
                  onClick={() => navigate(`/lesson/${nextTopic.id}`)}
                  className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  {nextTopic.title}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LessonPage;
