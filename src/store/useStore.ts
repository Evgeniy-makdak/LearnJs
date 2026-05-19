import { create } from 'zustand';
import { get, set, del } from 'idb-keyval';
import { TopicProgress, TaskProgress, UserState, AuthUser } from '../types';
import { courseModules } from '../data/courseData';

// Keys for storage
const DB_KEY = 'js-simulator-user-state';
const AUTH_KEY = 'js-simulator-auth';
const USERS_KEY = 'js-simulator-users';
const PENDING_KEY = 'js-simulator-pending';

// Generate verification code
const generateVerificationCode = (): string => {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
};

// Default state
const getDefaultState = (): UserState => ({
  id: crypto.randomUUID(),
  name: 'Студент',
  currentTopicId: courseModules[0]?.topics[0]?.id || null,
  topicProgress: {},
  totalScore: 0,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Load/Save user state
const loadState = async (): Promise<UserState> => {
  try {
    const saved = await get<UserState>(DB_KEY);
    if (saved) return { ...getDefaultState(), ...saved };
  } catch (error) {
    console.error('Failed to load state:', error);
  }
  return getDefaultState();
};

const saveState = async (state: UserState) => {
  try {
    await set(DB_KEY, { ...state, updatedAt: new Date() });
  } catch (error) {
    console.error('Failed to save state:', error);
  }
};

// Auth functions
const loadAuth = async (): Promise<AuthUser | null> => {
  try {
    return await get<AuthUser>(AUTH_KEY) || null;
  } catch {
    return null;
  }
};

const saveAuth = async (user: AuthUser) => {
  await set(AUTH_KEY, user);
};

const clearAuth = async () => {
  await del(AUTH_KEY);
};

// Users storage (plain objects instead of Map)
interface StoredUser {
  password: string;
}

interface PendingUser {
  password: string;
  code: string;
  verified: boolean;
}

const getUsers = async (): Promise<Record<string, StoredUser>> => {
  return (await get<Record<string, StoredUser>>(USERS_KEY)) || {};
};

const saveUser = async (email: string, userData: StoredUser) => {
  const users = await getUsers();
  users[email] = userData;
  await set(USERS_KEY, users);
};

const getPendingUsers = async (): Promise<Record<string, PendingUser>> => {
  return (await get<Record<string, PendingUser>>(PENDING_KEY)) || {};
};

const savePendingUser = async (email: string, data: PendingUser) => {
  const users = await getPendingUsers();
  users[email] = data;
  await set(PENDING_KEY, users);
};

const updatePendingUserVerified = async (email: string) => {
  const users = await getPendingUsers();
  if (users[email]) {
    users[email].verified = true;
    await set(PENDING_KEY, users);
  }
};

interface StoreState {
  userState: UserState;
  isLoading: boolean;
  darkMode: boolean;
  
  // Auth state
  authUser: AuthUser | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  authError: string | null;
  verificationCode: string | null;
  pendingEmail: string | null;
  showFirstModuleComplete: boolean;
  
  // User actions
  initialize: () => Promise<void>;
  setDarkMode: (darkMode: boolean) => void;
  updateTopicProgress: (topicId: string, progress: Partial<TopicProgress>) => void;
  completeTask: (topicId: string, taskId: string, userCode?: string) => void;
  setCurrentTopic: (topicId: string) => void;
  resetProgress: () => Promise<void>;
  
  // Auth actions
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  verifyEmail: (email: string, code: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setShowFirstModuleComplete: (show: boolean) => void;
  
  // Selectors
  getTopicProgress: (topicId: string) => TopicProgress | undefined;
  isTopicLocked: (topicId: string) => boolean;
  isTopicCompleted: (topicId: string) => boolean;
  getTopicScore: (topicId: string) => number;
  getTotalProgress: () => number;
  getCompletedTopicsCount: () => number;
  canAccessModule: (moduleId: string) => boolean;
}

export const useStore = create<StoreState>((set, get) => ({
  userState: getDefaultState(),
  isLoading: true,
  darkMode: true,
  
  // Auth state
  authUser: null,
  isAuthenticated: false,
  authLoading: true,
  authError: null,
  verificationCode: null,
  pendingEmail: null,
  showFirstModuleComplete: false,

  initialize: async () => {
    const [state, auth] = await Promise.all([loadState(), loadAuth()]);
    set({ 
      userState: state, 
      authUser: auth,
      isAuthenticated: !!auth,
      isLoading: false,
      authLoading: false 
    });
    if (auth) {
      document.documentElement.classList.add('dark');
    }
  },

  checkAuth: async () => {
    const auth = await loadAuth();
    set({ 
      authUser: auth,
      isAuthenticated: !!auth,
      authLoading: false 
    });
  },

  setDarkMode: (darkMode: boolean) => {
    set({ darkMode });
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  // Auth actions
  register: async (email: string, password: string) => {
    set({ authLoading: true, authError: null });
    
    try {
      // Check if user exists
      const users = await getUsers();
      if (users[email]) {
        set({ authLoading: false, authError: 'Пользователь с таким email уже существует' });
        return { success: false, error: 'Пользователь с таким email уже существует' };
      }
      
      // Generate verification code
      const code = generateVerificationCode();
      await savePendingUser(email, { password, code, verified: false });
      
      // In real app, send email here. For now, show code in alert
      alert(`Код подтверждения: ${code}\n(В реальном приложении код будет отправлен на email)`);
      
      set({ 
        verificationCode: code,
        pendingEmail: email,
        authLoading: false 
      });
      
      return { success: true };
    } catch (error) {
      set({ 
        authLoading: false, 
        authError: 'Ошибка регистрации' 
      });
      return { success: false, error: 'Ошибка регистрации' };
    }
  },

  verifyEmail: async (email: string, code: string) => {
    set({ authLoading: true, authError: null });
    
    try {
      const pending = await getPendingUsers();
      const user = pending[email];
      
      if (!user) {
        set({ authLoading: false, authError: 'Регистрация не найдена' });
        return { success: false, error: 'Регистрация не найдена' };
      }
      
      if (user.code !== code) {
        set({ authLoading: false, authError: 'Неверный код подтверждения' });
        return { success: false, error: 'Неверный код подтверждения' };
      }
      
      // Save user and create auth session
      await saveUser(email, { password: user.password });
      await updatePendingUserVerified(email);
      
      const authUser: AuthUser = {
        id: crypto.randomUUID(),
        email,
        name: email.split('@')[0],
        verified: true,
        createdAt: Date.now()
      };
      
      await saveAuth(authUser);
      
      set({
        authUser,
        isAuthenticated: true,
        verificationCode: null,
        pendingEmail: null,
        authLoading: false
      });
      
      return { success: true };
    } catch (error) {
      set({ authLoading: false, authError: 'Ошибка подтверждения' });
      return { success: false, error: 'Ошибка подтверждения' };
    }
  },

  login: async (email: string, password: string) => {
    set({ authLoading: true, authError: null });
    
    try {
      const users = await getUsers();
      const user = users[email];
      
      if (!user || user.password !== password) {
        set({ authLoading: false, authError: 'Неверный email или пароль' });
        return { success: false, error: 'Неверный email или пароль' };
      }
      
      const authUser: AuthUser = {
        id: crypto.randomUUID(),
        email,
        name: email.split('@')[0],
        verified: true,
        createdAt: Date.now()
      };
      
      await saveAuth(authUser);
      
      set({
        authUser,
        isAuthenticated: true,
        authLoading: false
      });
      
      return { success: true };
    } catch (error) {
      set({ authLoading: false, authError: 'Ошибка входа' });
      return { success: false, error: 'Ошибка входа' };
    }
  },

  logout: async () => {
    await clearAuth();
    set({
      authUser: null,
      isAuthenticated: false
    });
  },

  setShowFirstModuleComplete: (show: boolean) => {
    set({ showFirstModuleComplete: show });
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
    const { userState, isAuthenticated } = get();
    const allTopics = courseModules.flatMap((m) => m.topics);
    const topicIndex = allTopics.findIndex((t) => t.id === topicId);
    
    // For non-authenticated users, only first module is accessible
    if (!isAuthenticated) {
      const topicModule = courseModules.find(m => m.topics.some(t => t.id === topicId));
      if (topicModule && topicModule.id !== 'module-1') {
        return true;
      }
    }
    
    if (topicIndex === 0) return false;
    
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
  },

  canAccessModule: (moduleId: string) => {
    const { isAuthenticated, userState } = get();
    
    // First module always accessible
    if (moduleId === 'module-1') return true;
    
    // Other modules require authentication
    if (!isAuthenticated) return false;
    
    // Check if previous module is completed
    const moduleIndex = courseModules.findIndex(m => m.id === moduleId);
    if (moduleIndex <= 0) return true;
    
    const previousModule = courseModules[moduleIndex - 1];
    const previousModuleTopics = previousModule.topics;
    const allCompleted = previousModuleTopics.every(
      t => userState.topicProgress[t.id]?.completed
    );
    
    return allCompleted;
  }
}));
