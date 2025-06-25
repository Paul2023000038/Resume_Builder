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
    <div className={`${templateStyles[selectedTemplate]} bg-white p-8 max-w-4xl mx-auto`}>
      {/* Header Section */}
      <div className="text-center mb-8 border-b-2 border-gray-800 pb-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-gray-700 space-y-1">
          <div className="flex justify-center items-center space-x-4 text-sm">
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.email && <span>•</span>}
            {personalInfo.email && <span>{personalInfo.email}</span>}
          </div>
          {personalInfo.location && (
            <p className="text-sm">{personalInfo.location}</p>
          )}
          <div className="flex justify-center items-center space-x-4 text-sm">
            {personalInfo.linkedin && (
              <span>LinkedIn: {personalInfo.linkedin}</span>
            )}
            {personalInfo.github && personalInfo.linkedin && <span>•</span>}
            {personalInfo.github && (
              <span>GitHub: {personalInfo.github}</span>
            )}
            {personalInfo.website && (personalInfo.linkedin || personalInfo.github) && <span>•</span>}
            {personalInfo.website && (
              <span>Portfolio: {personalInfo.website}</span>
            )}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Technical Skills */}
      {skills.length > 0 && skills.some(skill => skill.name) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {skills
              .filter(skill => skill.name)
              .reduce((acc, skill, index) => {
                const groupIndex = Math.floor(index / 3);
                if (!acc[groupIndex]) acc[groupIndex] = [];
                acc[groupIndex].push(skill);
                return acc;
              }, [] as typeof skills[])
              .map((skillGroup, groupIndex) => (
                <div key={groupIndex} className="flex flex-wrap">
                  {skillGroup.map((skill, index) => (
                    <span key={skill.id} className="text-gray-700">
                      <strong>{skill.name}</strong>
                      {skill.level && ` (${skill.level})`}
                      {index < skillGroup.length - 1 && ', '}
                      {index === skillGroup.length - 1 && groupIndex < Math.ceil(skills.filter(s => s.name).length / 3) - 1 && ''}
                    </span>
                  ))}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && experience.some(exp => exp.company || exp.position) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">
            Professional Experience
          </h2>
          {experience
            .filter(exp => exp.company || exp.position)
            .map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {exp.position || 'Position Title'}
                    </h3>
                    <p className="text-gray-700 font-semibold italic">
                      {exp.company || 'Company Name'}
                    </p>
                  </div>
                  <div className="text-right text-gray-600 text-sm">
                    <p>
                      {exp.startDate ? formatDate(exp.startDate) : 'Start Date'} - {' '}
                      {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </p>
                  </div>
                </div>
                
                {exp.description && (
                  <p className="text-gray-700 mb-2 text-justify leading-relaxed">
                    {exp.description}
                  </p>
                )}
                
                {exp.bullets.length > 0 && exp.bullets.some(bullet => bullet.trim()) && (
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    {exp.bullets
                      .filter(bullet => bullet.trim())
                      .map((bullet, index) => (
                        <li key={index} className="text-gray-700 leading-relaxed text-justify">
                          {bullet}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && projects.some(project => project.name) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">
            Projects
          </h2>
          {projects
            .filter(project => project.name)
            .map((project) => (
              <div key={project.id} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800">
                    {project.name}
                  </h3>
                  {project.link && (
                    <a 
                      href={project.link} 
                      className="text-blue-600 text-sm hover:underline" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  )}
                </div>
                
                {project.description && (
                  <p className="text-gray-700 mb-2 text-justify leading-relaxed">
                    {project.description}
                  </p>
                )}
                
                {project.technologies.length > 0 && project.technologies.some(tech => tech.trim()) && (
                  <div className="mb-2">
                    <span className="font-semibold text-gray-800">Technologies: </span>
                    <span className="text-gray-700">
                      {project.technologies
                        .filter(tech => tech.trim())
                        .join(', ')}
                    </span>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && education.some(edu => edu.institution || edu.degree) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">
            Education
          </h2>
          {education
            .filter(edu => edu.institution || edu.degree)
            .map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {edu.degree || 'Degree'} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                    </h3>
                    <p className="text-gray-700 font-semibold italic">
                      {edu.institution || 'Institution Name'}
                    </p>
                  </div>
                  <div className="text-right text-gray-600 text-sm">
                    <p>
                      {edu.startDate ? formatDate(edu.startDate) : 'Start'} - {' '}
                      {edu.endDate ? formatDate(edu.endDate) : 'End'}
                    </p>
                  </div>
                </div>
                
                {edu.description && (
                  <p className="text-gray-700 text-justify leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ResumePreview;