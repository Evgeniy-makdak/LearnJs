import { Module } from '../types';

export const courseModules: Module[] = [
  {
    id: 'module-1',
    title: 'Фундамент',
    description: 'Основы JavaScript: переменные, типы данных и операторы',
    topics: [
      {
        id: 'introduction',
        order: 1,
        title: 'Введение. Подключение скриптов, консоль разработчика',
        theory: [
          { type: 'text', content: '## Что такое JavaScript?\n\nJavaScript — это язык программирования, который делает веб-страницы интерактивными.\n\n**Где выполняется JavaScript?**\n- В браузере (клиентский JS)\n- На сервере (Node.js)\n- В мобильных приложениях (React Native)' },
          { type: 'code', content: '// Пример кода\nconsole.log("Привет, мир!");\nconst name = "Алексей";\nconst age = 25;' },
          { type: 'text', content: '## Подключение JavaScript к HTML\n\n**1. Внутренний скрипт**\n**2. Внешний файл (рекомендуется)**\n**3. Инлайн (не рекомендуется)**' },
          { type: 'code', content: '<script src="script.js" defer></script>' },
          { type: 'warning', content: '⚠️ defer заставляет скрипт выполняться после загрузки HTML.' },
          { type: 'text', content: '## Консоль разработчика\n\n**Windows/Linux:** F12 или Ctrl+Shift+J\n**Mac:** Cmd+Option+J' },
          { type: 'code', content: 'console.log("Сообщение");\nconsole.error("Ошибка");\nconsole.warn("Предупреждение");' }
        ],
        tasks: [
          { type: 'quiz', question: 'Где лучше всего размещать подключение внешнего JavaScript-файла?', options: ['В начале head', 'В конце body или с defer в head', 'В середине body', 'Не имеет значения'], correct: [1], explanation: 'Скрипт в конце body или с defer гарантирует, что HTML загрузится до выполнения кода.' },
          { type: 'quiz', question: 'Какой метод используется для вывода в консоль?', options: ['print()', 'console.log()', 'System.out.println()', 'echo()'], correct: [1], explanation: 'console.log() — стандартный метод.' },
          { type: 'quiz', question: 'Что делает атрибут defer?', options: ['Отменяет скрипт', 'Выполняет после загрузки HTML', 'Ускоряет скрипт', 'Делает невидимым'], correct: [1], explanation: 'defer откладывает выполнение скрипта.' },
          { type: 'coding', description: 'Напишите функцию solution, которая принимает имя и возвращает "Привет, {имя}!".', initialCode: 'function solution(name) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: ['Анна'], expected: 'Привет, Анна!' }, { input: ['Максим'], expected: 'Привет, Максим!' }, { input: ['Елена'], expected: 'Привет, Елена!' }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution, которая принимает два числа и возвращает их сумму.', initialCode: 'function solution(a, b) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [2, 3], expected: 5 }, { input: [10, 20], expected: 30 }, { input: [0, 0], expected: 0 }, { input: [-5, 5], expected: 0 }], precondition: '' }
        ]
      },
      {
        id: 'variables',
        order: 2,
        title: 'Переменные (let, const, var). Именование',
        theory: [
          { type: 'text', content: '## Что такое переменная?\n\n**let** — можно изменять\n**const** — нельзя изменить\n**var** — устаревший способ' },
          { type: 'code', content: 'let age = 25;\nage = 26; // OK\n\nconst PI = 3.14159;\n// PI = 3.14; // Ошибка!' },
          { type: 'text', content: '## let vs const vs var\n\n**Современные правила:**\n1. Используйте const по умолчанию\n2. Используйте let, если значение будет меняться\n3. Избегайте var' },
          { type: 'warning', content: '⚠️ const не делает объект неизменяемым! const user = { name: "Анна" }; user.name = "Борис"; // OK!' },
          { type: 'text', content: '## Правила именования\n\n**Можно:** буквы, цифры (не в начале), $ и _\n**Нельзя:** начинать с цифры, зарезервированные слова, дефис' },
          { type: 'code', content: 'let userName = "Анна";\nconst MAX_RETRIES = 3;\n// let 123name = "error"; // Нельзя!' }
        ],
        tasks: [
          { type: 'quiz', question: 'Какое ключевое слово для переменной, которая НЕ будет меняться?', options: ['let', 'var', 'const', 'fixed'], correct: [2], explanation: 'const используется для констант.' },
          { type: 'quiz', question: 'Что произойдет при изменении const?', options: ['Значение изменится', 'Ошибка', 'undefined', 'Ничего'], correct: [1], explanation: 'Попытка переназначить const вызовет TypeError.' },
          { type: 'quiz', question: 'Какое имя НЕДОПУСТИМО?', options: ['userName', '_private', '123count', '$element'], correct: [2], explanation: 'Имена не могут начинаться с цифры.' },
          { type: 'coding', description: 'Объявите константу APP_NAME = "JS Simulator" и переменную version. Верните объект { appName, version }.', initialCode: 'function solution() {\n  // Ваш код\n  return { appName, version };\n}', functionName: 'solution', testCases: [{ input: [], expected: { appName: 'JS Simulator', version: 1 } }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution, которая меняет два значения местами.', initialCode: 'function solution(a, b) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [1, 2], expected: [2, 1] }, { input: ['a', 'b'], expected: ['b', 'a'] }, { input: [true, false], expected: [false, true] }], precondition: '' }
        ]
      },
      {
        id: 'data-types',
        order: 3,
        title: 'Типы данных. typeof',
        theory: [
          { type: 'text', content: '## 7 примитивных типов:\n\n1. Number — числа\n2. String — строки\n3. Boolean — true/false\n4. Null — пусто\n5. Undefined — не присвоено\n6. Symbol — уникальные ID\n7. BigInt — большие числа' },
          { type: 'code', content: 'let age = 25;\nlet name = "Анна";\nlet isActive = true;\nlet empty = null;\nlet notDefined;\nlet id = Symbol("id");\nlet big = 9007199254740991n;' },
          { type: 'text', content: '## typeof возвращает:\n\ntypeof 42 — "number"\ntypeof "hello" — "string"\ntypeof null — "object" (баг!)\ntypeof [] — "object"' },
          { type: 'warning', content: '⚠️ typeof null === "object" — историческая ошибка. Используйте value === null.' },
          { type: 'text', content: '## Проверка типа\n\nif (typeof value === "string") { ... }\nif (value === null) { ... }\nArray.isArray([]); // true' },
          { type: 'code', content: 'function getType(value) {\n  if (value === null) return "null";\n  if (Array.isArray(value)) return "array";\n  return typeof value;\n}' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что вернет typeof null?', options: ['"null"', '"undefined"', '"object"', '"number"'], correct: [2], explanation: 'typeof null === "object" — исторический баг.' },
          { type: 'quiz', question: 'Тип для больших целых чисел?', options: ['Number', 'BigInt', 'Integer', 'Long'], correct: [1], explanation: 'BigInt обозначается суффиксом n.' },
          { type: 'quiz', question: 'Что вернет typeof []?', options: ['"array"', '"list"', '"object"', '"undefined"'], correct: [2], explanation: 'Массивы — это объекты.' },
          { type: 'coding', description: 'Напишите функцию solution, возвращающую тип значения. Для null — "null", для массива — "array".', initialCode: 'function solution(value) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [42], expected: 'number' }, { input: ['hello'], expected: 'string' }, { input: [null], expected: 'null' }, { input: [[]], expected: 'array' }, { input: [true], expected: 'boolean' }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution, проверяющую примитивный тип.', initialCode: 'function solution(value) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [42], expected: true }, { input: ['hello'], expected: true }, { input: [null], expected: true }, { input: [undefined], expected: true }, { input: [{}], expected: false }, { input: [[]], expected: false }], precondition: '' }
        ]
      },
      {
        id: 'type-conversion',
        order: 4,
        title: 'Преобразование типов',
        theory: [
          { type: 'text', content: '## Явное и неявное преобразование\n\n"5" - 3 = 2 (строка стала числом)\n"5" + 3 = "53" (число стало строкой!)' },
          { type: 'code', content: 'Number("42");      // 42\nparseInt("42px");  // 42\nparseFloat("3.14"); // 3.14\n+"42";   // 42\nString(42); // "42"\nBoolean("hello"); // true' },
          { type: 'text', content: '## Falsy значения (7 штук):\n\nfalse, 0, -0, 0n, "", null, undefined, NaN' },
          { type: 'warning', content: '⚠️ "5" + 3 = "53", а не 8! Оператор + со строкой делает конкатенацию.' },
          { type: 'text', content: '## parseInt и parseFloat\n\nparseInt("42px") = 42\nparseFloat("3.14px") = 3.14\nparseInt("1010", 2) = 10 (двоичная)' },
          { type: 'code', content: 'function safeNumber(value, defaultValue = 0) {\n  const num = Number(value);\n  return isNaN(num) ? defaultValue : num;\n}' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что вернет "5" + 3?', options: ['8', '"53"', 'NaN', 'Ошибка'], correct: [1], explanation: '+ со строкой делает конкатенацию.' },
          { type: 'quiz', question: 'Какое значение falsy?', options: ['"0"', '[]', 'NaN', '{}'], correct: [2], explanation: 'NaN — одно из 7 falsy значений.' },
          { type: 'quiz', question: 'Что вернет parseInt("10px20")?', options: ['10', '1020', 'NaN', '10, 20'], correct: [0], explanation: 'parseInt читает до первого нечислового символа.' },
          { type: 'coding', description: 'Напишите функцию solution, возвращающую число из строки или 0.', initialCode: 'function solution(str) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: ['42'], expected: 42 }, { input: ['3.14'], expected: 3.14 }, { input: ['abc'], expected: 0 }, { input: ['100px'], expected: 100 }, { input: [''], expected: 0 }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution, преобразующую значение в boolean.', initialCode: 'function solution(value) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: ['hello'], expected: true }, { input: [''], expected: false }, { input: [0], expected: false }, { input: [1], expected: true }, { input: [null], expected: false }], precondition: '' }
        ]
      },
      {
        id: 'operators',
        order: 5,
        title: 'Базовые операторы',
        theory: [
          { type: 'text', content: '## Математические операторы\n\n+ - * / % ** ++ --\n\nx += 5 (то же что x = x + 5)' },
          { type: 'code', content: 'let x = 10;\nx += 5;    // 15\nx %= 4;    // 3\n5 % 2;     // 1 (нечетное)\n4 % 2;     // 0 (четное)' },
          { type: 'text', content: '## Операторы сравнения\n\n== (нестрогое), === (строгое)\n!=, !==\n>, <, >=, <=' },
          { type: 'warning', content: '⚠️ Всегда используйте === и !==. 0 == "0" → true, но 0 === "0" → false.' },
          { type: 'text', content: '## Логические операторы\n\n&& (И), || (ИЛИ), ! (НЕ)\n\nconst canDrive = age >= 18 && hasLicense;' },
          { type: 'code', content: 'const name = "";\nconst displayName = name || "Гость";\nconst value = null ?? "default";' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что вернет "5" === 5?', options: ['true', 'false', 'NaN', 'Ошибка'], correct: [1], explanation: 'Строгое сравнение проверяет тип и значение.' },
          { type: 'quiz', question: 'Что вернет 7 % 3?', options: ['2', '1', '3', '0'], correct: [1], explanation: 'Остаток от деления 7 на 3 = 1.' },
          { type: 'quiz', question: 'Что вернет null ?? "default"?', options: ['null', '"default"', 'undefined', 'Ошибка'], correct: [1], explanation: '?? возвращает правый операнд, если левый null/undefined.' },
          { type: 'coding', description: 'Напишите функцию solution, проверяющую четность числа.', initialCode: 'function solution(num) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [2], expected: true }, { input: [3], expected: false }, { input: [0], expected: true }, { input: [-4], expected: true }, { input: [-3], expected: false }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution, возвращающую большее из двух чисел.', initialCode: 'function solution(a, b) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [5, 3], expected: 5 }, { input: [2, 8], expected: 8 }, { input: [4, 4], expected: 4 }, { input: [-1, -5], expected: -1 }, { input: [0, -1], expected: 0 }], precondition: '' }
        ]
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Управление потоком',
    description: 'Условия, циклы и функции',
    topics: [
      {
        id: 'conditions',
        order: 6,
        title: 'Условные конструкции (if...else, тернарный оператор)',
        theory: [
          { type: 'text', content: '## if...else\n\nif (age >= 18) { console.log("Доступ разрешен"); } else { console.log("Доступ запрещен"); }' },
          { type: 'code', content: 'const score = 85;\nif (score >= 90) {\n  console.log("Отлично!");\n} else if (score >= 70) {\n  console.log("Хорошо");\n} else {\n  console.log("Нужно подучить");\n}' },
          { type: 'text', content: '## Тернарный оператор\n\ncondition ? valueIfTrue : valueIfFalse' },
          { type: 'code', content: 'const age = 20;\nconst status = age >= 18 ? "совершеннолетний" : "несовершеннолетний";' },
          { type: 'warning', content: '⚠️ Не злоупотребляйте вложенными тернарниками — они сложно читаются.' },
          { type: 'text', content: '## Логические операторы в условиях\n\n&& — оба условия должны быть true\n|| — хотя бы одно условие true\n! — инвертирует условие' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что вернет: true ? "A" : "B"?', options: ['"A"', '"B"', 'true', 'undefined'], correct: [0], explanation: 'Тернарный оператор возвращает значение после ? если условие истинно.' },
          { type: 'quiz', question: 'Какой оператор проверяет, что ОБА условия истинны?', options: ['||', '&&', '!', '??'], correct: [1], explanation: '&& (И) возвращает true только если оба операнда истинны.' },
          { type: 'quiz', question: 'Что выведет: if (0) { console.log("yes") } else { console.log("no") }?', options: ['"yes"', '"no"', 'undefined', 'Ошибка'], correct: [1], explanation: '0 — falsy значение, поэтому выполнится блок else.' },
          { type: 'coding', description: 'Напишите функцию solution, возвращающую: "child" (<13), "teen" (13-19), "adult" (20-64), "senior" (>=65).', initialCode: 'function solution(age) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [10], expected: 'child' }, { input: [15], expected: 'teen' }, { input: [30], expected: 'adult' }, { input: [70], expected: 'senior' }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution, возвращающую: "A" (90-100), "B" (80-89), "C" (70-79), "D" (60-69), "F" (<60).', initialCode: 'function solution(score) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [95], expected: 'A' }, { input: [85], expected: 'B' }, { input: [75], expected: 'C' }, { input: [65], expected: 'D' }, { input: [55], expected: 'F' }], precondition: '' }
        ]
      },
      {
        id: 'switch',
        order: 7,
        title: 'Конструкция switch...case',
        theory: [
          { type: 'text', content: '## switch...case\n\nАльтернатива множественным if...else if.' },
          { type: 'code', content: 'const day = 3;\nswitch (day) {\n  case 1: console.log("Понедельник"); break;\n  case 2: console.log("Вторник"); break;\n  case 3: console.log("Среда"); break;\n  default: console.log("Выходной");\n}' },
          { type: 'text', content: '## Группировка case\n\nМожно группировать несколько case для одного действия.' },
          { type: 'code', content: 'switch (month) {\n  case 12:\n  case 1:\n  case 2:\n    season = "Зима";\n    break;\n}' },
          { type: 'warning', content: '⚠️ Не забудьте break! Без break выполнение "провалится" в следующий case.' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что произойдет без break в case?', options: ['Ошибка', 'Выполнение провалится в следующий case', 'Ничего', 'Switch завершится'], correct: [1], explanation: 'Без break выполнение продолжится в следующем case (fall-through).' },
          { type: 'quiz', question: 'Какой case выполняется, если ни одно условие не подошло?', options: ['first', 'last', 'default', 'none'], correct: [2], explanation: 'default выполняется, когда ни один case не совпал.' },
          { type: 'quiz', question: 'Можно ли группировать несколько case?', options: ['Нет', 'Да', 'Только в старом JS', 'Только с break'], correct: [1], explanation: 'Можно записывать case подряд без break для группировки.' },
          { type: 'coding', description: 'Напишите функцию solution, возвращающую название дня недели (1-7).', initialCode: 'function solution(day) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [1], expected: 'Понедельник' }, { input: [3], expected: 'Среда' }, { input: [7], expected: 'Воскресенье' }, { input: [0], expected: 'Неверный день' }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution(a, b, operator) с операторами +, -, *, /.', initialCode: 'function solution(a, b, operator) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [5, 3, '+'], expected: 8 }, { input: [10, 4, '-'], expected: 6 }, { input: [6, 7, '*'], expected: 42 }, { input: [20, 4, '/'], expected: 5 }], precondition: '' }
        ]
      },
      {
        id: 'loops-while',
        order: 8,
        title: 'Циклы while и do...while',
        theory: [
          { type: 'text', content: '## while\n\nВыполняет блок кода, пока условие истинно.' },
          { type: 'code', content: 'let i = 0;\nwhile (i < 5) {\n  console.log(i);\n  i++;\n}' },
          { type: 'text', content: '## do...while\n\nУсловие проверяется ПОСЛЕ итерации. Выполнится минимум один раз.' },
          { type: 'code', content: 'let count = 0;\ndo {\n  console.log(count);\n  count++;\n} while (count < 3);' },
          { type: 'warning', content: '⚠️ Опасность бесконечных циклов! Убедитесь, что условие станет ложным.' }
        ],
        tasks: [
          { type: 'quiz', question: 'В чем отличие do...while от while?', options: ['Быстрее', 'Выполняется минимум один раз', 'Проверяет условие ДО', 'Нет отличий'], correct: [1], explanation: 'В do...while условие проверяется после итерации.' },
          { type: 'quiz', question: 'Что выведет: let i=0; while(i<3) { console.log(i++); }?', options: ['0, 1, 2', '1, 2, 3', '0, 1, 2, 3', 'Бесконечный цикл'], correct: [0], explanation: 'i++ возвращает старое значение.' },
          { type: 'quiz', question: 'Какой цикл лучше, если известно количество итераций?', options: ['while', 'do...while', 'for', 'switch'], correct: [2], explanation: 'for лучше подходит для известного количества итераций.' },
          { type: 'coding', description: 'Напишите функцию solution, суммирующую числа от 1 до n (используйте while).', initialCode: 'function solution(n) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [5], expected: 15 }, { input: [3], expected: 6 }, { input: [1], expected: 1 }, { input: [10], expected: 55 }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution, вычисляющую факториал числа n!.', initialCode: 'function solution(n) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [5], expected: 120 }, { input: [0], expected: 1 }, { input: [3], expected: 6 }, { input: [1], expected: 1 }], precondition: '' }
        ]
      },
      {
        id: 'loops-for',
        order: 9,
        title: 'Цикл for',
        theory: [
          { type: 'text', content: '## for\n\nfor (инициализация; условие; шаг) { ... }' },
          { type: 'code', content: 'for (let i = 0; i < 5; i++) {\n  console.log(i);\n}' },
          { type: 'text', content: '## for...of\n\nСовременный способ перебора массивов и строк.' },
          { type: 'code', content: 'const arr = [1, 2, 3];\nfor (const num of arr) {\n  console.log(num);\n}' },
          { type: 'text', content: '## break и continue\n\nbreak — прерывает цикл\ncontinue — пропускает итерацию' },
          { type: 'code', content: 'for (let i = 0; i < 10; i++) {\n  if (i === 5) break;\n  if (i === 2) continue;\n  console.log(i);\n}' }
        ],
        tasks: [
          { type: 'quiz', question: 'Какие три части содержит цикл for?', options: ['start, condition, end', 'initialization, condition, increment', 'begin, middle, end', 'setup, loop, finish'], correct: [1], explanation: 'for (initialization; condition; increment)' },
          { type: 'quiz', question: 'Что делает break в цикле?', options: ['Пропускает итерацию', 'Прерывает цикл', 'Переходит к следующему циклу', 'Ничего'], correct: [1], explanation: 'break полностью прерывает цикл.' },
          { type: 'quiz', question: 'Что выведет: for (let i=0; i<5; i++) { if (i===2) continue; console.log(i); }?', options: ['0, 1, 2, 3, 4', '0, 1, 3, 4', '0, 1, 2', 'Бесконечный цикл'], correct: [1], explanation: 'continue пропускает итерацию с i=2.' },
          { type: 'coding', description: 'Напишите функцию solution, считающую четные числа от 1 до n.', initialCode: 'function solution(n) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [10], expected: 5 }, { input: [5], expected: 2 }, { input: [1], expected: 0 }, { input: [20], expected: 10 }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution, переворачивающую строку.', initialCode: 'function solution(str) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: ['hello'], expected: 'olleh' }, { input: ['abc'], expected: 'cba' }, { input: [''], expected: '' }, { input: ['12345'], expected: '54321' }], precondition: '' }
        ]
      },
      {
        id: 'functions',
        order: 10,
        title: 'Функции (Declaration, параметры, return)',
        theory: [
          { type: 'text', content: '## Function Declaration\n\nfunction greet(name) { return "Привет, " + name; }' },
          { type: 'code', content: '// Function Expression\nconst sayHello = function(name) {\n  return "Hello, " + name;\n};\n\n// Arrow Function\nconst add = (a, b) => a + b;' },
          { type: 'text', content: '## Параметры по умолчанию\n\nfunction greet(name = "Гость") { ... }' },
          { type: 'code', content: '// Rest параметры\nfunction sum(...numbers) {\n  let total = 0;\n  for (const num of numbers) total += num;\n  return total;\n}' },
          { type: 'warning', content: '⚠️ Return обрывает выполнение функции! Код после return не выполняется.' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что возвращает функция без return?', options: ['0', 'null', 'undefined', 'Ошибка'], correct: [2], explanation: 'Функция без return возвращает undefined.' },
          { type: 'quiz', question: 'Какую функцию можно вызвать ДО объявления?', options: ['Function Expression', 'Arrow', 'Function Declaration', 'Все'], correct: [2], explanation: 'Function Declaration поднимается (hoisting).' },
          { type: 'quiz', question: 'Что такое rest параметр (...args)?', options: ['Первый аргумент', 'Все аргументы в массиве', 'Последний аргумент', 'Ничего'], correct: [1], explanation: '...args собирает все аргументы в массив.' },
          { type: 'coding', description: 'Напишите функцию solution, проверяющую палиндром.', initialCode: 'function solution(str) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: ['racecar'], expected: true }, { input: ['hello'], expected: false }, { input: ['level'], expected: true }, { input: ['a'], expected: true }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution, возвращающую n-ое число Фибоначчи.', initialCode: 'function solution(n) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [0], expected: 0 }, { input: [1], expected: 1 }, { input: [5], expected: 5 }, { input: [7], expected: 13 }], precondition: '' }
        ]
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Структуры данных',
    description: 'Массивы, строки и продвинутые методы',
    topics: [
      {
        id: 'arrow-functions',
        order: 11,
        title: 'Функции-стрелки (Arrow functions)',
        theory: [
          { type: 'text', content: '## Стрелочные функции\n\nconst add = (a, b) => a + b;' },
          { type: 'code', content: '// Короткая запись\nconst square = x => x * x;\n\n// Возврат объекта\nconst getUser = () => ({ name: "Анна", age: 25 });' },
          { type: 'text', content: '## Отличия от обычных функций\n\n- Нет своего this\n- Нельзя использовать как конструктор\n- Нет arguments' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что выведет: const f = () => { x: 1 }? f() вернет:', options: ['{ x: 1 }', 'undefined', '1', 'Ошибка'], correct: [1], explanation: 'Без скобок вокруг объекта это блок кода, а не литерал объекта.' },
          { type: 'quiz', question: 'Есть ли у стрелочной функции свой this?', options: ['Да', 'Нет', 'Только в классах', 'Только в методах'], correct: [1], explanation: 'Стрелочные функции берут this из лексического окружения.' },
          { type: 'quiz', question: 'Можно ли использовать стрелочную функцию как конструктор?', options: ['Да', 'Нет', 'Только с new', 'Только в классах'], correct: [1], explanation: 'Стрелочные функции нельзя вызывать с new.' },
          { type: 'coding', description: 'Напишите стрелочную функцию multiply, умножающую два числа.', initialCode: 'const solution = (a, b) => {\n  // Ваш код\n};', functionName: 'solution', testCases: [{ input: [2, 3], expected: 6 }, { input: [5, 5], expected: 25 }, { input: [0, 10], expected: 0 }], precondition: '' },
          { type: 'coding', description: 'Напишите стрелочную функцию isPositive, проверяющую положительность числа.', initialCode: 'const solution = (num) => {\n  // Ваш код\n};', functionName: 'solution', testCases: [{ input: [5], expected: true }, { input: [-3], expected: false }, { input: [0], expected: false }], precondition: '' }
        ]
      },
      {
        id: 'strings',
        order: 12,
        title: 'Строки (методы slice, indexOf, includes, шаблонные строки)',
        theory: [
          { type: 'text', content: '## Методы строк\n\nslice(start, end) — извлекает часть строки\nindexOf(substr) — ищет подстроку\nincludes(substr) — проверяет наличие' },
          { type: 'code', content: 'const str = "Привет, мир!";\nstr.slice(0, 6);    // "Привет"\nstr.indexOf("мир");  // 8\nstr.includes("мир"); // true\nstr.toLowerCase();   // "привет, мир!"' },
          { type: 'text', content: '## Шаблонные строки\n\nconst name = "Анна";\nconst greeting = `Привет, ${name}!`;' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что вернет "hello".slice(1, 4)?', options: ['"ell"', '"hel"', '"ello"', '"ll"'], correct: [0], explanation: 'slice(1, 4) возвращает символы с индекса 1 до 4 (не включая).' },
          { type: 'quiz', question: 'Что вернет "hello".indexOf("l")?', options: ['1', '2', '3', '4'], correct: [1], explanation: 'indexOf возвращает индекс первого вхождения.' },
          { type: 'quiz', question: 'Что вернет "hello".includes("lo")?', options: ['true', 'false', 'undefined', 'Ошибка'], correct: [0], explanation: 'includes проверяет наличие подстроки.' },
          { type: 'coding', description: 'Напишите функцию solution, обрезающую строку до n символов с "..." в конце.', initialCode: 'function solution(str, n) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: ['hello world', 5], expected: 'hello...' }, { input: ['hi', 10], expected: 'hi' }, { input: ['test', 4], expected: 'test' }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution, считающую гласные в строке.', initialCode: 'function solution(str) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: ['hello'], expected: 2 }, { input: ['world'], expected: 1 }, { input: ['aeiou'], expected: 5 }], precondition: '' }
        ]
      },
      {
        id: 'arrays',
        order: 13,
        title: 'Массивы (создание, индексы, length)',
        theory: [
          { type: 'text', content: '## Создание массивов\n\nconst arr = [1, 2, 3];\nconst empty = [];' },
          { type: 'code', content: 'const fruits = ["яблоко", "банан", "апельсин"];\nfruits[0];       // "яблоко"\nfruits.length;   // 3\nfruits[3] = "киви";' },
          { type: 'text', content: '## Многомерные массивы\n\nconst matrix = [[1, 2], [3, 4]];\nmatrix[0][1]; // 2' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что вернет [1, 2, 3][1]?', options: ['1', '2', '3', 'undefined'], correct: [1], explanation: 'Индексы начинаются с 0.' },
          { type: 'quiz', question: 'Что вернет [].length?', options: ['0', '1', 'undefined', 'null'], correct: [0], explanation: 'Длина пустого массива — 0.' },
          { type: 'quiz', question: 'Как добавить элемент в конец массива?', options: ['push()', 'pop()', 'shift()', 'unshift()'], correct: [0], explanation: 'push() добавляет элемент в конец.' },
          { type: 'coding', description: 'Напишите функцию solution, возвращающую [первый, последний] элементы массива.', initialCode: 'function solution(arr) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [[1, 2, 3]], expected: [1, 3] }, { input: [['a', 'b']], expected: ['a', 'b'] }, { input: [[5]], expected: [5, 5] }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution, суммирующую элементы массива.', initialCode: 'function solution(arr) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [[1, 2, 3]], expected: 6 }, { input: [[10, 20]], expected: 30 }, { input: [[]], expected: 0 }], precondition: '' }
        ]
      },
      {
        id: 'array-methods',
        order: 14,
        title: 'Методы массивов (push, pop, shift, unshift, splice, forEach)',
        theory: [
          { type: 'text', content: '## Изменяющие методы\n\npush() — добавить в конец\npop() — удалить из конца\nshift() — удалить из начала\nunshift() — добавить в начало' },
          { type: 'code', content: 'const arr = [1, 2, 3];\narr.push(4);      // [1, 2, 3, 4]\narr.pop();        // [1, 2, 3]\narr.shift();      // [2, 3]\narr.unshift(0);   // [0, 2, 3]' },
          { type: 'text', content: '## splice(start, deleteCount, ...items)\n\nУдаляет/добавляет элементы.' },
          { type: 'code', content: 'const arr = [1, 2, 3, 4];\narr.splice(1, 2, "a", "b");\n// [1, "a", "b", 4]' },
          { type: 'text', content: '## forEach\n\narr.forEach(item => console.log(item));' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что вернет [1, 2].push(3)?', options: ['[1, 2, 3]', '3', 'undefined', '1'], correct: [1], explanation: 'push() возвращает новую длину массива.' },
          { type: 'quiz', question: 'Что удалит pop()?', options: ['Первый', 'Последний', 'Все', 'Ничего'], correct: [1], explanation: 'pop() удаляет последний элемент.' },
          { type: 'quiz', question: 'Что делает splice(1, 2)?', options: ['Удаляет 2 элемента с индекса 1', 'Добавляет 2 элемента', 'Копирует массив', 'Ничего'], correct: [0], explanation: 'splice(start, deleteCount) удаляет элементы.' },
          { type: 'coding', description: 'Напишите функцию solution, удаляющую первый и последний элементы.', initialCode: 'function solution(arr) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [[1, 2, 3, 4]], expected: [2, 3] }, { input: [['a', 'b', 'c']], expected: ['b'] }, { input: [[1, 2]], expected: [] }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution, умножающую каждый элемент на 2 (используйте forEach).', initialCode: 'function solution(arr) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [[1, 2, 3]], expected: [2, 4, 6] }, { input: [[0, 5]], expected: [0, 10] }], precondition: '' }
        ]
      },
      {
        id: 'advanced-arrays',
        order: 15,
        title: 'Продвинутые методы массивов (map, filter, reduce, find)',
        theory: [
          { type: 'text', content: '## map\n\nСоздает новый массив, применяя функцию к каждому элементу.' },
          { type: 'code', content: '[1, 2, 3].map(x => x * 2);\n// [2, 4, 6]' },
          { type: 'text', content: '## filter\n\nФильтрует элементы по условию.' },
          { type: 'code', content: '[1, 2, 3, 4].filter(x => x % 2 === 0);\n// [2, 4]' },
          { type: 'text', content: '## reduce\n\nСворачивает массив в одно значение.' },
          { type: 'code', content: '[1, 2, 3].reduce((sum, x) => sum + x, 0);\n// 6' },
          { type: 'text', content: '## find\n\nНаходит первый элемент по условию.' },
          { type: 'code', content: '[1, 2, 3].find(x => x > 1);\n// 2' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что вернет [1, 2, 3].map(x => x * 2)?', options: ['[1, 2, 3]', '[2, 4, 6]', '[2, 2, 2]', '6'], correct: [1], explanation: 'map применяет функцию к каждому элементу.' },
          { type: 'quiz', question: 'Что вернет [1, 2, 3].filter(x => x > 1)?', options: ['[1]', '[2, 3]', '[1, 2, 3]', 'true'], correct: [1], explanation: 'filter оставляет элементы, удовлетворяющие условию.' },
          { type: 'quiz', question: 'Что вернет [1, 2, 3].reduce((a, b) => a + b, 0)?', options: ['[1, 2, 3]', '6', '[6]', '0'], correct: [1], explanation: 'reduce сворачивает массив в сумму.' },
          { type: 'coding', description: 'Напишите функцию solution, возвращающую квадраты чисел массива.', initialCode: 'function solution(arr) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [[1, 2, 3]], expected: [1, 4, 9] }, { input: [[0, 5]], expected: [0, 25] }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution, суммирующую только положительные числа.', initialCode: 'function solution(arr) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [[1, -2, 3]], expected: 4 }, { input: [[-1, -2]], expected: 0 }, { input: [[5, 10]], expected: 15 }], precondition: '' }
        ]
      }
    ]
  },
  {
    id: 'module-4',
    title: 'Объекты и классы',
    description: 'Объекты, деструктуризация, классы',
    topics: [
      {
        id: 'objects',
        order: 16,
        title: 'Объекты (литералы, свойства, удаление)',
        theory: [
          { type: 'text', content: '## Создание объектов\n\nconst user = { name: "Анна", age: 25 };' },
          { type: 'code', content: 'const user = {\n  name: "Анна",\n  age: 25,\n  greet() {\n    console.log("Привет!");\n  }\n};\nuser.name;    // "Анна"\nuser["age"];  // 25\ndelete user.age;' },
          { type: 'text', content: '## Проверка свойств\n\n"name" in user\nuser.hasOwnProperty("name")' }
        ],
        tasks: [
          { type: 'quiz', question: 'Как получить свойство объекта?', options: ['obj.prop', 'obj["prop"]', 'Оба варианта', 'Ни один'], correct: [2], explanation: 'Можно использовать оба способа.' },
          { type: 'quiz', question: 'Что делает delete obj.prop?', options: ['Удаляет свойство', 'Удаляет объект', 'Возвращает undefined', 'Ничего'], correct: [0], explanation: 'delete удаляет свойство из объекта.' },
          { type: 'quiz', question: 'Что вернет "prop" in obj?', options: ['true/false', 'undefined', 'Значение свойства', 'Ошибка'], correct: [0], explanation: 'in проверяет наличие свойства.' },
          { type: 'coding', description: 'Напишите функцию solution(name, age), возвращающую объект.', initialCode: 'function solution(name, age) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: ['Анна', 25], expected: { name: 'Анна', age: 25 } }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution(obj, key), возвращающую значение свойства.', initialCode: 'function solution(obj, key) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [{ a: 1 }, 'a'], expected: 1 }, { input: [{ b: 2 }, 'c'], expected: undefined }], precondition: '' }
        ]
      },
      {
        id: 'object-keys',
        order: 17,
        title: 'Ключи объектов, Object.keys/values/entries',
        theory: [
          { type: 'text', content: '## Object.keys(obj)\n\nВозвращает массив ключей.' },
          { type: 'code', content: 'const obj = { a: 1, b: 2 };\nObject.keys(obj);    // ["a", "b"]\nObject.values(obj);  // [1, 2]\nObject.entries(obj); // [["a", 1], ["b", 2]]' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что вернет Object.keys({ a: 1, b: 2 })?', options: ['["a", "b"]', '[1, 2]', '{ a: 1, b: 2 }', 'undefined'], correct: [0], explanation: 'Object.keys возвращает массив ключей.' },
          { type: 'quiz', question: 'Что вернет Object.values({ a: 1 })?', options: ['["a"]', '[1]', '{ a: 1 }', 'undefined'], correct: [1], explanation: 'Object.values возвращает массив значений.' },
          { type: 'quiz', question: 'Что вернет Object.entries({ a: 1 })?', options: ['["a", 1]', '[["a", 1]]', '{ a: 1 }', 'undefined'], correct: [1], explanation: 'Object.entries возвращает массив пар [ключ, значение].' },
          { type: 'coding', description: 'Напишите функцию solution, возвращающую количество ключей объекта.', initialCode: 'function solution(obj) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [{ a: 1, b: 2 }], expected: 2 }, { input: [{}], expected: 0 }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution, суммирующую числовые значения объекта.', initialCode: 'function solution(obj) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [{ a: 1, b: 2, c: 3 }], expected: 6 }, { input: [{ x: 10 }], expected: 10 }], precondition: '' }
        ]
      },
      {
        id: 'destructuring',
        order: 18,
        title: 'Деструктуризация (массивов и объектов)',
        theory: [
          { type: 'text', content: '## Деструктуризация массивов\n\nconst [a, b] = [1, 2];' },
          { type: 'code', content: 'const [first, second] = [1, 2, 3];\nconst [x, y = 0] = [1]; // y = 0 по умолчанию' },
          { type: 'text', content: '## Деструктуризация объектов\n\nconst { name, age } = user;' },
          { type: 'code', content: 'const { name, age: years } = { name: "Анна", age: 25 };\n// name = "Анна", years = 25' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что вернет: const [a, b] = [1, 2]; a?', options: ['1', '2', 'undefined', 'Ошибка'], correct: [0], explanation: 'Деструктуризация присваивает первый элемент в a.' },
          { type: 'quiz', question: 'Что вернет: const { x } = { x: 1 }; x?', options: ['1', '{ x: 1 }', 'undefined', 'Ошибка'], correct: [0], explanation: 'Деструктуризация объекта извлекает свойство.' },
          { type: 'quiz', question: 'Как переименовать свойство при деструктуризации?', options: ['{ a: b }', '{ b: a }', 'Оба', 'Никак'], correct: [0], explanation: '{ oldName: newName } переименовывает свойство.' },
          { type: 'coding', description: 'Напишите функцию solution, меняющую местами два значения через деструктуризацию.', initialCode: 'function solution(a, b) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [1, 2], expected: [2, 1] }, { input: ['x', 'y'], expected: ['y', 'x'] }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution, принимающую { name, age, city } и возвращающую строку.', initialCode: 'function solution({ name, age, city }) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [{ name: 'Анна', age: 25, city: 'Москва' }], expected: 'Анна, 25, Москва' }], precondition: '' }
        ]
      },
      {
        id: 'spread-rest',
        order: 19,
        title: 'Spread и Rest операторы',
        theory: [
          { type: 'text', content: '## Spread (...)\n\nРаспаковывает итерируемый объект.' },
          { type: 'code', content: 'const arr1 = [1, 2];\nconst arr2 = [...arr1, 3, 4];\n// [1, 2, 3, 4]\n\nconst obj1 = { a: 1 };\nconst obj2 = { ...obj1, b: 2 };' },
          { type: 'text', content: '## Rest (...)\n\nСобирает элементы в массив/объект.' },
          { type: 'code', content: 'function sum(...numbers) {\n  return numbers.reduce((a, b) => a + b, 0);\n}\n\nconst { a, ...rest } = { a: 1, b: 2, c: 3 };' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что вернет: const arr = [1, ...[2, 3], 4]; arr?', options: ['[1, 2, 3, 4]', '[1, [2, 3], 4]', '[1, 2, 3]', 'Ошибка'], correct: [0], explanation: 'Spread распаковывает массив.' },
          { type: 'quiz', question: 'Что делает Rest в функции?', options: ['Собирает аргументы в массив', 'Распаковывает аргументы', 'Удаляет аргументы', 'Ничего'], correct: [0], explanation: 'Rest (...args) собирает аргументы в массив.' },
          { type: 'quiz', question: 'Что вернет: { ...{ a: 1 }, b: 2 }?', options: ['{ a: 1, b: 2 }', '{ b: 2 }', '{ a: 1 }', 'Ошибка'], correct: [0], explanation: 'Spread копирует свойства объекта.' },
          { type: 'coding', description: 'Напишите функцию solution, объединяющую два массива через spread.', initialCode: 'function solution(arr1, arr2) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [[1, 2], [3, 4]], expected: [1, 2, 3, 4] }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution, возвращающую массив без первого элемента через rest.', initialCode: 'function solution([first, ...rest]) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [[1, 2, 3]], expected: [2, 3] }, { input: [['a', 'b']], expected: ['b'] }], precondition: '' }
        ]
      },
      {
        id: 'classes',
        order: 20,
        title: 'Классы (Конструктор, методы, наследование)',
        theory: [
          { type: 'text', content: '## Классы\n\nclass User { constructor(name) { this.name = name; } }' },
          { type: 'code', content: 'class User {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    console.log(`Привет, ${this.name}!`);\n  }\n}' },
          { type: 'text', content: '## Наследование\n\nclass Admin extends User { ... }' },
          { type: 'code', content: 'class Admin extends User {\n  constructor(name, role) {\n    super(name);\n    this.role = role;\n  }\n}' }
        ],
        tasks: [
          { type: 'quiz', question: 'Как создать экземпляр класса?', options: ['new ClassName()', 'ClassName()', 'create ClassName', 'Оба первых'], correct: [0], explanation: 'new создает экземпляр класса.' },
          { type: 'quiz', question: 'Что делает super() в конструкторе?', options: ['Вызывает конструктор родителя', 'Создает суперкласс', 'Удаляет объект', 'Ничего'], correct: [0], explanation: 'super() вызывает конструктор родительского класса.' },
          { type: 'quiz', question: 'Как объявить метод класса?', options: ['methodName() {}', 'function methodName() {}', 'const methodName = () => {}', 'Оба первых'], correct: [0], explanation: 'Методы объявляются как methodName() {}' },
          { type: 'coding', description: 'Напишите класс solution с конструктором(width, height) и методом area().', initialCode: 'class solution {\n  constructor(width, height) {\n    // Ваш код\n  }\n}', functionName: 'solution', testCases: [{ input: [5, 10], expected: 50 }], precondition: 'const r = new Rectangle(5, 10); const result = r.area();' },
          { type: 'coding', description: 'Напишите класс solution, наследующий от Shape, с методом area().', initialCode: 'class solution { constructor() {} }\nclass Circle extends Shape {\n  constructor(radius) {\n    // Ваш код\n  }\n}', functionName: 'solution', testCases: [{ input: [5], expected: 78.54 }], precondition: 'const c = new Circle(5); const result = Math.round(c.area() * 100) / 100;' }
        ]
      }
    ]
  },
  {
    id: 'module-5',
    title: 'Асинхронность и DOM',
    description: 'Замыкания, промисы, async/await, DOM',
    topics: [
      {
        id: 'closures',
        order: 21,
        title: 'Замыкания (Closures) и область видимости',
        theory: [
          { type: 'text', content: '## Замыкание\n\nФункция, запоминающая свое лексическое окружение.' },
          { type: 'code', content: 'function outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    return count;\n  };\n}\nconst counter = outer();\ncounter(); // 1\ncounter(); // 2' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что запоминает замыкание?', options: ['Свое окружение', 'Глобальные переменные', 'Аргументы', 'Ничего'], correct: [0], explanation: 'Замыкание запоминает лексическое окружение.' },
          { type: 'quiz', question: 'Можно ли изменить переменную замыкания?', options: ['Да', 'Нет', 'Только const', 'Только let'], correct: [0], explanation: 'Можно изменять переменные, если они не const.' },
          { type: 'quiz', question: 'Когда создается замыкание?', options: ['При объявлении функции', 'При вызове функции', 'При возврате функции', 'Всегда'], correct: [0], explanation: 'Замыкание создается при объявлении функции.' },
          { type: 'coding', description: 'Напишите функцию solution(multiplier), возвращающую функцию умножения.', initialCode: 'function solution(multiplier) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [2], expected: 10 }, { input: [3], expected: 15 }], precondition: 'const fn = createMultiplier(2); const result = fn(5);' },
          { type: 'coding', description: 'Напишите функцию solution, возвращающую объект с методами increment и getCount.', initialCode: 'function solution() {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [], expected: 3 }], precondition: 'const c = createCounter(); c.increment(); c.increment(); c.increment(); const result = c.getCount();' }
        ]
      },
      {
        id: 'callbacks-eventloop',
        order: 22,
        title: 'Колбэки и Event Loop (базово)',
        theory: [
          { type: 'text', content: '## Колбэки\n\nФункции, передаваемые как аргументы.' },
          { type: 'code', content: 'function fetchData(callback) {\n  setTimeout(() => {\n    callback("данные");\n  }, 1000);\n}' },
          { type: 'text', content: '## Event Loop\n\nJavaScript однопоточный. Асинхронные операции обрабатываются через очередь.' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что такое колбэк?', options: ['Функция как аргумент', 'Возврат из функции', 'Глобальная функция', 'Метод объекта'], correct: [0], explanation: 'Колбэк — функция, передаваемая как аргумент.' },
          { type: 'quiz', question: 'Однопоточный ли JavaScript?', options: ['Да', 'Нет', 'Зависит от браузера', 'Только в Node.js'], correct: [0], explanation: 'JavaScript однопоточный.' },
          { type: 'quiz', question: 'Что делает setTimeout?', options: ['Откладывает выполнение', 'Останавливает код', 'Ускоряет код', 'Ничего'], correct: [0], explanation: 'setTimeout откладывает выполнение функции.' },
          { type: 'coding', description: 'Напишите функцию solution(fn, ms), вызывающую fn через ms мс.', initialCode: 'function solution(fn, ms) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [], expected: 'called' }], precondition: 'let result; delayCall(() => { result = "called"; }, 10); await new Promise(r => setTimeout(r, 50));' },
          { type: 'coding', description: 'Напишите функцию solution(fn, times), вызывающую fn times раз.', initialCode: 'function solution(fn, times) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [], expected: 3 }], precondition: 'let count = 0; repeatCall(() => count++, 3);' }
        ]
      },
      {
        id: 'promises',
        order: 23,
        title: 'Промисы (Promise, then/catch/finally)',
        theory: [
          { type: 'text', content: '## Promise\n\nОбъект, представляющий результат асинхронной операции.' },
          { type: 'code', content: 'const promise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve("успех"), 1000);\n});\n\npromise.then(result => console.log(result));' },
          { type: 'text', content: '## Цепочки\n\npromise.then(...).then(...).catch(...)' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что возвращает Promise?', options: ['Результат асинхронной операции', 'Синхронный результат', 'undefined', 'Ошибка'], correct: [0], explanation: 'Promise представляет результат асинхронной операции.' },
          { type: 'quiz', question: 'Что делает .then()?', options: ['Обрабатывает успех', 'Обрабатывает ошибку', 'Отменяет промис', 'Ничего'], correct: [0], explanation: '.then() обрабатывает успешное выполнение.' },
          { type: 'quiz', question: 'Что делает .catch()?', options: ['Обрабатывает успех', 'Обрабатывает ошибку', 'Отменяет промис', 'Ничего'], correct: [1], explanation: '.catch() обрабатывает ошибки.' },
          { type: 'coding', description: 'Напишите функцию solution(value, delay), возвращающую Promise.', initialCode: 'function solution(value, delay) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: ['test', 10], expected: 'test' }], precondition: 'const result = await createPromise("test", 10);' },
          { type: 'coding', description: 'Напишите функцию solution, создающую цепочку из 3 then.', initialCode: 'function solution() {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [], expected: 6 }], precondition: 'const result = await promiseChain();' }
        ]
      },
      {
        id: 'async-await',
        order: 24,
        title: 'Async/Await',
        theory: [
          { type: 'text', content: '## async/await\n\nСинтаксический сахар над Promise.' },
          { type: 'code', content: 'async function fetchData() {\n  const response = await fetch("/api");\n  const data = await response.json();\n  return data;\n}' },
          { type: 'text', content: '## Обработка ошибок\n\ntry { await ... } catch (e) { ... }' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что возвращает async функция?', options: ['Promise', 'Значение', 'undefined', 'Ошибка'], correct: [0], explanation: 'async функция всегда возвращает Promise.' },
          { type: 'quiz', question: 'Что делает await?', options: ['Ждет Promise', 'Отменяет Promise', 'Создает Promise', 'Ничего'], correct: [0], explanation: 'await ждет разрешения Promise.' },
          { type: 'quiz', question: 'Где можно использовать await?', options: ['В async функции', 'Везде', 'Только в then', 'Только в catch'], correct: [0], explanation: 'await можно использовать только внутри async функции.' },
          { type: 'coding', description: 'Напишите async функцию solution(ms), возвращающую Promise.', initialCode: 'async function solution(ms) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: [10], expected: true }], precondition: 'const start = Date.now(); await delay(10); const result = (Date.now() - start) >= 10;' },
          { type: 'coding', description: 'Напишите async функцию solution(url), использующую await.', initialCode: 'async function solution(url) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: ['test'], expected: 'data' }], precondition: '' }
        ]
      },
      {
        id: 'dom-basics',
        order: 25,
        title: 'Основы DOM (querySelector, обработчики событий)',
        theory: [
          { type: 'text', content: '## Поиск элементов\n\ndocument.querySelector(".class")\ndocument.getElementById("id")' },
          { type: 'code', content: 'const btn = document.querySelector(".btn");\nbtn.textContent = "Новый текст";\nbtn.classList.add("active");' },
          { type: 'text', content: '## Обработчики событий\n\nelement.addEventListener("click", handler);' },
          { type: 'code', content: 'btn.addEventListener("click", (e) => {\n  console.log("Клик!", e.target);\n});' }
        ],
        tasks: [
          { type: 'quiz', question: 'Что возвращает querySelector?', options: ['Первый элемент', 'Все элементы', 'Массив', 'null'], correct: [0], explanation: 'querySelector возвращает первый найденный элемент.' },
          { type: 'quiz', question: 'Как добавить обработчик клика?', options: ['addEventListener', 'onclick =', 'Оба', 'Никак'], correct: [2], explanation: 'Можно использовать оба способа.' },
          { type: 'quiz', question: 'Как изменить текст элемента?', options: ['textContent', 'innerText', 'Оба', 'Никак'], correct: [2], explanation: 'Можно использовать оба свойства.' },
          { type: 'coding', description: 'Напишите функцию solution(elementId, handler), добавляющую обработчик.', initialCode: 'function solution(elementId, handler) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: ['btn', () => {}], expected: true }], precondition: '' },
          { type: 'coding', description: 'Напишите функцию solution(elementId, className), переключающую класс.', initialCode: 'function solution(elementId, className) {\n  // Ваш код\n}', functionName: 'solution', testCases: [{ input: ['el', 'active'], expected: true }], precondition: '' }
        ]
      }
    ]
  }
];
