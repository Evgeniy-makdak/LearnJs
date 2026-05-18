import { useEffect } from 'react';
import { useStore } from '../store/useStore';

/**
 * Хук для управления темой приложения
 * Автоматически применяет класс dark к documentElement
 */
export const useTheme = () => {
  const darkMode = useStore((state) => state.darkMode);
  const setDarkMode = useStore((state) => state.setDarkMode);

  // Применяем тему при изменении
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Проверяем системную тему при первом рендере
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [setDarkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return {
    darkMode,
    toggleTheme
  };
};
