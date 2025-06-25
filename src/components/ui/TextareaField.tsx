import React from 'react';

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  helpText?: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({ 
  label, 
  name, 
  className = '',
  rows = 4,
  helpText,
  required,
  ...props
}) => {
  return (
    <div className="space-y-2">
      <label 
        htmlFor={name} 
        className="block text-sm font-semibold text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none ${className}`}
        {...props}
      />
      {helpText && (
        <p className="text-xs text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

export default TextareaField;