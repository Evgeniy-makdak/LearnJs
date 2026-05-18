import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import ProgressDashboard from './components/dashboard/ProgressDashboard';
import LessonPage from './components/lesson/LessonPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<ProgressDashboard />} />
        <Route path="lesson/:id" element={<LessonPage />} />
        <Route path="*" element={<ProgressDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
