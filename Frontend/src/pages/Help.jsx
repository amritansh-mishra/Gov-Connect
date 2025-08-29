import React, { useState } from 'react';
import { HelpCircle, Search, Book, MessageCircle, Phone, Mail, ChevronDown, ChevronRight } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: 'How do I reset my password?',
    answer: 'You can reset your password by going to Settings > Security > Change Password. Enter your current password and then your new password twice to confirm.',
    category: 'Account',
  },
  {
    id: 2,
    question: 'How do I upload documents?',
    answer: 'Navigate to the Documents section and click the "Upload Document" button. Select your file and fill in the required information before submitting.',
    category: 'Documents',
  },
  {
    id: 3,
    question: 'How do I schedule a meeting?',
    answer: 'Go to the Calendar section and click "Add Event". Fill in the meeting details including title, time, location, and attendees.',
    category: 'Calendar',
  },
  {
    id: 4,
    question: 'How do I add a new employee?',
    answer: 'In the Employees section, click "Add Employee" and fill in all required information including name, department, position, and contact details.',
    category: 'Employees',
  },
  {
    id: 5,
    question: 'How do I view department analytics?',
    answer: 'The Analytics section provides comprehensive insights into department performance, user engagement, and system metrics.',
    category: 'Analytics',
  },
];

const categories = ['All', 'Account', 'Documents', 'Calendar', 'Employees', 'Analytics'];

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Help & Support</h2>
        <p className="text-gray-600 mt-1">Find answers to common questions and get support.</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              {filteredFaqs.map(faq => (
                <div key={faq.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{faq.question}</h4>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full mt-2 inline-block">
                        {faq.category}
                      </span>
                    </div>
                    {expandedFaq === faq.id ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  
                  {expandedFaq === faq.id && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search terms or browse all categories.</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Live Chat</p>
                  <p className="text-sm text-gray-600">Available 24/7</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone Support</p>
                  <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Mail className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email Support</p>
                  <p className="text-sm text-gray-600">support@govconnect.gov</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                <Book className="w-4 h-4" />
                <span>User Manual</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                <Book className="w-4 h-4" />
                <span>Video Tutorials</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                <Book className="w-4 h-4" />
                <span>System Requirements</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                <Book className="w-4 h-4" />
                <span>Privacy Policy</span>
              </a>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Services</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">File Storage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}