import React, { useRef } from 'react';
import { useResume } from '../context/ResumeContext';
import { Download } from 'lucide-react';
import { exportToPdf } from '../utils/pdfExport';

const ResumeBuilder = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExport = () => {
    if (previewRef.current) {
      exportToPdf(previewRef.current, 'my-resume');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-6">Resume Builder</h1>
          
          {/* Simple form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={resumeData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Professional Summary
              </label>
              <textarea
                value={resumeData.personalInfo.summary}
                onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Brief professional summary..."
              />
            </div>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </button>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          <div ref={previewRef} className="bg-white p-6">
            <h1 className="text-2xl font-bold mb-4">{resumeData.personalInfo.fullName}</h1>
            <div className="prose">
              <p>{resumeData.personalInfo.summary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;