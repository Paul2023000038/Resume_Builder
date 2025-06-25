import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { useAuth } from './context/AuthContext';
import AuthForm from './components/auth/AuthForm';
import ResumeForm from './components/ResumeForm';
import LoadingSpinner from './components/layout/LoadingSpinner';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <ResumeProvider>
      <ResumeForm />
    </ResumeProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;