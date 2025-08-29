import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { DollarSign, Package, CalendarDays, Contact, FileText, MapPin, CheckCircle, Clock, ShieldCheck } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import LazyLoad from 'react-lazyload';

// Fix for default icon issues with Leaflet and Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: `https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png`,
  iconUrl: `https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png`,
  shadowUrl: `https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png`,
});

const ProjectDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams(); // Get project ID from URL

  // Dummy project data (will be fetched from backend later)
  const project = {
    id: 1,
    name: 'Smart City Initiative',
    department: 'urban',
    status: 'active',
    category: 'infrastructure',
    description: "A comprehensive initiative to transform urban areas into sustainable, citizen-friendly smart cities through advanced technology and efficient resource management.",
    progress: 75,
    fundsUsed: 7.5,
    totalFunds: 10,
    suppliesUsed: 1500,
    suppliesAvailable: 2000,
    transparencyScore: 90,
    milestones: [
      { name: 'Phase 1: Planning & Design', date: '2023-01-15', completed: true },
      { name: 'Phase 2: Infrastructure Development', date: '2023-08-01', completed: true },
      { name: 'Phase 3: Technology Integration', date: '2024-03-10', completed: false },
      { name: 'Phase 4: Public Adoption', date: '2024-12-01', completed: false },
    ],
    contactInfo: {
      name: 'Urban Development Dept.',
      email: 'urban@govconnect.com',
      phone: '+91 1234567890',
    },
    documents: [
      { name: 'Project Blueprint V1', link: '#' },
      { name: 'Environmental Impact Report', link: '#' },
    ],
    mapLocation: { lat: 28.7041, lng: 77.1025 }, // Dummy coordinates for Delhi
  };

  if (!project) {
    return <div className="text-center text-text text-xl mt-10">{t('projectNotFound')}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-text mb-4">{t('projectDetails')} - {project.name}</h1>
        <p className="text-lightText mb-6">{project.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Funds Card */}
          <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <DollarSign className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-xl font-semibold text-text">{t('funds')}</h2>
            </div>
            <p className="text-2xl font-bold text-primary mb-2">₹{project.fundsUsed}M / ₹{project.totalFunds}M</p>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(project.fundsUsed / project.totalFunds) * 100}%` }}></div>
            </div>
            <p className="text-sm text-lightText mt-2">{t('fundsAllocatedInfo')}</p>
          </div>

          {/* Supplies Card */}
          <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <Package className="w-6 h-6 text-secondary mr-3" />
              <h2 className="text-xl font-semibold text-text">{t('supplies')}</h2>
            </div>
            <p className="text-2xl font-bold text-secondary mb-2">{project.suppliesUsed} / {project.suppliesAvailable}</p>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-secondary h-2.5 rounded-full" style={{ width: `${(project.suppliesUsed / project.suppliesAvailable) * 100}%` }}></div>
            </div>
            <p className="text-sm text-lightText mt-2">{t('suppliesUsedInfo')}</p>
          </div>

          {/* Transparency Score Card */}
          <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text mb-2">{t('transparencyIndex')}</h2>
              <p className="text-5xl font-bold text-accent">{project.transparencyScore}%</p>
            </div>
            <ShieldCheck className="w-12 h-12 text-accent/50" />
          </div>
        </div>

        {/* Milestones and Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Milestones */}
          <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6">
            <div className="flex items-center mb-6">
              <CalendarDays className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-xl font-semibold text-text">{t('milestoneTimeline')}</h2>
            </div>
            <ol className="relative border-l border-gray-600 ml-4">
              {project.milestones.map((milestone, index) => (
                <li key={index} className="mb-6 ml-6">
                  <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-background ${milestone.completed ? 'bg-primary' : 'bg-gray-600'}`}>
                    {milestone.completed ? <CheckCircle className="w-3 h-3 text-white" /> : <Clock className="w-3 h-3 text-white" />}
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-text">{milestone.name}</h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-lightText">{t('on')} {milestone.date}</time>
                  <p className="text-base font-normal text-lightText">{milestone.completed ? t('completedMilestone') : t('pendingMilestone')}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Department Contact & Official Documents */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6">
              <div className="flex items-center mb-4">
                <Contact className="w-6 h-6 text-secondary mr-3" />
                <h2 className="text-xl font-semibold text-text">{t('projectContact')}</h2>
              </div>
              <p className="text-text font-medium">{project.contactInfo.name}</p>
              <p className="text-lightText text-sm">{t('email')}: {project.contactInfo.email}</p>
              <p className="text-lightText text-sm">{t('phone')}: {project.contactInfo.phone}</p>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6">
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-accent mr-3" />
                <h2 className="text-xl font-semibold text-text">{t('officialDocuments')}</h2>
              </div>
              <ul className="space-y-2">
                {project.documents.map((doc, index) => (
                  <li key={index}>
                    <a href={doc.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-primary" />
                      {doc.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Embedded Map Location */}
        <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6 mb-8">
          <div className="flex items-center mb-4">
            <MapPin className="w-6 h-6 text-accent mr-3" />
            <h2 className="text-xl font-semibold text-text">{t('projectLocation')}</h2>
          </div>
          <LazyLoad height={400} offset={100} once>
            <MapContainer
              center={[project.mapLocation.lat, project.mapLocation.lng]}
              zoom={15}
              style={{ height: '400px', width: '100%' }}
              className="rounded-lg border border-gray-700"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[project.mapLocation.lat, project.mapLocation.lng]}>
                <Popup>
                  {project.name}
                </Popup>
              </Marker>
            </MapContainer>
          </LazyLoad>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetails;
