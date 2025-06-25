import React from 'react';
import { ResumeProvider } from './context/ResumeContext';
import ResumeForm from './components/ResumeForm';

function App() {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <ResumeForm />
      </div>
    </ResumeProvider>
  );
}

export default App;