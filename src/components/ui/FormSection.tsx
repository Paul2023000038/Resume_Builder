import React, { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default FormSection;