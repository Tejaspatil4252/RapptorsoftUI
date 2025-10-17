import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaMapMarkerAlt, FaUser, FaLock, FaShieldAlt, FaSyncAlt } from 'react-icons/fa';
import dock from '../assets/loginIMG/dock.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    companyName: 'Rapportsoft Consulting & Technology',
    branchName: '',
    username: '',
    password: '',
    otp: ''
  });
  
  const [showOtp, setShowOtp] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendOtp = () => {
    setShowOtp(true);
    setOtpCountdown(30);
    
    const timer = setInterval(() => {
      setOtpCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative bg-gray-900"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${dock})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Rapportsoft</h1>
            <p className="text-blue-100 text-sm">Maritime Technology Solutions Since 2005</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Company Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaBuilding className="text-blue-600" />
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                readOnly
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Branch Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaMapMarkerAlt className="text-blue-600" />
                Branch Name
              </label>
              <select
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Branch</option>
                <option value="pune">Pune Headquarters</option>
                <option value="mumbai">Mumbai Office</option>
                <option value="global1">Global Development Center 1</option>
                <option value="global2">Global Development Center 2</option>
              </select>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaUser className="text-blue-600" />
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaLock className="text-blue-600" />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* OTP Section - Only shows after initial auth */}
            {showOtp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2"
              >
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaShieldAlt className="text-green-600" />
                  OTP Verification
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    required
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpCountdown > 0}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                      otpCountdown > 0 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <FaSyncAlt />
                    {otpCountdown > 0 ? `${otpCountdown}s` : 'Retry'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              {!showOtp ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaShieldAlt />
                  Send OTP & Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Login to System
                </button>
              )}

              <button
                type="button"
                className="w-full text-gray-600 py-2 rounded-lg font-medium hover:text-blue-600 transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Authorized VGM Vendor • D.G. Shipping Mumbai Approved
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;