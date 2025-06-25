import React from 'react';
import { useResume } from '../context/ResumeContext';
import { LayoutTemplate, Palette } from 'lucide-react';

const TemplateSelector: React.FC = () => {
  const { selectedTemplate, setSelectedTemplate } = useResume();

  const templates = [
    { 
      id: 'modern', 
      name: 'Modern', 
      description: 'Clean and contemporary design',
      preview: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    { 
      id: 'classic', 
      name: 'Classic', 
      description: 'Traditional professional layout',
      preview: 'bg-gradient-to-br from-gray-600 to-gray-700'
    },
    { 
      id: 'minimal', 
      name: 'Minimal', 
      description: 'Simple and elegant style',
      preview: 'bg-gradient-to-br from-green-500 to-green-600'
    },
  ];

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-gray-700">
        <Palette size={18} />
        <span className="font-medium">Template:</span>
      </div>
      <div className="flex gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template.id as any)}
            className={`relative group px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${template.preview}`}></div>
              <span className="font-medium text-sm">{template.name}</span>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              {template.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;