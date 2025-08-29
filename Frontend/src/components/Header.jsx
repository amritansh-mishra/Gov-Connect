import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Search, Settings, User, Menu, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({ user, onLogout, setIsSidebarOpen, isSidebarOpen }) {
  const { t } = useTranslation();

  return (
    <header className="relative px-6 py-4 overflow-hidden shadow-xl shadow-slate-500/20 drop-shadow-2xl bg-background" role="banner">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-3xl border-b border-gray-700 shadow-2xl shadow-black/5"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute inset-0 backdrop-saturate-150 backdrop-brightness-110"></div>

      {/* Content */}
      <div className="relative z-10">
        {user?.userType === 'citizen' ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden p-2 rounded-xl hover:bg-gray-700 hover:shadow-md transition-all duration-200 transform hover:scale-105"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label={isSidebarOpen ? t('closeSidebar') : t('openSidebar')}
                aria-expanded={isSidebarOpen}
                aria-controls="main-sidebar"
              >
                <Menu className="w-5 h-5 text-text" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 ring-2 ring-primary/20">
                  <span className="text-white font-bold text-sm drop-shadow-sm">GC</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-text to-lightText bg-clip-text text-transparent">GovConnect</h1>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></div>
                    <span className="text-xs text-lightText font-medium">{t('citizenPortal')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lightText w-4 h-4 transition-colors" />
                <input
                  type="text"
                  placeholder={t('searchAndFilter')}
                  className="pl-10 pr-4 py-2.5 w-72 bg-gray-700/30  border border-gray-600/30 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:bg-gray-700/40 transition-all duration-200 shadow-lg shadow-gray-900/10 hover:shadow-xl hover:bg-gray-700/40 placeholder-lightText hover:ring-gray-600/40"
                  aria-label={t('searchProjects')}
                />
              </div>
              <button 
                className="relative p-2.5 text-lightText hover:text-text hover:bg-gray-700/30 hover:backdrop-blur-md rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-900/10 group"
                aria-label={t('viewNotifications')}
              >
                <Bell className="w-5 h-5 group-hover:animate-pulse" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-accent to-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg shadow-red-500/25 animate-pulse ring-2 ring-background/80 backdrop-blur-sm">
                  3
                </span>
              </button>

              <button 
                className="p-2.5 text-lightText hover:text-text hover:bg-gray-700/30 hover:backdrop-blur-md rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-900/10 group"
                aria-label={t('settings')}
              >
                <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="flex items-center space-x-3 pl-4 border-l border-gray-700/30">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-lightText via-gray-500 to-gray-600 rounded-full flex items-center justify-center shadow-lg shadow-gray-500/25 ring-2 ring-background/50 hover:ring-background/70 transition-all duration-200 backdrop-blur-sm">
                    <User className="w-5 h-5 text-white drop-shadow-sm" aria-hidden="true" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-secondary rounded-full border-2 border-background/80 shadow-sm backdrop-blur-sm"></div>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-text">{user?.name || 'Citizen'}</p>
                  <p className="text-xs text-lightText font-medium">{t('citizen')}</p>
                </div>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="ml-3 px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 backdrop-blur-sm border border-primary/20 hover:border-primary/30"
                    aria-label={t('logout')}
                  >
                    {t('logout')}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden p-2 rounded-xl hover:bg-gray-700 hover:shadow-md transition-all duration-200 transform hover:scale-105"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label={isSidebarOpen ? t('closeSidebar') : t('openSidebar')}
                aria-expanded={isSidebarOpen}
                aria-controls="main-sidebar"
              >
                <Menu className="w-5 h-5 text-text" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 ring-2 ring-primary/20">
                  <span className="text-white font-bold text-sm drop-shadow-sm">GC</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-text to-lightText bg-clip-text text-transparent">GovConnect</h1>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></div>
                    <span className="text-xs text-lightText font-medium">{t('systemOnline')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lightText w-4 h-4 transition-colors" />
                <input
                  type="text"
                  placeholder={t('searchAndFilter')}
                  className="pl-10 pr-4 py-2.5 w-72 bg-gray-700/30  border border-gray-600/30 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:bg-gray-700/40 transition-all duration-200 shadow-lg shadow-gray-900/10 hover:shadow-xl hover:bg-gray-700/40 placeholder-lightText hover:ring-gray-600/40"
                  aria-label={t('searchProjects')}
                />
              </div>
              <button 
                className="relative p-2.5 text-lightText hover:text-text hover:bg-gray-700/30 hover:backdrop-blur-md rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-900/10 group"
                aria-label={t('viewNotifications')}
              >
                <Bell className="w-5 h-5 group-hover:animate-pulse" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-accent to-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg shadow-red-500/25 animate-pulse ring-2 ring-background/80 backdrop-blur-sm">
                  3
                </span>
              </button>

              <button 
                className="p-2.5 text-lightText hover:text-text hover:bg-gray-700/30 hover:backdrop-blur-md rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-900/10 group"
                aria-label={t('settings')}
              >
                <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <button 
                className="px-4 py-2.5 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 backdrop-blur-sm border border-primary/20 hover:border-primary/30 group"
                aria-label={t('addNewTask')}
              >
                <div className="flex items-center space-x-2">
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="text-sm">{t('newTask')}</span>
                </div>
              </button>

              <div className="flex items-center space-x-3 pl-4 border-l border-gray-700/30">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-lightText via-gray-500 to-gray-600 rounded-full flex items-center justify-center shadow-lg shadow-gray-500/25 ring-2 ring-background/50 hover:ring-background/70 transition-all duration-200 backdrop-blur-sm">
                    <User className="w-5 h-5 text-white drop-shadow-sm" aria-hidden="true" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-secondary rounded-full border-2 border-background/80 shadow-sm backdrop-blur-sm"></div>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-text">{user?.name || 'Sarah Johnson'}</p>
                  <p className="text-xs text-lightText font-medium">{t('departmentHead')}</p>
                </div>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="ml-3 px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 backdrop-blur-sm border border-primary/20 hover:border-primary/30"
                    aria-label={t('logout')}
                  >
                    {t('logout')}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}