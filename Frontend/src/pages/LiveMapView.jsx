import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LazyLoad from 'react-lazyload';

// Fix for default icon issues with Leaflet and Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: `https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png`,
  iconUrl: `https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png`,
  shadowUrl: `https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png`,
});

const LiveMapView = () => {
  const { t } = useTranslation();

  // Dummy project data with statuses for color coding
  const projects = [
    {
      id: 1,
      name: 'Smart City Initiative',
      status: 'onTime',
      mapLocation: { lat: 28.7041, lng: 77.1025 }, // Delhi
    },
    {
      id: 2,
      name: 'Clean Rivers Project',
      status: 'delayed',
      mapLocation: { lat: 28.5355, lng: 77.3910 }, // Noida
    },
    {
      id: 3,
      name: 'New School Construction',
      status: 'stalled',
      mapLocation: { lat: 28.4595, lng: 77.0266 }, // Gurgaon
    },
    {
      id: 4,
      name: 'Public Transport Upgrade',
      status: 'onTime',
      mapLocation: { lat: 28.6139, lng: 77.2090 }, // Central Delhi
    },
  ];

  // Custom icons for different statuses
  const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const yellowIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const getIconForStatus = (status) => {
    switch (status) {
      case 'onTime':
        return greenIcon;
      case 'delayed':
        return yellowIcon;
      case 'stalled':
        return redIcon;
      default:
        return L.Icon.Default;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-text mb-6">{t('liveMapView')}</h1>

        <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6">
          <LazyLoad height={600} offset={200} once>
            <MapContainer
              center={[28.6139, 77.2090]} // Centered around Delhi
              zoom={12}
              style={{ height: '600px', width: '100%' }}
              className="rounded-lg border border-gray-700"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {projects.map((project) => (
                <Marker
                  key={project.id}
                  position={[project.mapLocation.lat, project.mapLocation.lng]}
                  icon={getIconForStatus(project.status)}
                >
                  <Popup>
                    <div className="font-semibold text-text">{project.name}</div>
                    <div className="text-lightText">{t('status')}: {t(project.status)}</div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </LazyLoad>

          <div className="mt-4 flex justify-center space-x-4 text-sm font-medium text-text">
            <div className="flex items-center"><span className="w-3 h-3 bg-primary rounded-full mr-2"></span> {t('onTime')}</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-accent rounded-full mr-2"></span> {t('delayed')}</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span> {t('stalled')}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveMapView;
