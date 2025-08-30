import React from 'react';
import { fetchProjects } from '../api';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

const ProjectsDirectory = () => {
  const { t } = useTranslation();

  // Dummy data for filters
  const statuses = [
    { value: '', label: t('allStatuses') },
    { value: 'upcoming', label: t('upcoming') },
    { value: 'active', label: t('active') },
    { value: 'completed', label: t('completed') },
  ];

  const categories = [
    { value: '', label: t('allCategories') },
    { value: 'infrastructure', label: t('infrastructure') },
    { value: 'sanitation', label: t('sanitation') },
    { value: 'transport', label: t('transport') },
  ];

  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');

  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const responseData = await fetchProjects();
        if (isMounted) {
          const projectsArray = Array.isArray(responseData) ? responseData : responseData.data;
          setProjects(projectsArray || []);
        }
      } catch (e) {
        if (isMounted) setError(t('failedToLoadProjects') || 'Failed to load projects');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, [t]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === '' || project.status === selectedStatus;
    const matchesCategory = selectedCategory === '' || project.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const ProjectCard = ({ project }) => (
    <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6 flex flex-col">
      <h3 className="text-xl font-semibold text-text mb-2">{project.name}</h3>
      <p className="text-sm text-lightText mb-4">{t('department')}: {t(project.department)}</p>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-lightText mb-1">
          <span>{t('progress')}</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between text-sm text-lightText mb-4">
        <span>{t('fundsUsed')}: ₹{project.fundsUsed}M</span>
        <span>{t('totalFunds')}: ₹{project.totalFunds}M</span>
      </div>

      <div className="flex items-center mb-4">
        <span className="text-sm font-medium text-lightText mr-2">{t('transparency')}:</span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-secondary/20 text-secondary">
          {project.transparencyScore}%
        </span>
      </div>

      <button className="mt-auto bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary/90 transition duration-300">
        {t('viewDetails')}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-text mb-6">{t('projectsDirectory')}</h1>
        
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lightText w-5 h-5" />
            <input
              type="text"
              placeholder={t('searchProjects')}
              className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:ring-primary focus:border-primary bg-background text-text placeholder-lightText"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-text mb-1">
                {t('status')}
              </label>
              <select
                id="status-filter"
                className="w-full p-2 border border-gray-600 rounded-lg focus:ring-primary focus:border-primary bg-background text-text"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value} className="bg-gray-800 text-text">{status.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="category-filter" className="block text-sm font-medium text-text mb-1">
                {t('category')}
              </label>
              <select
                id="category-filter"
                className="w-full p-2 border border-gray-600 rounded-lg focus:ring-primary focus:border-primary bg-background text-text"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value} className="bg-gray-800 text-text">{category.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && (
            <p className="text-lightText col-span-full text-center">{t('loading')}</p>
          )}
          {error && !loading && (
            <p className="text-red-400 col-span-full text-center">{error}</p>
          )}
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <p className="text-lightText col-span-full text-center">{t('noProjectsFound')}</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectsDirectory;
