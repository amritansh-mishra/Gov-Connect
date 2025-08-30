import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Lock, Mail, Shield, ArrowLeft, UserPlus, FileText, Phone, MapPin, Users, CheckCircle } from 'lucide-react';
import { register as apiRegister } from '../api';
import { useNavigate } from 'react-router-dom';

export default function DepartmentSignupForm({ onSignup }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    departmentName: '',
    departmentCode: '',
    deptAccessCode: '',
    contactPerson: '',
    phoneNumber: '',
    address: '',
    description: '',
    employeeCount: '',
    budget: '',
    otp: ''
  });
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const departments = [
    { value: '', label: 'Select Department Type' },
    { value: 'administration', label: 'Administration & General Services' },
    { value: 'finance', label: 'Finance & Budget' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'it', label: 'Information Technology' },
    { value: 'health', label: 'Health & Public Safety' },
    { value: 'education', label: 'Education & Training' },
    { value: 'transport', label: 'Transportation & Infrastructure' },
    { value: 'environment', label: 'Environment & Sustainability' },
    { value: 'economic', label: 'Economic Development' },
    { value: 'social', label: 'Social Services' },
    { value: 'legal', label: 'Legal & Compliance' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep1 = () => {
    if (!formData.departmentName || !formData.departmentCode || !formData.deptAccessCode) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.deptAccessCode.length < 6) {
      setError('Department access code must be at least 6 characters');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.email || !/^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.contactPerson || !formData.phoneNumber) {
      setError('Please fill in contact information');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.username || formData.username.length < 3) {
      setError('Username must be at least 3 characters');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSendOtp = async () => {
    if (!validateStep2()) return;

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
    if (!validateStep3()) return;
    if (!formData.otp || formData.otp.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }

    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const resp = await apiRegister({
        username: formData.username,
        password: formData.password,
        role: 'department',
        email: formData.email,
        deptCode: formData.deptAccessCode,
        department: formData.departmentCode,
        departmentName: formData.departmentName,
        contactPerson: formData.contactPerson,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        description: formData.description,
        employeeCount: formData.employeeCount,
        budget: formData.budget
      });
      onSignup(resp.token, resp.user);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    setError('');
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    setError('');
  };

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      departmentName: '',
      departmentCode: '',
      deptAccessCode: '',
      contactPerson: '',
      phoneNumber: '',
      address: '',
      description: '',
      employeeCount: '',
      budget: '',
      otp: ''
    });
    setShowOtpInput(false);
    setCurrentStep(1);
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-ping"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl mb-6 shadow-2xl shadow-primary/25 ring-4 ring-primary/20 backdrop-blur-sm">
            <Building2 className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-4xl font-bold text-text mb-3">Department Registration</h1>
          <p className="text-lightText font-medium text-lg">Join GovConnect as a Government Department</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                step <= currentStep 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-600 text-gray-300'
              }`}>
                {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step < currentStep ? 'bg-primary' : 'bg-gray-600'
                }`}></div>
              )}
            </div>
          ))}
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

              {/* Step 1: Department Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-text mb-4">Department Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Department Name *</label>
                      <input
                        type="text"
                        name="departmentName"
                        value={formData.departmentName}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Enter department name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Department Type *</label>
                      <select
                        name="departmentCode"
                        value={formData.departmentCode}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text focus:ring-2 focus:ring-primary focus:border-primary"
                        required
                      >
                        {departments.map((dept) => (
                          <option key={dept.value} value={dept.value} className="bg-gray-800 text-white">
                            {dept.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Department Access Code *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Shield className="h-5 w-5 text-lightText" />
                      </div>
                      <input
                        type="password"
                        name="deptAccessCode"
                        value={formData.deptAccessCode}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Enter access code"
                        required
                      />
                    </div>
                    <p className="text-xs text-lightText mt-1">Must be at least 6 characters long</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Employee Count</label>
                      <input
                        type="number"
                        name="employeeCount"
                        value={formData.employeeCount}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Number of employees"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Annual Budget (₹)</label>
                      <input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Budget amount"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Brief description of department functions"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-text mb-4">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Contact Person *</label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Phone Number *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-lightText" />
                        </div>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="Phone number"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Email Address *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-lightText" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="department@government.gov"
                        required
                        disabled={showOtpInput}
                      />
                    </div>
                    {!showOtpInput && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isSendingOtp || !formData.email || !/^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/.test(formData.email)}
                        className="mt-2 w-full bg-secondary text-white py-2 px-4 rounded-lg font-medium hover:bg-secondary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-lightText" />
                      </div>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full pl-10 pr-3 py-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Department address"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-lightText/30 text-lightText rounded-xl hover:bg-background/50 transition-all"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Account Creation */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-text mb-4">Create Account</h3>
                  
                  {/* OTP Input */}
                  {showOtpInput && (
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Enter OTP</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Shield className="h-5 w-5 text-lightText" />
                        </div>
                        <input
                          type="text"
                          name="otp"
                          value={formData.otp}
                          onChange={(e) => setFormData(prev => ({ ...prev, otp: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                          className="w-full pl-10 pr-3 py-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text focus:ring-2 focus:ring-primary focus:border-primary text-center text-lg tracking-widest"
                          placeholder="000000"
                          maxLength={6}
                          required
                        />
                      </div>
                      <p className="text-xs text-lightText mt-1">Enter the 6-digit code sent to your email</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Username *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserPlus className="h-5 w-5 text-lightText" />
                        </div>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="Choose username"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Password *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-lightText" />
                        </div>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="Create password"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Confirm Password *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-lightText" />
                      </div>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 bg-background/50 backdrop-blur-sm border border-lightText/30 rounded-xl text-text focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Confirm password"
                        required
                      />
                    </div>
                    <p className="text-xs text-lightText mt-1">Password must be at least 8 characters long</p>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-lightText/30 text-lightText rounded-xl hover:bg-background/50 transition-all"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || !showOtpInput}
                      className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:from-primary/90 hover:to-secondary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Creating Account...
                        </div>
                      ) : (
                        'Create Department Account'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <button 
                type="button"
                onClick={() => navigate('/')}
                className="inline-flex items-center text-sm text-primary hover:text-text transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </button>
            </div>
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
