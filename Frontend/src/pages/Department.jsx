import React from 'react';
import { Building, Users, TrendingUp, MapPin, Phone, Mail } from 'lucide-react';

const departments = [
  {
    id: 1,
    name: 'Human Resources',
    head: 'Sarah Johnson',
    employees: 45,
    budget: '$2.4M',
    performance: 85,
    location: 'Building A, Floor 3',
    phone: '+1 (555) 123-4567',
    email: 'hr@govconnect.gov',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    id: 2,
    name: 'Information Technology',
    head: 'Michael Chen',
    employees: 32,
    budget: '$3.8M',
    performance: 92,
    location: 'Building B, Floor 2',
    phone: '+1 (555) 234-5678',
    email: 'it@govconnect.gov',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
  {
    id: 3,
    name: 'Finance',
    head: 'Emily Rodriguez',
    employees: 28,
    budget: '$1.9M',
    performance: 78,
    location: 'Building A, Floor 1',
    phone: '+1 (555) 345-6789',
    email: 'finance@govconnect.gov',
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-600',
  },
  {
    id: 4,
    name: 'Operations',
    head: 'David Kim',
    employees: 67,
    budget: '$4.2M',
    performance: 95,
    location: 'Building C, Floor 1-2',
    phone: '+1 (555) 456-7890',
    email: 'ops@govconnect.gov',
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    textColor: 'text-green-600',
  },
  {
    id: 5,
    name: 'Public Relations',
    head: 'Lisa Thompson',
    employees: 18,
    budget: '$1.2M',
    performance: 88,
    location: 'Building A, Floor 4',
    phone: '+1 (555) 567-8901',
    email: 'pr@govconnect.gov',
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  {
    id: 6,
    name: 'Legal Affairs',
    head: 'Robert Wilson',
    employees: 15,
    budget: '$1.8M',
    performance: 91,
    location: 'Building B, Floor 4',
    phone: '+1 (555) 678-9012',
    email: 'legal@govconnect.gov',
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
  },
];

export default function Departments() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Departments</h2>
        <p className="text-gray-600 mt-1">Manage and overview all government departments and their operations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${dept.lightColor}`}>
                <Building className={`w-6 h-6 ${dept.textColor}`} />
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-900">{dept.performance}%</span>
                </div>
                <span className="text-xs text-gray-500">Performance</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{dept.name}</h3>
            <p className="text-sm text-gray-600 mb-4">Head: {dept.head}</p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Employees</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{dept.employees}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 text-gray-400">$</span>
                  <span className="text-sm text-gray-600">Budget</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{dept.budget}</span>
              </div>
            </div>

            <div className="space-y-2 mb-4 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3 h-3" />
                <span>{dept.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3 h-3" />
                <span>{dept.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3 h-3" />
                <span>{dept.email}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-all hover:scale-105 ${dept.color}`}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}