import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import ProgressDashboard from './components/dashboard/ProgressDashboard';
import LessonPage from './components/lesson/LessonPage';
import AuthPage from './components/auth/AuthPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<AppLayout />}>
        <Route index element={<ProgressDashboard />} />
        <Route path="lesson/:id" element={<LessonPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
