import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserPlus, Lock, Building2, Users, Mail, Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { register as apiRegister } from '../api';

export default function SignupForm({ onSignup }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('citizen');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendOtp = async () => {
    if (!email || !/^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSendingOtp(true);
    setError('');
    setSuccess('');

    try {
      // Simulate OTP sending (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowOtpInput(true);
      setSuccess('OTP sent to your email successfully!');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Basic client validations
      if (!/^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/.test(email)) {
        setError('Please enter a valid email');
        setIsLoading(false);
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters');
        setIsLoading(false);
        return;
      }
      if (!otp || otp.length !== 6) {
        setError('Please enter the 6-digit OTP');
        setIsLoading(false);
        return;
      }

      const role = 'citizen'; // Only citizens use this form now
      const resp = await apiRegister({ username, password, role, email });
      onSignup(resp.user.username, '***', 'citizen');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setEmail('');
    setUserType('citizen');
    setOtp('');
    setShowOtpInput(false);
    setError('');
    setSuccess('');
  };

  const handleUserTypeChange = (type) => {
    if (type === 'department') {
      navigate('/signup/department');
      return;
    }
    setUserType(type);
    resetForm();
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
            <UserPlus className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-4xl font-bold text-text mb-3">Join GovConnect</h1>
          <p className="text-lightText font-medium text-lg">Create your citizen account</p>
        </div>

        {/* Signup Form */}
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

              {success && (
                <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-3 backdrop-blur-sm">
                  <p className="text-green-200 text-sm">{success}</p>
                </div>
              )}

              {/* User Type Selection */}
              <div>
                <label className="block text-sm font-medium text-text mb-3">
                  Sign up as
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleUserTypeChange('citizen')}
                    className={`flex items-center justify-center p-3 rounded-xl border transition-all duration-300 ${
                      userType === 'citizen'
                        ? 'bg-primary/30 border-primary text-text shadow-lg shadow-primary/25'
                        : 'bg-background/50 border-lightText/30 text-lightText hover:bg-background/80'
                    }`}
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Citizen
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUserTypeChange('department')}
                    className="flex items-center justify-center p-3 rounded-xl border border-lightText/30 text-lightText hover:bg-background/80 transition-all duration-300"
                  >
                    <Building2 className="w-5 h-5 mr-2" />
                    Department
                  </button>
                </div>
                <p className="text-xs text-lightText mt-2 text-center">
                  Department users will be redirected to a specialized registration form
                </p>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-lightText" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text placeholder-lightText/80 focus:ring-2 focus:ring-primary focus:border-primary focus:bg-background/70 transition-all duration-300"
                    placeholder="Enter your email"
                    required
                    disabled={showOtpInput}
                  />
                </div>
                {!showOtpInput && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSendingOtp || !email || !/^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/.test(email)}
                    className="mt-2 w-full bg-secondary text-white py-2 px-4 rounded-lg font-medium hover:bg-secondary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                )}
              </div>

              {/* OTP Input */}
              {showOtpInput && (
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-text mb-2">
                    Enter OTP
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Shield className="h-5 w-5 text-lightText" />
                    </div>
                    <input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="block w-full pl-10 pr-3 py-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text placeholder-lightText/80 focus:ring-2 focus:ring-primary focus:border-primary focus:bg-background/70 transition-all duration-300 text-center text-lg tracking-widest"
                      placeholder="000000"
                      maxLength={6}
                      required
                    />
                  </div>
                  <p className="text-xs text-lightText mt-1">Enter the 6-digit code sent to your email</p>
                </div>
              )}

              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-text mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserPlus className="h-5 w-5 text-lightText" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text placeholder-lightText/80 focus:ring-2 focus:ring-primary focus:border-primary focus:bg-background/70 transition-all duration-300"
                    placeholder="Choose a username"
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
                    placeholder="Create a password"
                    required
                  />
                </div>
                <p className="text-xs text-lightText mt-1">Password must be at least 8 characters long</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !showOtpInput}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-xl font-semibold hover:from-primary/90 hover:to-secondary/90 focus:ring-4 focus:ring-primary/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-text border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  'Create Citizen Account'
                )}
              </button>

              {/* Back to Login */}
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
            {t('copyright')}
          </p>
        </div>
      </div>
    </div>
  );
}


