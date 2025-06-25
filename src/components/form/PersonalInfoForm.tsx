import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { PersonalInfo } from '../../types/resume';
import FormSection from '../ui/FormSection';
import InputField from '../ui/InputField';
import TextareaField from '../ui/TextareaField';

const PersonalInfoForm: React.FC = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value } as Partial<PersonalInfo>);
  };

  return (
    <FormSection title="Personal Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Full Name"
          name="fullName"
          value={personalInfo.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={personalInfo.email}
          onChange={handleChange}
          placeholder="john.doe@example.com"
          required
        />
        <InputField
          label="Phone"
          name="phone"
          value={personalInfo.phone}
          onChange={handleChange}
          placeholder="(123) 456-7890"
        />
        <InputField
          label="Location"
          name="location"
          value={personalInfo.location}
          onChange={handleChange}
          placeholder="City, State"
        />
        <InputField
          label="LinkedIn"
          name="linkedin"
          value={personalInfo.linkedin || ''}
          onChange={handleChange}
          placeholder="linkedin.com/in/johndoe"
        />
        <InputField
          label="GitHub"
          name="github"
          value={personalInfo.github || ''}
          onChange={handleChange}
          placeholder="github.com/johndoe"
        />
        <InputField
          label="Website"
          name="website"
          value={personalInfo.website || ''}
          onChange={handleChange}
          placeholder="johndoe.com"
        />
      </div>
      <div className="mt-4">
        <TextareaField
          label="Professional Summary"
          name="summary"
          value={personalInfo.summary}
          onChange={handleChange}
          placeholder="Write a brief summary of your professional background and key qualifications..."
          rows={4}
        />
      </div>
    </FormSection>
  );
};

export default PersonalInfoForm;