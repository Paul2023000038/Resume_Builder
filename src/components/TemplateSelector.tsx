import React from 'react';
import { useResume } from '../context/ResumeContext';
import { LayoutTemplate } from 'lucide-react';

const TemplateSelector: React.FC = () => {
  const { selectedTemplate, setSelectedTemplate } = useResume();

  return (
    <div className="mb-6">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <LayoutTemplate size={16} />
        Template Style
      </label>
      <select
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value as any)}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="modern">Modern</option>
        <option value="classic">Classic</option>
        <option value="minimal">Minimal</option>
      </select>
    </div>
  );
};

export default TemplateSelector;