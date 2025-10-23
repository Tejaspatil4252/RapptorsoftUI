import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUpload, 
  FaCamera, 
  FaCheck, 
  FaFile, 
  FaTimes,
  FaCloudUploadAlt,
  FaImage,
  FaFilePdf,
  FaFileWord,
  FaChartLine
} from 'react-icons/fa';
import NavLayout from '../component/nav/NavLayout.jsx';
import Camera from '../component/Camera.jsx';

const EIRUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Dynamic counters
  const [todayUploads, setTodayUploads] = useState(0);
  const [successfulUploads, setSuccessfulUploads] = useState(0);
  const [totalUploads, setTotalUploads] = useState(0);
  const [successRate, setSuccessRate] = useState(0);

  // Initialize from localStorage or set defaults
  useEffect(() => {
    const savedStats = JSON.parse(localStorage.getItem('eirUploadStats')) || {
      todayUploads: 24,
      successfulUploads: 235,
      totalUploads: 240,
      successRate: 98
    };
    
    setTodayUploads(savedStats.todayUploads);
    setSuccessfulUploads(savedStats.successfulUploads);
    setTotalUploads(savedStats.totalUploads);
    setSuccessRate(savedStats.successRate);
  }, []);

  // Update success rate whenever uploads change
  useEffect(() => {
    const newSuccessRate = totalUploads > 0 
      ? Math.round((successfulUploads / totalUploads) * 100)
      : 100;
    setSuccessRate(newSuccessRate);

    // Save to localStorage
    localStorage.setItem('eirUploadStats', JSON.stringify({
      todayUploads,
      successfulUploads,
      totalUploads,
      successRate: newSuccessRate
    }));
  }, [successfulUploads, totalUploads, todayUploads]);

  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
      }
    };
    input.click();
  };

  const handleCameraCapture = (file) => {
    setSelectedFile(file);
    setShowCamera(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Update counters - 90% chance of success for realism
          const isSuccess = Math.random() > 0.1;
          
          setTodayUploads(prev => prev + 1);
          setTotalUploads(prev => prev + 1);
          
          if (isSuccess) {
            setSuccessfulUploads(prev => prev + 1);
            setTimeout(() => {
              alert(`File "${selectedFile.name}" uploaded successfully!`);
              setSelectedFile(null);
              setUploadProgress(0);
            }, 500);
          } else {
            setTimeout(() => {
              alert(`Upload failed for "${selectedFile.name}". Please try again.`);
              setSelectedFile(null);
              setUploadProgress(0);
            }, 500);
          }
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const getFileIcon = (fileName) => {
    if (fileName?.match(/\.(jpg|jpeg|png)$/i)) return <FaImage className="text-blue-500" />;
    if (fileName?.match(/\.pdf$/i)) return <FaFilePdf className="text-red-500" />;
    if (fileName?.match(/\.(doc|docx)$/i)) return <FaFileWord className="text-blue-600" />;
    return <FaFile className="text-gray-500" />;
  };

  // Calculate average process time based on file size (simulated)
  const getAverageProcessTime = () => {
    const baseTime = 1.5; // seconds
    const fileSizeFactor = selectedFile ? (selectedFile.size / (1024 * 1024)) * 0.5 : 0;
    return (baseTime + fileSizeFactor).toFixed(1);
  };

  return (
    <NavLayout>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3"
            >
              EIR Document Upload
            </motion.h1>
            <p className="text-gray-600 text-lg">
              Upload Equipment Interchange Receipt documents for processing
            </p>
          </div>

          {/* Main Upload Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <FaCloudUploadAlt className="text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Upload Center</h2>
                    <p className="text-red-100">Supported: PDF, JPG, PNG, DOC</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">EIR</div>
                  <div className="text-red-100 text-sm">Document Type</div>
                </div>
              </div>
            </div>

            {/* Upload Area */}
            <div className="p-6 sm:p-8">
              {/* File Selection Display */}
              {selectedFile ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getFileIcon(selectedFile.name)}
                      <div>
                        <div className="flex items-center gap-2">
                          <FaCheck className="text-green-500 text-sm" />
                          <span className="font-semibold text-green-800">File Ready</span>
                        </div>
                        <p className="text-green-700 text-sm mt-1">{selectedFile.name}</p>
                        <p className="text-green-600 text-xs">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={clearSelection}
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      <FaTimes className="text-lg" />
                    </button>
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-green-700 mb-1">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                /* Empty State */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl mb-6 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={handleFileSelect}
                >
                  <FaCloudUploadAlt className="text-4xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Drop your EIR document here
                  </h3>
                  <p className="text-gray-500 text-sm">
                    or click to browse files
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    PDF, JPG, PNG, DOC up to 10MB
                  </p>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Scan Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCamera(true)}
                  className="flex items-center justify-center gap-3 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 font-semibold border border-blue-500/30 shadow-lg"
                >
                  <FaCamera className="text-xl" />
                  <span>Scan Document</span>
                </motion.button>

                {/* Upload/Select Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={selectedFile ? handleUpload : handleFileSelect}
                  disabled={isUploading}
                  className={`flex items-center justify-center gap-3 p-4 rounded-xl transition-all duration-200 font-semibold border shadow-lg ${
                    selectedFile 
                      ? 'bg-green-600 hover:bg-green-700 text-white border-green-500/30' 
                      : 'bg-red-600 hover:bg-red-700 text-white border-red-500/30'
                  } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <FaUpload className="text-xl" />
                  <span>{selectedFile ? (isUploading ? 'Uploading...' : 'Upload Now') : 'Select File'}</span>
                </motion.button>
              </div>

              {/* Dynamic Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-1">
                    <FaChartLine className="text-red-500" />
                    {todayUploads}
                  </div>
                  <div className="text-gray-500 text-sm">Today's Uploads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-1">
                    <FaCheck className="text-green-500" />
                    {successRate}%
                  </div>
                  <div className="text-gray-500 text-sm">Success Rate</div>
                  <div className="text-xs text-gray-400">
                    {successfulUploads}/{totalUploads} successful
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {getAverageProcessTime()}s
                  </div>
                  <div className="text-gray-500 text-sm">Avg. Process Time</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mt-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{todayUploads}</div>
                <div className="text-red-500 text-sm">Today</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{successRate}%</div>
                <div className="text-green-500 text-sm">Success Rate</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{totalUploads}</div>
                <div className="text-blue-500 text-sm">Total Uploads</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{successfulUploads}</div>
                <div className="text-purple-500 text-sm">Successful</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Camera Modal */}
        {showCamera && (
          <Camera 
            onClose={() => setShowCamera(false)} 
            onCapture={handleCameraCapture}
          />
        )}
      </div>
    </NavLayout>
  );
};

export default EIRUpload;