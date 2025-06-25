import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { PlusCircle, Trash2 } from 'lucide-react';
import FormSection from '../ui/FormSection';
import InputField from '../ui/InputField';
import TextareaField from '../ui/TextareaField';
import Button from '../ui/Button';

const EducationForm: React.FC = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateEducation(id, { [name]: value });
  };

  return (
    <FormSection title="Education">
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          List your educational background in reverse chronological order. Include relevant coursework, 
          academic achievements, or honors if they strengthen your candidacy.
        </p>
      </div>
      
      {education.map((edu, index) => (
        <div 
          key={edu.id} 
          className="p-6 mb-6 border border-gray-200 rounded-lg bg-white shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">Education #{index + 1}</h3>
            {education.length > 1 && (
              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label="Remove education"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Institution Name"
              name="institution"
              value={edu.institution}
              onChange={(e) => handleChange(edu.id, e)}
              placeholder="University of Technology"
            />
            <InputField
              label="Degree Type"
              name="degree"
              value={edu.degree}
              onChange={(e) => handleChange(edu.id, e)}
              placeholder="Bachelor of Science"
            />
            <InputField
              label="Field of Study / Major"
              name="fieldOfStudy"
              value={edu.fieldOfStudy}
              onChange={(e) => handleChange(edu.id, e)}
              placeholder="Computer Science"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Start Date"
                name="startDate"
                type="month"
                value={edu.startDate}
                onChange={(e) => handleChange(edu.id, e)}
              />
              <InputField
                label="Graduation Date"
                name="endDate"
                type="month"
                value={edu.endDate}
                onChange={(e) => handleChange(edu.id, e)}
              />
            </div>
          </div>
          
          <div className="mt-4">
            <TextareaField
              label="Additional Details (Optional)"
              name="description"
              value={edu.description}
              onChange={(e) => handleChange(edu.id, e)}
              placeholder="Include relevant coursework, academic achievements, honors, GPA (if 3.5+), thesis topic, or other notable accomplishments."
              rows={3}
            />
          </div>
        </div>
      ))}
      
      <Button 
        type="button"
        onClick={addEducation}
        variant="outline"
        className="mt-2 w-full"
      >
        <PlusCircle size={16} className="mr-2" />
        Add Education
      </Button>
    </FormSection>
  );
};

export default EducationForm;