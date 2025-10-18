import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBuilding, FaMapMarkerAlt, FaUser, FaLock, FaShieldAlt, FaSyncAlt, FaArrowRight, FaTimes } from 'react-icons/fa';
import dock1 from '../assets/loginIMG/dock.jpg';
import dock2 from '../assets/loginIMG/dock2.jpg';
import dock3 from '../assets/loginIMG/dock3.jpg';
import dock4 from '../assets/loginIMG/dock4.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    companyName: 'RapptorSoft Software Solutions',
    branchName: '',
    username: '',
    password: '',
    otp: ''
  });
  
  const [showOtp, setShowOtp] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  
  const dockImages = [dock1, dock2, dock3, dock4];

  // Toast notification function
  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendOtp = async () => {
    // Validate fields with toast instead of alert
    if (!formData.branchName) {
      showToast('Please select your branch location', 'error');
      return;
    }
    if (!formData.username) {
      showToast('Please enter your username', 'error');
      return;
    }
    if (!formData.password) {
      showToast('Please enter your password', 'error');
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setShowOtp(true);
    setIsLoading(false);
    setOtpCountdown(30);
    showToast('OTP sent to your registered mobile number', 'success');
    
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!showOtp || !formData.otp) {
      showToast('Please complete OTP verification', 'error');
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Login attempt:', formData);
    showToast('Login successful! Redirecting...', 'success');
    setIsLoading(false);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % dockImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gray-900">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-2xl border-l-4 backdrop-blur-sm ${
              toast.type === 'error' 
                ? 'bg-red-500/95 text-white border-red-600' 
                : 'bg-green-500/95 text-white border-green-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex-shrink-0 w-3 h-3 rounded-full ${
                toast.type === 'error' ? 'bg-red-200' : 'bg-green-200'
              }`}></div>
              <span className="font-medium text-sm">{toast.message}</span>
              <button 
                onClick={() => setToast({ show: false, message: '', type: '' })}
                className="ml-2 text-white/80 hover:text-white transition-colors"
              >
                <FaTimes className="text-xs" />
              </button>
            </div>
            
            {/* Progress bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 4, ease: "linear" }}
              className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-xl ${
                toast.type === 'error' ? 'bg-red-300' : 'bg-green-300'
              } origin-left`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Image Container */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        {dockImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentImage === index ? 1 : 0 
            }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main Container - 60/40 RATIO */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 w-full max-w-6xl h-[80vh] flex rounded-2xl overflow-hidden shadow-2xl border border-white/10"
      >
        {/* Left Side - IMAGE SECTION (60%) */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 relative rounded-l-2xl overflow-hidden"
          style={{
            flex: '0 0 60%'
          }}
        >
          {/* Current Background Image */}
          <motion.div
            key={currentImage}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${dockImages[currentImage]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
          
          {/* Content Overlay */}
          <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
            {/* Top Logo Section */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <div className="inline-block bg-red-600/90 backdrop-blur-sm px-6 py-3 rounded-xl border border-red-400/30 shadow-xl">
                <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">
                  Rapptor<span className="font-black">Soft</span>
                </h1>
                <p className="text-red-100 text-sm font-medium">
                  software solution for small plant
                </p>
              </div>
            </motion.div>

            {/* Middle Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Innovation at Sea
              </h2>
              <p className="text-lg text-gray-200 max-w-md mx-auto">
                Leading maritime technology solutions
              </p>
            </motion.div>

            {/* Bottom Indicators */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center gap-2 mb-4"
            >
              {dockImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImage === index 
                      ? 'bg-red-500 scale-125' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - FORM SECTION (40%) */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex-1 relative bg-white/95 backdrop-blur-sm border-l border-gray-200/50"
          style={{
            flex: '0 0 40%'
          }}
        >
          {/* Form Container */}
          <div className="h-full flex flex-col justify-center p-6">
            {/* Form Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mb-6"
            >
              <div className="w-12 h-0.5 bg-red-500 rounded-full mx-auto mb-3"></div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Welcome Back</h2>
              <p className="text-gray-500 text-xs">Sign in to your maritime portal</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field Group */}
              <div className="space-y-3">
                {/* Company Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Company
                  </label>
                  <div className="relative">
                    <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      readOnly
                      className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:border-red-400 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Branch Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Branch Location
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                    <select
                      name="branchName"
                      value={formData.branchName}
                      onChange={handleChange}
                      required
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-red-400 focus:bg-white transition-all appearance-none bg-white"
                    >
                      <option value="">Select your branch</option>
                      <option value="pune">Pune Headquarters</option>
                      <option value="mumbai">Mumbai Office</option>
                      <option value="global1">Global Development Center 1</option>
                      <option value="global2">Global Development Center 2</option>
                    </select>
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      placeholder="Enter your username"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Enter your password"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* OTP Section */}
              <AnimatePresence>
                {showOtp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
                      <label className="block text-xs font-medium text-red-700 mb-2 flex items-center gap-1">
                        <FaShieldAlt className="text-red-600 text-xs" />
                        OTP Verification
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            name="otp"
                            value={formData.otp}
                            onChange={handleChange}
                            required
                            placeholder="Enter 6-digit OTP"
                            maxLength="6"
                            className="w-full pl-3 pr-3 py-2 text-sm border border-red-300 rounded-lg text-gray-700 placeholder-red-400 focus:outline-none focus:border-red-500 focus:bg-white transition-all bg-white"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={otpCountdown > 0 || isLoading}
                          className={`px-3 py-2 rounded text-xs font-medium transition-all flex items-center gap-1 min-w-20 justify-center ${
                            otpCountdown > 0 || isLoading
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                              : 'bg-red-500 text-white hover:bg-red-600 border border-red-500'
                          }`}
                        >
                          <FaSyncAlt className="text-xs" />
                          {otpCountdown > 0 ? `${otpCountdown}s` : 'Resend'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                {!showOtp ? (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isLoading}
                    className="w-full bg-red-500 text-white py-2.5 rounded-lg font-semibold hover:bg-red-600 disabled:bg-red-400 transition-all duration-200 flex items-center justify-center gap-2 text-xs shadow-sm"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        <FaShieldAlt className="text-xs" />
                        Send OTP & Continue
                        <FaArrowRight className="text-xs" />
                      </>
                    )}
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-500 text-white py-2.5 rounded-lg font-semibold hover:bg-green-600 disabled:bg-green-400 transition-all duration-200 flex items-center justify-center gap-2 text-xs shadow-sm"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <FaShieldAlt className="text-xs" />
                        Login to System
                        <FaArrowRight className="text-xs" />
                      </>
                    )}
                  </motion.button>
                )}

                <div className="text-center">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-red-500 transition-colors text-xs hover:underline"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>
            </form>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-center mt-6 pt-4 border-t border-gray-100"
            >
              <p className="text-xs text-gray-400">
                Authorized VGM Vendor • D.G. Shipping Mumbai Approved
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;