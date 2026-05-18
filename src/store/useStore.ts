import { create } from 'zustand';
import { get, set, del } from 'idb-keyval';
import { TopicProgress, TaskProgress, UserState } from '../types';
import { courseModules } from '../data/courseData';

// Инициализация состояния по умолчанию
const getDefaultState = (): UserState => ({
  id: crypto.randomUUID(),
  name: 'Студент',
  currentTopicId: courseModules[0]?.topics[0]?.id || null,
  topicProgress: {},
  totalScore: 0,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Ключ для IndexedDB
const DB_KEY = 'js-simulator-user-state';

// Загрузка состояния из IndexedDB
const loadState = async (): Promise<UserState> => {
  try {
    const saved = await get<UserState>(DB_KEY);
    if (saved) {
      return { ...getDefaultState(), ...saved };
    }
  } catch (error) {
    console.error('Failed to load state:', error);
  }
  return getDefaultState();
};

// Сохранение состояния в IndexedDB
const saveState = async (state: UserState) => {
  try {
    await set(DB_KEY, { ...state, updatedAt: new Date() });
  } catch (error) {
    console.error('Failed to save state:', error);
  }
};

interface StoreState {
  userState: UserState;
  isLoading: boolean;
  darkMode: boolean;
  
  // Actions
  initialize: () => Promise<void>;
  setDarkMode: (darkMode: boolean) => void;
  updateTopicProgress: (topicId: string, progress: Partial<TopicProgress>) => void;
  completeTask: (topicId: string, taskId: string, userCode?: string) => void;
  setCurrentTopic: (topicId: string) => void;
  resetProgress: () => Promise<void>;
  
  // Selectors
  getTopicProgress: (topicId: string) => TopicProgress | undefined;
  isTopicLocked: (topicId: string) => boolean;
  isTopicCompleted: (topicId: string) => boolean;
  getTopicScore: (topicId: string) => number;
  getTotalProgress: () => number;
  getCompletedTopicsCount: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  userState: getDefaultState(),
  isLoading: true,
  darkMode: true,

  initialize: async () => {
    const state = await loadState();
    set({ userState: state, isLoading: false });
  },

  setDarkMode: (darkMode: boolean) => {
    set({ darkMode });
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  updateTopicProgress: (topicId: string, progress: Partial<TopicProgress>) => {
    set((state) => {
      const existingProgress = state.userState.topicProgress[topicId] || {
        topicId,
        completed: false,
        score: 0,
        taskProgress: []
      };

      const newProgress = {
        ...existingProgress,
        ...progress,
        taskProgress: progress.taskProgress || existingProgress.taskProgress
      };

      const newUserState = {
        ...state.userState,
        topicProgress: {
          ...state.userState.topicProgress,
          [topicId]: newProgress
        }
      };

      saveState(newUserState);
      return { userState: newUserState };
    });
  },

  completeTask: (topicId: string, taskId: string, userCode?: string) => {
    set((state) => {
      const topicProgress = state.userState.topicProgress[topicId] || {
        topicId,
        completed: false,
        score: 0,
        taskProgress: []
      };

      const existingTaskIndex = topicProgress.taskProgress.findIndex(
        (tp) => tp.taskId === taskId
      );

      const taskProgress: TaskProgress = {
        taskId,
        completed: true,
        attempts: existingTaskIndex >= 0 
          ? topicProgress.taskProgress[existingTaskIndex].attempts + 1 
          : 1,
        lastAttempt: new Date(),
        ...(userCode ? { userCode } : {})
      };

      let newTaskProgress: TaskProgress[];
      if (existingTaskIndex >= 0) {
        newTaskProgress = [...topicProgress.taskProgress];
        newTaskProgress[existingTaskIndex] = taskProgress;
      } else {
        newTaskProgress = [...topicProgress.taskProgress, taskProgress];
      }

      // Вычисляем новый счет (процент выполненных задач)
      const topic = courseModules
        .flatMap((m) => m.topics)
        .find((t) => t.id === topicId);
      
      const totalTasks = topic?.tasks.length || 1;
      const completedTasks = newTaskProgress.filter((tp) => tp.completed).length;
      const newScore = Math.round((completedTasks / totalTasks) * 100);

      const newTopicProgress: TopicProgress = {
        ...topicProgress,
        taskProgress: newTaskProgress,
        score: newScore,
        completed: newScore >= 80,
        completedAt: newScore >= 80 ? new Date() : topicProgress.completedAt
      };

      const newUserState = {
        ...state.userState,
        topicProgress: {
          ...state.userState.topicProgress,
          [topicId]: newTopicProgress
        }
      };

      saveState(newUserState);
      return { userState: newUserState };
    });
  },

  setCurrentTopic: (topicId: string) => {
    set((state) => {
      const newUserState = {
        ...state.userState,
        currentTopicId: topicId,
        updatedAt: new Date()
      };
      saveState(newUserState);
      return { userState: newUserState };
    });
  },

  resetProgress: async () => {
    await del(DB_KEY);
    const newState = getDefaultState();
    set({ userState: newState });
  },

  getTopicProgress: (topicId: string) => {
    return get().userState.topicProgress[topicId];
  },

  isTopicLocked: (topicId: string) => {
    const { userState } = get();
    const allTopics = courseModules.flatMap((m) => m.topics);
    const topicIndex = allTopics.findIndex((t) => t.id === topicId);
    
    if (topicIndex === 0) return false; // Первая тема всегда открыта
    
    // Проверяем, пройдена ли предыдущая тема (80%+)
    const previousTopicId = allTopics[topicIndex - 1]?.id;
    if (!previousTopicId) return false;
    
    const previousProgress = userState.topicProgress[previousTopicId];
    return !previousProgress || previousProgress.score < 80;
  },

  isTopicCompleted: (topicId: string) => {
    const { userState } = get();
    const progress = userState.topicProgress[topicId];
    return progress?.completed || false;
  },

  getTopicScore: (topicId: string) => {
    const { userState } = get();
    return userState.topicProgress[topicId]?.score || 0;
  },

  getTotalProgress: () => {
    const { userState } = get();
    const allTopics = courseModules.flatMap((m) => m.topics);
    const totalTopics = allTopics.length;
    const completedTopics = allTopics.filter(
      (t) => userState.topicProgress[t.id]?.completed
    ).length;
    
    return totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  },

  getCompletedTopicsCount: () => {
    const { userState } = get();
    const allTopics = courseModules.flatMap((m) => m.topics);
    return allTopics.filter(
      (t) => userState.topicProgress[t.id]?.completed
    ).length;
  }
}));
