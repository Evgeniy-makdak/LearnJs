import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../types';

interface TheoryViewerProps {
  theory: ContentBlock[];
}

const TheoryViewer: React.FC<TheoryViewerProps> = ({ theory }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const renderContent = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="prose dark:prose-invert max-w-none"
          >
            {block.content.split('\n').map((paragraph, pIndex) => {
              // Простая обработка markdown-подобного синтаксиса
              let content = paragraph;
              
              // Заголовки
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={pIndex} className="text-2xl font-bold mt-6 mb-4 text-gray-900 dark:text-white">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              
              // Жирный текст
              content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
              content = content.replace(/`(.+?)`/g, '<code class="bg-gray-200 dark:bg-dark-border px-1 py-0.5 rounded text-sm">$1</code>');
              
              // Списки
              if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                return (
                  <li key={pIndex} className="ml-4 text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: content.substring(2) }} />
                );
              }

              // Пустые строки
              if (paragraph.trim() === '') {
                return <br key={pIndex} />;
              }

              return (
                <p
                  key={pIndex}
                  className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              );
            })}
          </motion.div>
        );

      case 'code':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="my-4 relative group"
          >
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => copyToClipboard(block.content, index)}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors"
              >
                {copiedIndex === index ? '✓ Скопировано' : '📋 Копировать'}
              </button>
            </div>
            <pre className="code-block text-sm overflow-x-auto">
              <code>{block.content}</code>
            </pre>
          </motion.div>
        );

      case 'warning':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="my-4 p-4 bg-yellow-500/10 border-l-4 border-yellow-500 rounded-r-lg"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div className="prose dark:prose-invert max-w-none">
                {block.content.split('\n').map((line, lIndex) => (
                  <p
                    key={lIndex}
                    className="text-yellow-700 dark:text-yellow-400 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: line
                        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/`(.+?)`/g, '<code class="bg-yellow-500/20 px-1 rounded">$1</code>')
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'image':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="my-4"
          >
            <img
              src={block.content}
              alt="Иллюстрация"
              className="max-w-full rounded-lg shadow-lg"
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {theory.map((block, index) => renderContent(block, index))}
    </div>
  );
};

export default TheoryViewer;
