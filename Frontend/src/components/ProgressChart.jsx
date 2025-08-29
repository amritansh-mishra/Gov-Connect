import React from 'react';

const departments = [
  { name: 'Human Resources', progress: 85, color: 'bg-blue-500' },
  { name: 'Information Technology', progress: 92, color: 'bg-emerald-500' },
  { name: 'Finance', progress: 78, color: 'bg-amber-500' },
  { name: 'Operations', progress: 95, color: 'bg-green-500' },
  { name: 'Marketing', progress: 70, color: 'bg-purple-500' },
];

export default function ProgressChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Department Performance</h3>
        <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Quarter</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {departments.map((dept) => (
          <div key={dept.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{dept.name}</span>
              <span className="text-sm font-semibold text-gray-900">{dept.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${dept.color}`}
                style={{ width: `${dept.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}