/** Типы контента для теории */
export type ContentType = 'text' | 'code' | 'warning' | 'image';

/** Блок контента теории */
export interface ContentBlock {
  type: ContentType;
  content: string;
}

/** Типы заданий */
export type TaskType = 'quiz' | 'coding';

/** Задание-викторина */
export interface QuizTask {
  type: 'quiz';
  question: string;
  options: string[];
  correct: number[]; // индексы правильных ответов (поддержка множественного выбора)
  explanation: string;
}

/** Задание на написание кода */
export interface CodingTask {
  type: 'coding';
  description: string;
  initialCode: string;
  functionName?: string; // имя функции, которую ожидает тест (по умолчанию 'solution')
  testCases: Array<{
    input: any[];
    expected: any;
  }>;
  precondition?: string; // код, выполняемый перед тестом
}

/** Объединенный тип задания */
export type Task = QuizTask | CodingTask;

/** Тема курса */
export interface Topic {
  id: string;
  order: number;
  title: string;
  theory: ContentBlock[];
  tasks: Task[];
}

/** Модуль курса */
export interface Module {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

/** Прогресс пользователя по заданию */
export interface TaskProgress {
  taskId: string;
  completed: boolean;
  attempts: number;
  lastAttempt?: Date;
  userCode?: string; // для coding tasks
}

/** Прогресс пользователя по теме */
export interface TopicProgress {
  topicId: string;
  completed: boolean;
  score: number; // процент правильных ответов
  taskProgress: TaskProgress[];
  completedAt?: Date;
}

/** Состояние пользователя в хранилище */
export interface UserState {
  id: string;
  name: string;
  currentTopicId: string | null;
  topicProgress: Record<string, TopicProgress>;
  totalScore: number;
  createdAt: Date;
  updatedAt: Date;
}

/** Тема в упрощенном виде для UI */
export interface TopicSummary {
  id: string;
  title: string;
  order: number;
  isLocked: boolean;
  isCompleted: boolean;
  score: number;
  moduleId: string;
}

/** Результат выполнения кода */
export interface CodeExecutionResult {
  success: boolean;
  output?: any;
  error?: string;
  testResults?: Array<{
    input: any[];
    expected: any;
    actual: any;
    passed: boolean;
  }>;
}

/** Настройки темы приложения */
export interface ThemeSettings {
  darkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
}
