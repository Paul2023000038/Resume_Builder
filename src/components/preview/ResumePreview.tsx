import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { formatDate } from '../../utils/helpers';

const ResumePreview: React.FC = () => {
  const { resumeData, selectedTemplate } = useResume();
  const { personalInfo, education, experience, skills, projects } = resumeData;

  const templateStyles = {
    modern: 'font-sans',
    classic: 'font-serif',
    minimal: 'font-sans',
  };

  return (
    <div className={`${templateStyles[selectedTemplate]} bg-white p-8`}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName}</h1>
        <div className="text-gray-600 mt-2 space-y-1">
          <p>{personalInfo.email} • {personalInfo.phone}</p>
          <p>{personalInfo.location}</p>
          {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
            <p>
              {personalInfo.linkedin && <span>LinkedIn • </span>}
              {personalInfo.github && <span>GitHub • </span>}
              {personalInfo.website && <span>Portfolio</span>}
            </p>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 mb-2">Professional Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 mb-2">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-800">{exp.position}</h3>
                <span className="text-gray-600 text-sm">
                  {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                </span>
              </div>
              <p className="text-gray-700 font-semibold">{exp.company}</p>
              {exp.description && <p className="text-gray-600 mt-1">{exp.description}</p>}
              {exp.bullets.length > 0 && (
                <ul className="list-disc list-inside mt-2">
                  {exp.bullets.map((bullet, index) => (
                    bullet && <li key={index} className="text-gray-700">{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 mb-2">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-800">{edu.institution}</h3>
                <span className="text-gray-600 text-sm">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
              <p className="text-gray-700">{edu.degree} in {edu.fieldOfStudy}</p>
              {edu.description && <p className="text-gray-600 mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              skill.name && (
                <span key={skill.id} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  {skill.name} {skill.level && `• ${skill.level}`}
                </span>
              )
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 mb-2">Projects</h2>
          {projects.map((project) => (
            project.name && (
              <div key={project.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-800">{project.name}</h3>
                  {project.link && (
                    <a href={project.link} className="text-blue-600 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
                      View Project
                    </a>
                  )}
                </div>
                {project.description && <p className="text-gray-600 mt-1">{project.description}</p>}
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, index) => (
                      tech && (
                        <span key={index} className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {tech}
                        </span>
                      )
                    ))}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumePreview