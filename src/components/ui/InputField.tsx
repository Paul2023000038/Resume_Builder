import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  name, 
  type = 'text',
  className = '',
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
      <input
        type={type}
        id={name}
        name={name}
        className={`w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
};

export default InputField;