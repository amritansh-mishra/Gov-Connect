import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getDashboardData } from '../api';
import StatsCard from '../components/StatsCard';
import ActivityFeed from '../components/ActivityFeed';
import ProjectHighlights from '../components/ProjectHighlights';
import { FolderOpen, ShieldCheck, MessageSquare, Fingerprint } from 'lucide-react';

const CitizenDashboard = () => {
  const { t } = useTranslation();
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        setUserName(data.userName);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  // Dummy data for citizen dashboard stats
  const citizenStats = [
    {
      title: 'activeProjects',
      value: '8',
      change: '+2 this month',
      changeType: 'increase',
      icon: FolderOpen,
      color: 'blue',
    },
    {
      title: 'feedbackSubmitted',
      value: '26',
      change: '+5 this week',
      changeType: 'increase',
      icon: MessageSquare,
      color: 'yellow',
    },
    {
      title: 'identityVerified',
      value: 'Verified',
      change: 'Aadhaar Linked',
      changeType: 'increase',
      icon: ShieldCheck,
      color: 'green',
    },
  ];

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-text mb-2">{t('dashboard')}</h1>
        <p className="text-lightText mb-6">{userName ? `Welcome, ${userName}.` : 'Loading...'}</p>
        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {citizenStats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProjectHighlights />
          </div>
          <div>
            <ActivityFeed />
          </div>
        </div>

        {/* Aadhaar Verification Placeholder */}
        <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6 mt-8">
          <div className="flex items-center mb-4">
            <Fingerprint className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-xl font-semibold text-text">{t('aadhaarVerification')}</h2>
          </div>
          <p className="text-lightText mb-4">{t('aadhaarVerificationDescription')}</p>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder={t('enterAadhaarNumber')}
              className="flex-1 px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text placeholder-lightText"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value)}
              aria-label={t('aadhaarNumber')}
            />
            <button
              onClick={() => alert(t('aadhaarVerifyComingSoon'))}
              className="bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary/90 transition duration-300"
              aria-label={t('verifyAadhaar')}
            >
              {t('verifyAadhaar')}
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button className="bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary/90 transition duration-300">
            {t('viewProjects')}
          </button>
          <button className="bg-secondary text-white px-6 py-3 rounded-lg shadow-md hover:bg-secondary/90 transition duration-300">
            {t('giveFeedback')}
          </button>
          <button className="bg-accent text-white px-6 py-3 rounded-lg shadow-md hover:bg-accent/90 transition duration-300">
            {t('voteOnUpcomingProjects')}
          </button>
        </div>
    </div>
  );
};

export default CitizenDashboard;
