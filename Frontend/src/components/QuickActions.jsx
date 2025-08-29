import React from 'react';
import { Plus, Upload, Download, Send, Calendar, Users } from 'lucide-react';

const actions = [
  { name: 'Add Employee', icon: Plus, color: 'bg-blue-500 hover:bg-blue-600' },
  { name: 'Upload Document', icon: Upload, color: 'bg-emerald-500 hover:bg-emerald-600' },
  { name: 'Generate Report', icon: Download, color: 'bg-amber-500 hover:bg-amber-600' },
  { name: 'Send Notice', icon: Send, color: 'bg-purple-500 hover:bg-purple-600' },
  { name: 'Schedule Meeting', icon: Calendar, color: 'bg-indigo-500 hover:bg-indigo-600' },
  { name: 'Manage Teams', icon: Users, color: 'bg-teal-500 hover:bg-teal-600' },
];

export default function QuickActions() {
  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-lg border border-slate-200/50 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-2 h-6 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full"></div>
        <h3 className="text-lg font-bold text-slate-800">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.name}
            className={`group flex items-center space-x-3 p-4 rounded-xl text-white transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${action.color} shadow-md`}
          >
            <action.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-semibold tracking-wide">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}