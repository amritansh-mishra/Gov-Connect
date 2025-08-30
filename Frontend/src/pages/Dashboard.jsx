import React, { useState, useEffect } from 'react';
import { getDashboardData } from '../api';
import StatsCard from '../components/StatsCard';
import ActivityFeed from '../components/ActivityFeed';
import ProgressChart from '../components/ProgressChart';
import QuickActions from '../components/QuickActions';
import { Users, Building, FileText, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: { value: 0, change: '' },
    activeDepartments: { value: 0, change: '' },
    documentsProcessed: { value: 0, change: '' },
    efficiencyRate: { value: '0%', change: '' },
  });
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        setStats(data.stats);
        setUserName(data.userName);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        // Optionally, set some error state to show in the UI
      }
    };

    fetchData();
  }, []);
  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-text">Department Dashboard</h2>
        <p className="text-lightText mt-1">{userName ? `Welcome back, ${userName}.` : 'Loading...'}</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Employees"
          value={stats.totalEmployees.value.toLocaleString()}
          change={stats.totalEmployees.change}
          changeType="increase"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Active Departments"
          value={stats.activeDepartments.value}
          change={stats.activeDepartments.change}
          changeType="increase"
          icon={Building}
          color="green"
        />
        <StatsCard
          title="Documents Processed"
          value={stats.documentsProcessed.value}
          change={stats.documentsProcessed.change}
          changeType="increase"
          icon={FileText}
          color="yellow"
        />
        <StatsCard
          title="Efficiency Rate"
          value={stats.efficiencyRate.value}
          change={stats.efficiencyRate.change}
          changeType="increase"
          icon={TrendingUp}
          color="green"
        />
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ProgressChart />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
      
      {/* Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed />
        
        {/* Upcoming Events */}
        <div className="bg-background/50 rounded-xl shadow-lg border border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
            <h3 className="text-lg font-bold text-text">Upcoming Events</h3>
          </div>
          <div className="space-y-5">
            <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 group">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-2 shadow-sm group-hover:scale-110 transition-transform"></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text group-hover:text-blue-400 transition-colors">Budget Review Meeting</p>
                <p className="text-sm text-lightText font-medium">Tomorrow, 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 group">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mt-2 shadow-sm group-hover:scale-110 transition-transform"></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text group-hover:text-emerald-400 transition-colors">New Employee Orientation</p>
                <p className="text-sm text-lightText font-medium">Friday, 2:00 PM</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 group">
              <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mt-2 shadow-sm group-hover:scale-110 transition-transform"></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text group-hover:text-amber-400 transition-colors">Department Heads Meeting</p>
                <p className="text-sm text-lightText font-medium">Next Monday, 9:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}