import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const LiveMapView = () => {
  const { t } = useTranslation();

  // Project data with locations and statuses
  const projects = [
    {
      id: 1,
      name: 'Smart City Initiative',
      status: 'onTime',
      location: 'Central Delhi',
      progress: 75,
      budget: '₹50 Cr',
      department: 'Urban Development'
    },
    {
      id: 2,
      name: 'Clean Rivers Project',
      status: 'delayed',
      location: 'Yamuna Riverfront',
      progress: 45,
      budget: '₹30 Cr',
      department: 'Environment'
    },
    {
      id: 3,
      name: 'New School Construction',
      status: 'stalled',
      location: 'Gurgaon Sector 15',
      progress: 20,
      budget: '₹15 Cr',
      department: 'Education'
    },
    {
      id: 4,
      name: 'Public Transport Upgrade',
      status: 'onTime',
      location: 'Metro Line Extension',
      progress: 60,
      budget: '₹200 Cr',
      department: 'Transport'
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'onTime':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'delayed':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'stalled':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <MapPin className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'onTime':
        return 'bg-green-500';
      case 'delayed':
        return 'bg-orange-500';
      case 'stalled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-text mb-6">{t('liveMapView')}</h1>

        {/* Map Placeholder */}
        <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6 mb-6">
          <div className="bg-gray-700 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-gray-600">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text mb-2">Interactive Map</h3>
              <p className="text-lightText">Live project locations and status tracking</p>
              <p className="text-sm text-gray-400 mt-2">Map component temporarily disabled for stability</p>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  {getStatusIcon(project.status)}
                  <h3 className="text-lg font-semibold text-text ml-2">{project.name}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                  {t(project.status)}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-lightText">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{project.location}</span>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-lightText">Progress</span>
                    <span className="text-text font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getStatusColor(project.status)}`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-2 border-t border-gray-700">
                  <div>
                    <p className="text-xs text-lightText">Budget</p>
                    <p className="text-sm font-medium text-text">{project.budget}</p>
                  </div>
                  <div>
                    <p className="text-xs text-lightText">Department</p>
                    <p className="text-sm font-medium text-text">{project.department}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Status Legend */}
        <div className="mt-8 bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-text mb-4">Project Status Legend</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-text">{t('onTime')} - Projects proceeding as scheduled</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-orange-500 mr-2" />
              <span className="text-text">{t('delayed')} - Projects behind schedule</span>
            </div>
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-text">{t('stalled')} - Projects temporarily halted</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveMapView;
