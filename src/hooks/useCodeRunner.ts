import { useCallback } from 'react';
import { CodeExecutionResult, CodingTask } from '../types';

/**
 * Хук для безопасного выполнения пользовательского кода
 * Запускает код в изолированной среде и сравнивает с тест-кейсами
 */
export const useCodeRunner = () => {
  const runCode = useCallback((
    userCode: string,
    task: CodingTask
  ): CodeExecutionResult => {
    const testResults: CodeExecutionResult['testResults'] = [];
    let allPassed = true;

    try {
      // Создаем безопасную функцию для выполнения кода
      // Пользователь должен определить функцию solution()
      const fnName = task.functionName || 'solution';
      
      const wrappedCode = `
        "use strict";
        
        // Отключаем опасные глобальные объекты
        const fetch = undefined;
        const document = undefined;
        const window = undefined;
        const localStorage = undefined;
        const sessionStorage = undefined;
        
        ${task.precondition || ''}
        
        ${userCode}
        
        // Проверяем, что функция определена
        if (typeof ${fnName} !== 'function') {
          throw new Error('Функция ${fnName} не найдена. Назовите вашу функцию ${fnName}.');
        }
        
        return ${fnName};
      `;

      // Создаем функцию из строки кода
      const createFunction = new Function(wrappedCode);
      const solutionFunction = createFunction();

      // Запускаем тест-кейсы
      for (const testCase of task.testCases) {
        try {
          const actual = solutionFunction(...testCase.input);
          const passed = JSON.stringify(actual) === JSON.stringify(testCase.expected);
          
          testResults.push({
            input: testCase.input,
            expected: testCase.expected,
            actual,
            passed
          });

          if (!passed) {
            allPassed = false;
          }
        } catch (testError) {
          testResults.push({
            input: testCase.input,
            expected: testCase.expected,
            actual: undefined,
            passed: false
          });
          allPassed = false;

          // Возвращаем ошибку выполнения теста
          return {
            success: false,
            error: `Ошибка при тесте с input=${JSON.stringify(testCase.input)}: ${(testError as Error).message}`,
            testResults
          };
        }
      }

      return {
        success: allPassed,
        testResults
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      
      // Парсим ошибку для более понятного сообщения
      let userFriendlyError = errorMessage;
      
      if (errorMessage.includes('solution')) {
        userFriendlyError = errorMessage;
      } else if (errorMessage.includes('SyntaxError')) {
        const match = errorMessage.match(/line (\d+)/);
        if (match) {
          userFriendlyError = `Синтаксическая ошибка на строке ${match[1]}. Проверьте скобки и точки с запятой.`;
        }
      } else if (errorMessage.includes('ReferenceError')) {
        const match = errorMessage.match(/'([^']+)'/);
        if (match) {
          userFriendlyError = `Переменная или функция "${match[1]}" не найдена. Проверьте имена.`;
        }
      } else if (errorMessage.includes('TypeError')) {
        userFriendlyError = `Ошибка типа: ${errorMessage}. Проверьте типы данных.`;
      }

      return {
        success: false,
        error: userFriendlyError
      };
    }
  }, []);

  const getFeedback = useCallback((result: CodeExecutionResult, _task: CodingTask): string => {
    if (result.success) {
      return '🎉 Отлично! Все тесты пройдены!';
    }

    if (result.error) {
      return `❌ Ошибка: ${result.error}`;
    }

    if (result.testResults) {
      const failed = result.testResults.find((r) => !r.passed);
      if (failed) {
        let hint = '';
        if (failed.actual === undefined && failed.expected !== undefined) {
          hint = '\n\n💡 Подсказка: ваша функция ничего не возвращает (undefined). Добавьте `return` для возврата значения.';
        }
        return `❌ Тест не пройден.\nВход: ${JSON.stringify(failed.input)}\nОжидалось: ${JSON.stringify(failed.expected)}\nПолучено: ${JSON.stringify(failed.actual)}${hint}`;
      }
    }

    return '❌ Код не прошел тесты. Попробуйте еще раз.';
  }, []);

  return {
    runCode,
    getFeedback
  };
};
