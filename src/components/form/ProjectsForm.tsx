import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { PlusCircle, Trash2 } from 'lucide-react';
import FormSection from '../ui/FormSection';
import InputField from '../ui/InputField';
import TextareaField from '../ui/TextareaField';
import Button from '../ui/Button';

const ProjectsForm: React.FC = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const { projects } = resumeData;

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateProject(id, { [name]: value });
  };

  const handleTechnologiesChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateProject(id, { 
      technologies: value.split(',').map(tech => tech.trim()).filter(tech => tech) 
    });
  };

  return (
    <FormSection title="Projects">
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showcase your personal projects, open-source contributions, or significant work projects. 
          Focus on projects that demonstrate relevant skills and technologies.
        </p>
      </div>
      
      {projects.map((project, index) => (
        <div 
          key={project.id} 
          className="p-6 mb-6 border border-gray-200 rounded-lg bg-white shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">Project #{index + 1}</h3>
            {projects.length > 1 && (
              <button
                type="button"
                onClick={() => removeProject(project.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label="Remove project"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Project Name"
              name="name"
              value={project.name}
              onChange={(e) => handleChange(project.id, e)}
              placeholder="E-commerce Platform"
            />
            <InputField
              label="Project Link (Optional)"
              name="link"
              value={project.link || ''}
              onChange={(e) => handleChange(project.id, e)}
              placeholder="https://github.com/username/project or https://project-demo.com"
            />
          </div>
          
          <div className="mt-4">
            <TextareaField
              label="Project Description"
              name="description"
              value={project.description}
              onChange={(e) => handleChange(project.id, e)}
              placeholder="Describe what the project does, your role in it, key features, and the impact or results achieved. Be specific about your contributions."
              rows={4}
            />
          </div>
          
          <div className="mt-4">
            <InputField
              label="Technologies Used"
              name="technologies"
              value={project.technologies.join(', ')}
              onChange={(e) => handleTechnologiesChange(project.id, e)}
              placeholder="React, Node.js, MongoDB, AWS, Docker (comma separated)"
            />
            <p className="text-xs text-gray-500 mt-1">
              List the main technologies, frameworks, and tools used in this project
            </p>
          </div>
        </div>
      ))}
      
      <Button 
        type="button"
        onClick={addProject}
        variant="outline"
        className="mt-2 w-full"
      >
        <PlusCircle size={16} className="mr-2" />
        Add Project
      </Button>
    </FormSection>
  );
};

export default ProjectsForm;