import React from 'react';
import { BarChart3, TrendingUp, Users, FileText, Calendar, Activity } from 'lucide-react';

const metrics = [
  { name: 'Total Users', value: '1,247', change: '+12%', trend: 'up' },
  { name: 'Active Sessions', value: '892', change: '+8%', trend: 'up' },
  { name: 'Documents Processed', value: '432', change: '+15%', trend: 'up' },
  { name: 'System Uptime', value: '99.9%', change: '+0.1%', trend: 'up' },
];

const departmentData = [
  { name: 'HR', value: 85, color: 'bg-blue-500' },
  { name: 'IT', value: 92, color: 'bg-emerald-500' },
  { name: 'Finance', value: 78, color: 'bg-amber-500' },
  { name: 'Operations', value: 95, color: 'bg-green-500' },
  { name: 'PR', value: 70, color: 'bg-purple-500' },
  { name: 'Legal', value: 88, color: 'bg-indigo-500' },
];

const activityData = [
  { time: '00:00', users: 45 },
  { time: '04:00', users: 23 },
  { time: '08:00', users: 156 },
  { time: '12:00', users: 234 },
  { time: '16:00', users: 189 },
  { time: '20:00', users: 98 },
];

export default function Analytics() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <p className="text-gray-600 mt-1">Monitor system performance and user engagement metrics.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                  <span className="text-sm font-medium text-emerald-600">{metric.change}</span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Department Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Performance</h3>
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                  <span className="text-sm font-semibold text-gray-900">{dept.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${dept.color}`}
                    style={{ width: `${dept.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Activity Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily User Activity</h3>
          <div className="space-y-4">
            <div className="flex items-end justify-between h-32 space-x-2">
              {activityData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-blue-500 rounded-t-sm transition-all duration-500 hover:bg-blue-600"
                    style={{ height: `${(data.users / 250) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{data.time}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Peak activity: 2:00 PM (234 users)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">User Engagement</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Daily Active Users</span>
              <span className="text-sm font-medium">892</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Session Duration</span>
              <span className="text-sm font-medium">24m 32s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Bounce Rate</span>
              <span className="text-sm font-medium">12.4%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Document Stats</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Documents</span>
              <span className="text-sm font-medium">2,847</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Downloads Today</span>
              <span className="text-sm font-medium">156</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Storage Used</span>
              <span className="text-sm font-medium">847 GB</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Server Response</span>
              <span className="text-sm font-medium text-green-600">142ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Error Rate</span>
              <span className="text-sm font-medium text-green-600">0.02%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">CPU Usage</span>
              <span className="text-sm font-medium">34%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}