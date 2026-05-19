import React from 'react';
import { motion } from 'framer-motion';

interface FirstModuleModalProps {
  onAuthClick: () => void;
  onClose: () => void;
}

const FirstModuleModal: React.FC<FirstModuleModalProps> = ({ onAuthClick, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="card max-w-md w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Trophy icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Поздравляем!
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Вы прошли первый раздел курса <strong>"Фундамент"</strong>!
        </p>
        
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Для продолжения обучения и сохранения прогресса необходимо авторизоваться в личном кабинете.
        </p>

        <div className="space-y-3">
          <button
            onClick={onAuthClick}
            className="w-full btn-primary py-3 text-lg"
          >
            Войти / Зарегистрироваться
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Пока пропустить
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FirstModuleModal;
