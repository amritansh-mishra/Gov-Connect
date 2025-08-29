import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Landing from './pages/Landing';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

import Departments from './pages/Department';
import Employees from './pages/Employees';
import Documents from './pages/Document';
import Analytics from './pages/Analytics';
import Calendar from './pages/Calendar';
import Settings from './pages/Setting';
import Help from './pages/Help';
import CitizenDashboard from './pages/CitizenDashboard';
import ProjectsDirectory from './pages/ProjectsDirectory';
import ProjectDetails from './pages/ProjectDetails';
import CitizenFeedback from './pages/CitizenFeedback';
import CitizenPolling from './pages/CitizenPolling';
import LiveMapView from './pages/LiveMapView';
import DownloadReports from './pages/DownloadReports';
import DepartmentSignupForm from './components/DepartmentSignupForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = (username, password, userType, department) => {
    // Simple demo authentication
    if (username && password) {
      setIsAuthenticated(true);
      setUser({ 
        username, 
        name: username, 
        role: userType === 'citizen' ? 'Citizen' : 'Department Staff',
        userType,
        department: userType === 'department' ? department : null
      });
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupForm onSignup={handleLogin} />} />
          <Route path="/signup/department" element={<DepartmentSignupForm onSignup={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        {user?.userType === 'citizen' ? (
          <>
            <Sidebar user={user} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="lg:pl-64">
              <Header user={user} onLogout={handleLogout} setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
              <main role="main">
                <Routes>
                  {/* Citizen Routes */}
                  <Route path="/" element={<CitizenDashboard />} />
                  <Route path="/projects" element={<ProjectsDirectory />} />
                  <Route path="/projects/:id" element={<ProjectDetails />} />
                  <Route path="/feedback" element={<CitizenFeedback />} />
                  <Route path="/map" element={<LiveMapView />} />
                  <Route path="/polls" element={<CitizenPolling />} />
                  <Route path="/reports" element={<DownloadReports />} />
                  <Route path="/profile" element={<div className="p-6"><h1 className="text-2xl font-bold">My Account</h1></div>} />
                  <Route path="/help" element={<Help />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </>
        ) : (
          <>
            <Sidebar user={user} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="lg:pl-64">
              <Header user={user} onLogout={handleLogout} setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
              <main role="main">
                <Routes>
                  {/* Department Routes */}
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/departments" element={<Departments />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </>
        )}

        {/* Overlay for small screens when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
      </div>
    </Router>
  );
}

export default App;