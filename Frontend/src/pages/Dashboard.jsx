import React from 'react';
import StatsCard from '../components/StatsCard';
import ActivityFeed from '../components/ActivityFeed';
import ProgressChart from '../components/ProgressChart';
import QuickActions from '../components/QuickActions';
import { Users, Building, FileText, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen">
      {/* Removed header-like content to avoid duplicate headers. */}
      {/* <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Department Dashboard</h2>
        </div>
        <p className="text-slate-600 ml-4 font-medium">Welcome back, Sarah. Here's what's happening in your departments today.</p>
      </div> */}
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Employees"
          value="1,247"
          change="+12%"
          changeType="increase"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Active Departments"
          value="8"
          change="+1"
          changeType="increase"
          icon={Building}
          color="green"
        />
        <StatsCard
          title="Documents Processed"
          value="432"
          change="+8%"
          changeType="increase"
          icon={FileText}
          color="yellow"
        />
        <StatsCard
          title="Efficiency Rate"
          value="94.2%"
          change="+2.1%"
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
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-lg border border-slate-200/50 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
            <h3 className="text-lg font-bold text-slate-800">Upcoming Events</h3>
          </div>
          <div className="space-y-5">
            <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-blue-50/50 transition-colors duration-200 group">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-2 shadow-sm group-hover:scale-110 transition-transform"></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">Budget Review Meeting</p>
                <p className="text-sm text-slate-500 font-medium">Tomorrow, 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-emerald-50/50 transition-colors duration-200 group">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mt-2 shadow-sm group-hover:scale-110 transition-transform"></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">New Employee Orientation</p>
                <p className="text-sm text-slate-500 font-medium">Friday, 2:00 PM</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-amber-50/50 transition-colors duration-200 group">
              <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mt-2 shadow-sm group-hover:scale-110 transition-transform"></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">Department Heads Meeting</p>
                <p className="text-sm text-slate-500 font-medium">Next Monday, 9:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}