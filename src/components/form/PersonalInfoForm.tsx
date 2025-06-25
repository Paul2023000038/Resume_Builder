import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { PersonalInfo } from '../../types/resume';
import FormSection from '../ui/FormSection';
import InputField from '../ui/InputField';
import TextareaField from '../ui/TextareaField';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

const PersonalInfoForm: React.FC = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value } as Partial<PersonalInfo>);
  };

  return (
    <FormSection 
      title="Personal Information" 
      subtitle="Let's start with your basic information. This will appear at the top of your resume."
    >
      {/* Name - Full Width */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <InputField
          label="Full Name"
          name="fullName"
          value={personalInfo.fullName}
          onChange={handleChange}
          placeholder="John Smith"
          required
          icon={<User size={18} />}
          className="text-lg font-medium"
        />
      </div>

      {/* Contact Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={personalInfo.email}
          onChange={handleChange}
          placeholder="john.smith@email.com"
          required
          icon={<Mail size={18} />}
        />
        <InputField
          label="Phone Number"
          name="phone"
          value={personalInfo.phone}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
          icon={<Phone size={18} />}
        />
      </div>

      {/* Location */}
      <InputField
        label="Location"
        name="location"
        value={personalInfo.location}
        onChange={handleChange}
        placeholder="New York, NY"
        icon={<MapPin size={18} />}
      />

      {/* Online Presence */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          Online Presence
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="LinkedIn Profile"
            name="linkedin"
            value={personalInfo.linkedin || ''}
            onChange={handleChange}
            placeholder="linkedin.com/in/johnsmith"
            icon={<Linkedin size={18} />}
          />
          <InputField
            label="GitHub Profile"
            name="github"
            value={personalInfo.github || ''}
            onChange={handleChange}
            placeholder="github.com/johnsmith"
            icon={<Github size={18} />}
          />
        </div>
        <InputField
          label="Portfolio Website"
          name="website"
          value={personalInfo.website || ''}
          onChange={handleChange}
          placeholder="www.johnsmith.com"
          icon={<Globe size={18} />}
        />
      </div>

      {/* Professional Summary */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Professional Summary</h3>
          <p className="text-sm text-gray-600 mb-4">
            Write a compelling 3-4 sentence summary that highlights your key qualifications, experience, and career objectives. 
            This is your elevator pitch to potential employers.
          </p>
        </div>
        <TextareaField
          label="Summary"
          name="summary"
          value={personalInfo.summary}
          onChange={handleChange}
          placeholder="Experienced software engineer with 5+ years developing scalable web applications. Proven track record of leading cross-functional teams and delivering high-quality solutions. Passionate about clean code, user experience, and continuous learning."
          rows={6}
          className="text-base leading-relaxed"
        />
        <div className="text-right">
          <span className={`text-sm ${personalInfo.summary.length > 500 ? 'text-red-500' : 'text-gray-500'}`}>
            {personalInfo.summary.length}/500 characters
          </span>
        </div>
      </div>
    </FormSection>
  );
};

export default PersonalInfoForm;