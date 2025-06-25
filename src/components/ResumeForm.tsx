import React, { useEffect, useState } from 'react';
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
import { Download, RotateCcw, Save, Eye, EyeOff, User, GraduationCap, Briefcase, Code, FolderOpen } from 'lucide-react';
import { exportToPdf } from '../utils/pdfExport';

const ResumeForm: React.FC = () => {
  const { resetResumeData, saveResumeData, loading } = useResume();
  const previewRef = React.useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User, color: 'bg-blue-500' },
    { id: 'experience', label: 'Experience', icon: Briefcase, color: 'bg-green-500' },
    { id: 'education', label: 'Education', icon: GraduationCap, color: 'bg-purple-500' },
    { id: 'skills', label: 'Skills', icon: Code, color: 'bg-orange-500' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, color: 'bg-pink-500' },
  ];

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

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'projects':
        return <ProjectsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Build Your Perfect Resume</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create a professional resume that stands out. Fill in your information step by step and watch your resume come to life.
          </p>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <TemplateSelector />
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="lg:hidden flex items-center"
              >
                {showPreview ? <EyeOff size={16} className="mr-2" /> : <Eye size={16} className="mr-2" />}
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
            </div>
            <div className="flex items-center gap-2">
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
                variant="outline"
                onClick={resetResumeData}
                className="flex items-center text-red-600 hover:text-red-700"
              >
                <RotateCcw size={16} className="mr-2" />
                Reset
              </Button>
              <Button
                onClick={handleExportPdf}
                className="flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <Download size={16} className="mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Sections</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isActive ? section.color : 'bg-gray-100'}`}>
                        <Icon size={16} className={isActive ? 'text-white' : 'text-gray-600'} />
                      </div>
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
              
              {/* Progress Indicator */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-500">3/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Complete all sections for best results</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {renderActiveSection()}
            </div>
          </div>

          {/* Preview Panel */}
          <div className={`lg:col-span-4 ${showPreview ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">Auto-updating</span>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="transform scale-75 origin-top-left" style={{ width: '133.33%', height: 'auto' }}>
                  <ResumePreview />
                </div>
              </div>
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