import React, { createContext, useContext, useState, useEffect } from 'react';
import { ResumeData, ResumeTemplate } from '../types/resume';
import { generateUniqueId } from '../utils/helpers';

// Default resume data
const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
  },
  education: [
    {
      id: generateUniqueId(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
  experience: [
    {
      id: generateUniqueId(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      bullets: [''],
    },
  ],
  skills: [
    { id: generateUniqueId(), name: '', level: 'Intermediate' },
  ],
  projects: [
    {
      id: generateUniqueId(),
      name: '',
      description: '',
      technologies: [''],
      link: '',
    },
  ],
};

interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<ResumeData['skills'][0]>) => void;
  removeSkill: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (id: string) => void;
  addBulletToExperience: (experienceId: string) => void;
  updateBulletInExperience: (experienceId: string, index: number, value: string) => void;
  removeBulletFromExperience: (experienceId: string, index: number) => void;
  selectedTemplate: ResumeTemplate;
  setSelectedTemplate: (template: ResumeTemplate) => void;
  resetResumeData: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : defaultResumeData;
  });
  
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>('modern');

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  // Education methods
  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: generateUniqueId(),
          institution: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    }));
  };

  const updateEducation = (id: string, data: Partial<ResumeData['education'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, ...data } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }));
  };

  // Experience methods
  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: generateUniqueId(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
          bullets: [''],
        },
      ],
    }));
  };

  const updateExperience = (id: string, data: Partial<ResumeData['experience'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, ...data } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id),
    }));
  };

  // Bullets for experience
  const addBulletToExperience = (experienceId: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === experienceId 
          ? { ...exp, bullets: [...exp.bullets, ''] } 
          : exp
      ),
    }));
  };

  const updateBulletInExperience = (experienceId: string, index: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === experienceId 
          ? { 
              ...exp, 
              bullets: exp.bullets.map((bullet, i) => 
                i === index ? value : bullet
              ) 
            } 
          : exp
      ),
    }));
  };

  const removeBulletFromExperience = (experienceId: string, index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === experienceId 
          ? { 
              ...exp, 
              bullets: exp.bullets.filter((_, i) => i !== index) 
            } 
          : exp
      ),
    }));
  };

  // Skills methods
  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        { id: generateUniqueId(), name: '', level: 'Intermediate' },
      ],
    }));
  };

  const updateSkill = (id: string, data: Partial<ResumeData['skills'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, ...data } : skill
      ),
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id),
    }));
  };

  // Projects methods
  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: generateUniqueId(),
          name: '',
          description: '',
          technologies: [''],
          link: '',
        },
      ],
    }));
  };

  const updateProject = (id: string, data: Partial<ResumeData['projects'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, ...data } : project
      ),
    }));
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id),
    }));
  };

  // Reset function
  const resetResumeData = () => {
    if (window.confirm('Are you sure you want to reset all resume data? This cannot be undone.')) {
      setResumeData(defaultResumeData);
    }
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      updatePersonalInfo,
      addEducation,
      updateEducation,
      removeEducation,
      addExperience,
      updateExperience,
      removeExperience,
      addSkill,
      updateSkill,
      removeSkill,
      addProject,
      updateProject,
      removeProject,
      addBulletToExperience,
      updateBulletInExperience,
      removeBulletFromExperience,
      selectedTemplate,
      setSelectedTemplate,
      resetResumeData,
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};