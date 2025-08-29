import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Users, FileText, BarChart3, Calendar, Settings, HelpCircle, Building, FolderOpen, Map, Vote, FileBarChart } from 'lucide-react';

// Department Navigation
const departmentNavigation = [
  { name: 'dashboard', icon: Home, path: '/' },
  { name: 'departments', icon: Building, path: '/departments' },
  { name: 'employees', icon: Users, path: '/employees' },
  { name: 'documents', icon: FileText, path: '/documents' },
  { name: 'analytics', icon: BarChart3, path: '/analytics' },
  { name: 'calendar', icon: Calendar, path: '/calendar' },
];

// Citizen Navigation
const citizenNavigation = [
  { name: 'home', icon: Home, path: '/' },
  { name: 'projects', icon: FolderOpen, path: '/projects' },
  { name: 'feedback', icon: FileText, path: '/feedback' },
  { name: 'map', icon: Map, path: '/map' },
  { name: 'polls', icon: Vote, path: '/polls' },
  { name: 'reports', icon: FileBarChart, path: '/reports' },
];

const secondaryNavigation = [
  { name: 'settings', icon: Settings, path: '/settings' },
  { name: 'help', icon: HelpCircle, path: '/help' },
];

const citizenSecondaryNavigation = [
  { name: 'myAccount', icon: Users, path: '/profile' },
  { name: 'help', icon: HelpCircle, path: '/help' },
];

export default function Sidebar({ user, isSidebarOpen, setIsSidebarOpen }) {
  const location = useLocation();
  const { t } = useTranslation();
  
  const navigation = user?.userType === 'citizen' ? citizenNavigation : departmentNavigation;
  const secondaryNav = user?.userType === 'citizen' ? citizenSecondaryNavigation : secondaryNavigation;

  return (
    <div
      id="main-sidebar" // Added for accessibility
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-background shadow-2xl shadow-gray-900/50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:flex lg:flex-col`}
    >
      <div className="flex-1 flex flex-col min-h-0 pt-6 pb-6">
        {/* Logo/Brand Section */}
        <div className="px-6 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
              <span className="text-white font-bold text-lg">GC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-text">GovConnect</h1>
              <p className="text-xs text-lightText">{user?.userType === 'citizen' ? t('citizenPortal') : t('adminPortal')}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2" aria-label={user?.userType === 'citizen' ? t('citizenPrimaryNavigation') : t('departmentPrimaryNavigation')} role="navigation">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click for small screens
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 transform hover:scale-105 ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 border-l-4 border-secondary/50'
                  : 'text-lightText hover:bg-gray-700/50 hover:text-text hover:shadow-md hover:shadow-gray-700/20'
              }`}
            >
              <item.icon
                className={`mr-4 flex-shrink-0 h-5 w-5 transition-all duration-200 ${
                  location.pathname === item.path 
                    ? 'text-white drop-shadow-sm' 
                    : 'text-lightText group-hover:text-primary group-hover:scale-110'
                }`}
              />
              <span className="font-medium tracking-wide">{t(item.name)}</span>
              {location.pathname === item.path && (
                <div className="ml-auto w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              )}
            </Link>
          ))}
        </nav>
        
        <div className="px-4 space-y-2">
          <div className="border-t border-gray-700/50 pt-6">
            <nav aria-label={user?.userType === 'citizen' ? t('citizenSecondaryNavigation') : t('departmentSecondaryNavigation')} role="navigation">
              {secondaryNav.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click for small screens
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 transform hover:scale-105 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-text shadow-lg shadow-gray-700/25'
                      : 'text-lightText hover:bg-gray-700/50 hover:text-text hover:shadow-md hover:shadow-gray-700/20'
                  }`}
                >
                  <item.icon className={`mr-4 flex-shrink-0 h-5 w-5 transition-all duration-200 ${
                    location.pathname === item.path 
                      ? 'text-text drop-shadow-sm' 
                      : 'text-lightText group-hover:text-text group-hover:scale-110'
                  }`} />
                  <span className="font-medium tracking-wide">{t(item.name)}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="px-6 pt-4">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          <div className="mt-4 text-center">
            <div className="inline-flex items-center space-x-1">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span className="text-xs text-lightText font-medium">{user?.userType === 'citizen' ? t('citizenPortal') : t('systemOnline')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}