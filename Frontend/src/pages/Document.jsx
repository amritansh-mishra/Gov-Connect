import React, { useState } from 'react';
import { FileText, Download, Upload, Search, Filter, Calendar, User, Eye } from 'lucide-react';

const documents = [
  {
    id: 1,
    name: 'Healthcare Benefits Policy 2024',
    type: 'Policy',
    department: 'Human Resources',
    uploadedBy: 'Sarah Johnson',
    uploadDate: '2024-01-15',
    size: '2.4 MB',
    status: 'Active',
    downloads: 156,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'IT Security Guidelines',
    type: 'Guidelines',
    department: 'Information Technology',
    uploadedBy: 'Michael Chen',
    uploadDate: '2024-01-12',
    size: '1.8 MB',
    status: 'Active',
    downloads: 89,
    color: 'bg-emerald-500',
  },
  {
    id: 3,
    name: 'Q4 Budget Report 2023',
    type: 'Report',
    department: 'Finance',
    uploadedBy: 'Emily Rodriguez',
    uploadDate: '2024-01-10',
    size: '5.2 MB',
    status: 'Active',
    downloads: 234,
    color: 'bg-amber-500',
  },
  {
    id: 4,
    name: 'Emergency Response Procedures',
    type: 'Procedures',
    department: 'Operations',
    uploadedBy: 'David Kim',
    uploadDate: '2024-01-08',
    size: '3.1 MB',
    status: 'Active',
    downloads: 67,
    color: 'bg-red-500',
  },
  {
    id: 5,
    name: 'Public Communication Standards',
    type: 'Standards',
    department: 'Public Relations',
    uploadedBy: 'Lisa Thompson',
    uploadDate: '2024-01-05',
    size: '1.5 MB',
    status: 'Active',
    downloads: 45,
    color: 'bg-purple-500',
  },
  {
    id: 6,
    name: 'Legal Compliance Checklist',
    type: 'Checklist',
    department: 'Legal Affairs',
    uploadedBy: 'Robert Wilson',
    uploadDate: '2024-01-03',
    size: '0.8 MB',
    status: 'Active',
    downloads: 123,
    color: 'bg-indigo-500',
  },
];

const documentTypes = ['All', 'Policy', 'Guidelines', 'Report', 'Procedures', 'Standards', 'Checklist'];
const departments = ['All', 'Human Resources', 'Information Technology', 'Finance', 'Operations', 'Public Relations', 'Legal Affairs'];

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || doc.type === selectedType;
    const matchesDepartment = selectedDepartment === 'All' || doc.department === selectedDepartment;
    return matchesSearch && matchesType && matchesDepartment;
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
            <p className="text-gray-600 mt-1">Manage and access all government documents and files.</p>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {documentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
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

      {/* Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg bg-opacity-10 ${doc.color.replace('bg-', 'bg-opacity-10 bg-')}`}>
                <FileText className={`w-6 h-6 ${doc.color.replace('bg-', 'text-')}`} />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{doc.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${doc.color} text-white`}>
                    {doc.type}
                  </span>
                  <span>{doc.department}</span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>Uploaded by {doc.uploadedBy}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span>Size: {doc.size}</span>
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4 text-gray-400" />
                        <span>{doc.downloads} downloads</span>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      {doc.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-100">
                  <button className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
}