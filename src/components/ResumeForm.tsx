import React, { useEffect } from 'react';
import PersonalInfoForm from './form/PersonalInfoForm';
import EducationForm from './form/EducationForm';
import ExperienceForm from './form/ExperienceForm';
import SkillsForm from './form/SkillsForm';
import ProjectsForm from './form/ProjectsForm';
import TemplateSelector from './TemplateSelector';
import ResumePreview from './preview/ResumePreview';
import Header from './layout/Header';
import { useResume } from '../context/ResumeContext';
import Button from './ui/Button';
import { Download, RotateCcw, Save } from 'lucide-react';
import { exportToPdf } from '../utils/pdfExport';

const ResumeForm: React.FC = () => {
  const { resetResumeData, saveResumeData, loading } = useResume();
  const previewRef = React.useRef<HTMLDivElement>(null);

  const handleExportPdf = () => {
    if (previewRef.current) {
      exportToPdf(previewRef.current, 'my-resume');
    }
  };

  const handleSave = async () => {
    try {
      await saveResumeData();
      // You could add a toast notification here
      alert('Resume saved successfully!');
    } catch (error) {
      alert('Failed to save resume. Please try again.');
    }
  };

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveResumeData().catch(console.error);
    }, 30000);

    return () => clearInterval(interval);
  }, [saveResumeData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-[1400px] mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Build Your Resume</h2>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={loading}
                className="flex items-center"
              >
                <Save size={16} className="mr-2" />
                {loading ? 'Saving...' : 'Save'}
              </Button>
              <Button
                variant="danger"
                onClick={resetResumeData}
                className="flex items-center"
              >
                <RotateCcw size={16} className="mr-2" />
                Reset
              </Button>
              <Button
                onClick={handleExportPdf}
                className="flex items-center"
              >
                <Download size={16} className="mr-2" />
                Export PDF
              </Button>
            </div>
          </div>

          <TemplateSelector />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <PersonalInfoForm />
              <EducationForm />
              <ExperienceForm />
              <SkillsForm />
              <ProjectsForm />
            </div>

            <div className="hidden lg:block sticky top-8 h-fit">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <ResumePreview />
              </div>
            </div>
          </div>

          {/* Hidden div for PDF export */}
          <div className="hidden">
            <div ref={previewRef} className="w-[8.5in] bg-white p-8">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;