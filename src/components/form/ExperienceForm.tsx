import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { PlusCircle, Trash2, Plus, Minus } from 'lucide-react';
import FormSection from '../ui/FormSection';
import InputField from '../ui/InputField';
import TextareaField from '../ui/TextareaField';
import Button from '../ui/Button';

const ExperienceForm: React.FC = () => {
  const { 
    resumeData, 
    addExperience, 
    updateExperience, 
    removeExperience,
    addBulletToExperience,
    updateBulletInExperience,
    removeBulletFromExperience
  } = useResume();
  const { experience } = resumeData;

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateExperience(id, { [name]: value });
  };

  const handleBulletChange = (experienceId: string, index: number, value: string) => {
    updateBulletInExperience(experienceId, index, value);
  };

  return (
    <FormSection title="Work Experience">
      {experience.map((exp, index) => (
        <div 
          key={exp.id} 
          className="p-4 mb-4 border border-gray-200 rounded-lg bg-white shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">Experience #{index + 1}</h3>
            {experience.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperience(exp.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label="Remove experience"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Company"
              name="company"
              value={exp.company}
              onChange={(e) => handleChange(exp.id, e)}
              placeholder="Example Company Inc."
            />
            <InputField
              label="Position"
              name="position"
              value={exp.position}
              onChange={(e) => handleChange(exp.id, e)}
              placeholder="Software Engineer"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Start Date"
                name="startDate"
                type="month"
                value={exp.startDate}
                onChange={(e) => handleChange(exp.id, e)}
              />
              <InputField
                label="End Date"
                name="endDate"
                type="month"
                value={exp.endDate}
                onChange={(e) => handleChange(exp.id, e)}
                placeholder="Present (if current)"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <TextareaField
              label="Description"
              name="description"
              value={exp.description}
              onChange={(e) => handleChange(exp.id, e)}
              placeholder="Briefly describe your role and responsibilities"
              rows={2}
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Achievements / Responsibilities
            </label>
            
            {exp.bullets.map((bullet, bulletIndex) => (
              <div key={bulletIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => handleBulletChange(exp.id, bulletIndex, e.target.value)}
                  placeholder="Describe an achievement or responsibility"
                  className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeBulletFromExperience(exp.id, bulletIndex)}
                  disabled={exp.bullets.length <= 1}
                  className={`ml-2 p-1 rounded-full ${
                    exp.bullets.length <= 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-red-500 hover:text-red-700'
                  }`}
                  aria-label="Remove bullet point"
                >
                  <Minus size={16} />
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => addBulletToExperience(exp.id)}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-2 text-sm"
            >
              <Plus size={16} className="mr-1" /> Add bullet point
            </button>
          </div>
        </div>
      ))}
      
      <Button 
        type="button"
        onClick={addExperience}
        variant="outline"
        className="mt-2 w-full"
      >
        <PlusCircle size={16} className="mr-2" />
        Add Experience
      </Button>
    </FormSection>
  );
};

export default ExperienceForm;