import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { PlusCircle, Trash2 } from 'lucide-react';
import FormSection from '../ui/FormSection';
import InputField from '../ui/InputField';
import Button from '../ui/Button';

const SkillsForm: React.FC = () => {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResume();
  const { skills } = resumeData;

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateSkill(id, { [name]: value });
  };

  return (
    <FormSection title="Skills">
      <div className="grid grid-cols-1 gap-4">
        {skills.map((skill, index) => (
          <div 
            key={skill.id}
            className="flex items-center gap-2"
          >
            <div className="flex-grow">
              <InputField
                label={index === 0 ? "Skill" : ""}
                name="name"
                value={skill.name}
                onChange={(e) => handleChange(skill.id, e)}
                placeholder="e.g., JavaScript, Project Management, etc."
              />
            </div>
            <div className="w-36">
              {index === 0 && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level
                </label>
              )}
              <select
                name="level"
                value={skill.level}
                onChange={(e) => handleChange(skill.id, e)}
                className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div className="flex items-end">
              {index === 0 ? (
                <div className="h-10"></div>
              ) : (
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="p-2 text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Remove skill"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <Button 
        type="button"
        onClick={addSkill}
        variant="outline"
        className="mt-4 w-full"
      >
        <PlusCircle size={16} className="mr-2" />
        Add Skill
      </Button>
    </FormSection>
  );
};

export default SkillsForm;