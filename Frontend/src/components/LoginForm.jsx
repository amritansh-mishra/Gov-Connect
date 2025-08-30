import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Lock, User, Building2, ArrowLeft, Shield, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../api';

export default function LoginForm({ onLogin }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [deptCode, setDeptCode] = useState('');
  const [userType, setUserType] = useState('citizen');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const resp = await apiLogin({ username, password, deptCode });
      onLogin(resp.token, resp.user);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-ping"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl mb-6 shadow-2xl shadow-primary/25 ring-4 ring-primary/20 backdrop-blur-sm">
            <Shield className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-4xl font-bold text-text mb-3">Welcome Back</h1>
          <p className="text-lightText font-medium text-lg">Sign in to your GovConnect account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          {/* Glass overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-3xl"></div>
          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-3 backdrop-blur-sm">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              {/* User Type Selection */}
              <div>
                <label className="block text-sm font-medium text-text mb-3">
                  Sign in as
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => { setUserType('citizen'); setDeptCode(''); setError(''); }}
                    className={`flex items-center justify-center p-3 rounded-xl border transition-all duration-300 ${
                      userType === 'citizen'
                        ? 'bg-primary/30 border-primary text-text shadow-lg shadow-primary/25'
                        : 'bg-background/50 border-lightText/30 text-lightText hover:bg-background/80'
                    }`}
                  >
                    <User className="w-5 h-5 mr-2" />
                    Citizen
                  </button>
                  <button
                    type="button"
                    onClick={() => { setUserType('department'); setError(''); }}
                    className={`flex items-center justify-center p-3 rounded-xl border transition-all duration-300 ${
                      userType === 'department'
                        ? 'bg-primary/30 border-primary text-text shadow-lg shadow-primary/25'
                        : 'bg-background/50 border-lightText/30 text-lightText hover:bg-background/80'
                    }`}
                  >
                    <Building2 className="w-5 h-5 mr-2" />
                    Department
                  </button>
                </div>
              </div>

              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-text mb-2">
                  Email or Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-lightText" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text placeholder-lightText/80 focus:ring-2 focus:ring-primary focus:border-primary focus:bg-background/70 transition-all duration-300"
                    placeholder="Enter your email or username"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-lightText" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text placeholder-lightText/80 focus:ring-2 focus:ring-primary focus:border-primary focus:bg-background/70 transition-all duration-300"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Department Access Code - Only for Department Users */}
              {userType === 'department' && (
                <div>
                  <label htmlFor="deptCode" className="block text-sm font-medium text-text mb-2">
                    Department Access Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Shield className="h-5 w-5 text-lightText" />
                    </div>
                    <input
                      id="deptCode"
                      type="password"
                      value={deptCode}
                      onChange={(e) => setDeptCode(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text placeholder-lightText/80 focus:ring-2 focus:ring-primary focus:border-primary focus:bg-background/70 transition-all duration-300"
                      placeholder="Enter department code"
                      required
                    />
                  </div>
                  <p className="text-xs text-lightText mt-1">Required for department access</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-xl font-semibold hover:from-primary/90 hover:to-secondary/90 focus:ring-4 focus:ring-primary/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Back to Landing Page */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="inline-flex items-center text-sm text-primary hover:text-text transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-lightText">
            Secure access to government services
          </p>
        </div>
      </div>
    </div>
  );
}
