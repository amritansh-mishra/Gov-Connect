import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Building2, FileText, TrendingUp, MapPin, MessageSquare, BarChart3 } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    { icon: Shield, title: 'Secure Access', desc: 'JWT-based authentication for citizens and departments' },
    { icon: Users, title: 'Citizen Portal', desc: 'Access government services and submit feedback' },
    { icon: Building2, title: 'Department Management', desc: 'Manage projects and track progress' },
    { icon: FileText, title: 'Document Processing', desc: 'Streamlined document workflows' },
    { icon: TrendingUp, title: 'Analytics Dashboard', desc: 'Real-time insights and reporting' },
    { icon: MapPin, title: 'Live Map View', desc: 'Geographic project tracking' },
    { icon: MessageSquare, title: 'Feedback System', desc: 'Two-way communication platform' },
    { icon: BarChart3, title: 'Progress Tracking', desc: 'Monitor project milestones and budgets' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-2xl border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-text">GovConnect</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-lightText hover:text-text transition-colors">Features</a>
              <a href="#about" className="text-lightText hover:text-text transition-colors">About</a>
              <a href="#contact" className="text-lightText hover:text-text transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-text mb-6">
            Welcome to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">GovConnect</span>
          </h1>
          <p className="text-xl text-lightText mb-8 max-w-3xl mx-auto">
            A unified digital platform connecting citizens with government departments, 
            enabling transparent communication, project tracking, and efficient service delivery.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={() => navigate('/login')} 
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:from-primary/90 hover:to-secondary/90 transition-all transform hover:scale-105"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')} 
              className="px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all transform hover:scale-105"
            >
              Signup
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white/5">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-text text-center mb-16">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 hover:border-primary/50 transition-all transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">{feature.title}</h3>
                <p className="text-lightText text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-text mb-8">About GovConnect</h2>
          <p className="text-lg text-lightText mb-8">
            GovConnect is designed to bridge the gap between government departments and citizens, 
            providing a transparent, efficient, and user-friendly platform for public service delivery.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">For Citizens</h3>
              <p className="text-lightText">Access services, track projects, and provide feedback easily</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">For Departments</h3>
              <p className="text-lightText">Manage projects, track progress, and engage with citizens</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Transparency</h3>
              <p className="text-lightText">Real-time updates and progress tracking for all stakeholders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white/10 backdrop-blur-2xl border-t border-white/20 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-text">GovConnect</span>
              </div>
              <p className="text-lightText text-sm">
                Connecting citizens with government services through innovative digital solutions.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-text mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-lightText hover:text-text transition-colors">Features</a></li>
                <li><a href="#about" className="text-lightText hover:text-text transition-colors">About</a></li>
                <li><a href="/login" className="text-lightText hover:text-text transition-colors">Login</a></li>
                <li><a href="/signup" className="text-lightText hover:text-text transition-colors">Signup</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-text mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-lightText">Project Tracking</li>
                <li className="text-lightText">Citizen Feedback</li>
                <li className="text-lightText">Document Management</li>
                <li className="text-lightText">Analytics Dashboard</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-text mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-lightText">Email: support@govconnect.gov</li>
                <li className="text-lightText">Phone: +1-800-GOV-HELP</li>
                <li className="text-lightText">Hours: Mon-Fri 9AM-6PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-lightText text-sm">
              © 2024 GovConnect. All rights reserved. | Built with modern web technologies
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


