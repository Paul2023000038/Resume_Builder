import React from 'react';

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({ 
  label, 
  name, 
  className = '',
  rows = 3,
  ...props
}) => {
  return (
    <div className="mb-2">
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className={`w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
};

export default TextareaField;