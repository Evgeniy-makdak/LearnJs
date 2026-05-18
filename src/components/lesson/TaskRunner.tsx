import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Task, QuizTask, CodingTask } from '../../types';
import { useCodeRunner } from '../../hooks/useCodeRunner';
import { useStore } from '../../store/useStore';

interface TaskRunnerProps {
  task: Task;
  taskId: string;
  topicId: string;
  onComplete: () => void;
}

const TaskRunner: React.FC<TaskRunnerProps> = ({ task, taskId, topicId, onComplete }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [userCode, setUserCode] = useState<string>(
    task.type === 'coding' ? task.initialCode : ''
  );
  const [executionResult, setExecutionResult] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const completeTask = useStore((state) => state.completeTask);
  const { runCode, getFeedback } = useCodeRunner();

  // Сброс состояния при смене задания
  useEffect(() => {
    setSelectedAnswers([]);
    setShowExplanation(false);
    setIsCorrect(null);
    setExecutionResult(null);
    setIsRunning(false);
    if (task.type === 'coding') {
      setUserCode(task.initialCode);
    }
  }, [taskId, task.type, task.type === 'coding' ? (task as CodingTask).initialCode : '']);

  // Обработка выбора ответа в квизе
  const handleAnswerSelect = useCallback((index: number, isMultiple: boolean) => {
    if (isMultiple) {
      setSelectedAnswers((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setSelectedAnswers([index]);
    }
    setShowExplanation(false);
    setIsCorrect(null);
  }, []);

  // Проверка ответа в квизе
  const checkQuizAnswer = useCallback(() => {
    const quizTask = task as QuizTask;
    const correct = quizTask.correct.every((c) => selectedAnswers.includes(c)) &&
                    selectedAnswers.every((s) => quizTask.correct.includes(s));

    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      completeTask(topicId, taskId);
      setTimeout(onComplete, 1500);
    }
  }, [task, selectedAnswers, topicId, taskId, completeTask, onComplete]);

  // Запуск кода
  const runUserCode = useCallback(async () => {
    if (task.type !== 'coding') return;

    setIsRunning(true);
    setExecutionResult(null);

    // Небольшая задержка для UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = runCode(userCode, task);
    const feedback = getFeedback(result, task);
    setExecutionResult(feedback);
    setIsRunning(false);

    if (result.success) {
      setIsCorrect(true);
      completeTask(topicId, taskId, userCode);
      setTimeout(onComplete, 2000);
    } else {
      setIsCorrect(false);
    }
  }, [task, userCode, runCode, getFeedback, topicId, taskId, completeTask, onComplete]);

  if (task.type === 'quiz') {
    const quizTask = task as QuizTask;
    const isMultiple = quizTask.correct.length > 1;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          📝 Викторина
        </h3>

        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
          {quizTask.question}
        </p>

        <div className="space-y-3 mb-6">
          {quizTask.options.map((option, index) => {
            const isSelected = selectedAnswers.includes(index);
            const isCorrectAnswer = quizTask.correct.includes(index);
            let buttonClass = 'border-dark-border hover:border-primary/50';

            if (showExplanation) {
              if (isCorrectAnswer) {
                buttonClass = 'border-green-500 bg-green-500/10';
              } else if (isSelected && !isCorrectAnswer) {
                buttonClass = 'border-red-500 bg-red-500/10';
              }
            } else if (isSelected) {
              buttonClass = 'border-primary bg-primary/10';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index, isMultiple)}
                disabled={showExplanation}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${buttonClass} ${
                  showExplanation ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center border-2 ${
                      isSelected
                        ? 'bg-primary border-primary'
                        : 'border-gray-400'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {!showExplanation ? (
          <button
            onClick={checkQuizAnswer}
            disabled={selectedAnswers.length === 0}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Проверить ответ
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`p-4 rounded-lg ${
              isCorrect
                ? 'bg-green-500/10 border border-green-500'
                : 'bg-red-500/10 border border-red-500'
            }`}
          >
            <p className={`font-semibold mb-2 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {isCorrect ? '🎉 Правильно!' : '❌ Неправильно'}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {quizTask.explanation}
            </p>
          </motion.div>
        )}
      </motion.div>
    );
  }

  // Coding task
  const codingTask = task as CodingTask;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        💻 Напишите код
      </h3>

      <div className="mb-4 p-4 bg-gray-100 dark:bg-dark-border rounded-lg">
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {codingTask.description}
        </p>
      </div>

      {/* Редактор кода */}
      <div className="mb-4 rounded-lg overflow-hidden border border-dark-border">
        <Editor
          height="300px"
          defaultLanguage="javascript"
          value={userCode}
          onChange={(value) => setUserCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on'
          }}
        />
      </div>

      {/* Кнопка запуска */}
      <button
        onClick={runUserCode}
        disabled={isRunning}
        className="btn-primary w-full mb-4 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isRunning ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Запуск...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Проверить код
          </>
        )}
      </button>

      {/* Результат выполнения */}
      <AnimatePresence>
        {executionResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-lg ${
              isCorrect
                ? 'bg-green-500/10 border border-green-500'
                : 'bg-red-500/10 border border-red-500'
            }`}
          >
            <pre className={`text-sm whitespace-pre-wrap font-mono ${
              isCorrect ? 'text-green-500' : 'text-red-500'
            }`}>
              {executionResult}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskRunner;
