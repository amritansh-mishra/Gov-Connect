import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Landing from './pages/Landing';
import Layout from './components/Layout';
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
import { setToken as setApiToken } from './api';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize token and user from localStorage
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken) {
      setToken(storedToken);
      setApiToken(storedToken);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setApiToken(token);
  }, [token]);

  const handleLogin = (newToken, newUser) => {
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setToken(newToken); // This will trigger the useEffect
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

    if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {token ? (
          <Route path="/*" element={<Layout user={user} onLogout={handleLogout} />}>
            {user?.role === 'citizen' ? (
              <>
                <Route index element={<CitizenDashboard />} />
                <Route path="projects" element={<ProjectsDirectory />} />
                <Route path="projects/:id" element={<ProjectDetails />} />
                <Route path="feedback" element={<CitizenFeedback />} />
                <Route path="map" element={<LiveMapView />} />
                <Route path="polls" element={<CitizenPolling />} />
                <Route path="reports" element={<DownloadReports />} />
                <Route path="profile" element={<div className="p-6"><h1 className="text-2xl font-bold">My Account</h1></div>} />
                <Route path="help" element={<Help />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : (
              <>
                <Route index element={<Dashboard />} />
                <Route path="departments" element={<Departments />} />
                <Route path="employees" element={<Employees />} />
                <Route path="documents" element={<Documents />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="settings" element={<Settings />} />
                <Route path="help" element={<Help />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Route>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupForm onSignup={handleLogin} />} />
            <Route path="/signup/department" element={<DepartmentSignupForm onSignup={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;