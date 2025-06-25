import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  icon?: React.ReactNode;
  helpText?: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  name, 
  type = 'text',
  className = '',
  icon,
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
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={name}
          name={name}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${className}`}
          {...props}
        />
      </div>
      {helpText && (
        <p className="text-xs text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

export default InputField;