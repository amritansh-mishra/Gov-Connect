import React, { useState } from 'react';
import { Search, Filter, Plus, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const employees = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Department Head - HR',
    department: 'Human Resources',
    email: 'sarah.johnson@govconnect.gov',
    phone: '+1 (555) 123-4567',
    location: 'Building A, Floor 3',
    joinDate: '2019-03-15',
    status: 'Active',
    avatar: 'SJ',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'IT Director',
    department: 'Information Technology',
    email: 'michael.chen@govconnect.gov',
    phone: '+1 (555) 234-5678',
    location: 'Building B, Floor 2',
    joinDate: '2020-07-22',
    status: 'Active',
    avatar: 'MC',
    color: 'bg-emerald-500',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'Finance Manager',
    department: 'Finance',
    email: 'emily.rodriguez@govconnect.gov',
    phone: '+1 (555) 345-6789',
    location: 'Building A, Floor 1',
    joinDate: '2018-11-08',
    status: 'Active',
    avatar: 'ER',
    color: 'bg-amber-500',
  },
  {
    id: 4,
    name: 'David Kim',
    position: 'Operations Director',
    department: 'Operations',
    email: 'david.kim@govconnect.gov',
    phone: '+1 (555) 456-7890',
    location: 'Building C, Floor 1',
    joinDate: '2017-05-12',
    status: 'Active',
    avatar: 'DK',
    color: 'bg-green-500',
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    position: 'PR Specialist',
    department: 'Public Relations',
    email: 'lisa.thompson@govconnect.gov',
    phone: '+1 (555) 567-8901',
    location: 'Building A, Floor 4',
    joinDate: '2021-01-18',
    status: 'Active',
    avatar: 'LT',
    color: 'bg-purple-500',
  },
  {
    id: 6,
    name: 'Robert Wilson',
    position: 'Legal Counsel',
    department: 'Legal Affairs',
    email: 'robert.wilson@govconnect.gov',
    phone: '+1 (555) 678-9012',
    location: 'Building B, Floor 4',
    joinDate: '2019-09-30',
    status: 'Active',
    avatar: 'RW',
    color: 'bg-indigo-500',
  },
];

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const departments = ['All', 'Human Resources', 'Information Technology', 'Finance', 'Operations', 'Public Relations', 'Legal Affairs'];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Employees</h2>
            <p className="text-gray-600 mt-1">Manage employee information and organizational structure.</p>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
            <div className="flex items-start space-x-4 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${employee.color}`}>
                {employee.avatar}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                <p className="text-sm text-gray-600">{employee.position}</p>
                <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full mt-1">
                  {employee.status}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span>{employee.department}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="truncate">{employee.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{employee.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Joined {new Date(employee.joinDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 mt-4">
              <button className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
}