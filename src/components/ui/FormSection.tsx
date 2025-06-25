import React, { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ title, subtitle, children, className = '' }) => {
  return (
    <div className={`${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        {subtitle && (
          <p className="text-gray-600 leading-relaxed">{subtitle}</p>
        )}
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default FormSection;