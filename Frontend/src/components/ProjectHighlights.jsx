import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    name: 'City Park Renovation',
    status: 'InProgress',
    progress: 65,
    description: 'City Park Renovation Description',
  },
  {
    id: 2,
    name: 'New Library Construction',
    status: 'Completed',
    progress: 100,
    description: 'New Library Construction Description',
  },
  {
    id: 3,
    name: 'Smart Streetlights',
    status: 'Planning',
    progress: 15,
    description: 'Smart Streetlights Description',
  },
];

const getStatusClass = (status) => {
  switch (status) {
    case 'InProgress':
      return 'bg-blue-500/20 text-blue-400';
    case 'Completed':
      return 'bg-green-500/20 text-green-400';
    case 'Planning':
      return 'bg-yellow-500/20 text-yellow-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

const ProjectHighlights = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-text mb-4">{t('Project Highlights')}</h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-text">{t(project.name)}</h3>
              <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusClass(project.status)}`}>
                {t(project.status)}
              </span>
            </div>
            <p className="text-sm text-lightText mb-3">{t(project.description)}</p>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
            </div>
            <div className="text-right text-xs text-lightText mt-1">{project.progress}%</div>
          </div>
        ))}
      </div>
       <div className="text-center mt-4">
        <Link to="/projects" className="text-primary hover:underline">{t('viewAllProjects')}</Link>
      </div>
    </div>
  );
};

export default ProjectHighlights;
