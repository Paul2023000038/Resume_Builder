import React from 'react';
import PersonalInfoForm from './form/PersonalInfoForm';
import EducationForm from './form/EducationForm';
import ExperienceForm from './form/ExperienceForm';
import SkillsForm from './form/SkillsForm';
import ProjectsForm from './form/ProjectsForm';
import TemplateSelector from './TemplateSelector';
import ResumePreview from './preview/ResumePreview';
import { useResume } from '../context/ResumeContext';
import Button from './ui/Button';
import { Download, RotateCcw } from 'lucide-react';
import { exportToPdf } from '../utils/pdfExport';

const ResumeForm: React.FC = () => {
  const { resetResumeData } = useResume();
  const previewRef = React.useRef<HTMLDivElement>(null);

  const handleExportPdf = () => {
    if (previewRef.current) {
      exportToPdf(previewRef.current, 'my-resume');
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Resume Builder</h1>
          <div className="flex space-x-2">
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
  );
};

export default ResumeForm;