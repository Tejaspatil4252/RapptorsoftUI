import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCamera, FaTimes, FaCheck, FaRedo } from 'react-icons/fa';

const Camera = ({ onClose, onCapture }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    startCamera();
    
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Prefer rear camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setIsLoading(false);
    } catch (err) {
      setError('Failed to access camera. Please check permissions.');
      setIsLoading(false);
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], `scan-${Date.now()}.jpg`, { 
          type: 'image/jpeg' 
        });
        
        onCapture(file);
        stopCamera();
        onClose();
      }, 'image/jpeg', 0.8);
    }
  };

  const switchCamera = async () => {
    stopCamera();
    await startCamera();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/80 text-white z-10">
        <h2 className="text-lg font-semibold">Document Scanner</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <FaTimes className="text-xl" />
        </button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative bg-black">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p>Starting camera...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center p-4">
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={startCamera}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Video Element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />

        {/* Camera Overlay - Document frame */}
        {!isLoading && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-2 border-white/50 rounded-lg w-64 h-80 bg-transparent">
              <div className="text-white text-center mt-2 text-sm">
                Align document within frame
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Camera Controls */}
      {!isLoading && !error && (
        <div className="p-6 bg-black/80 flex justify-center gap-6">
          {/* Switch Camera Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={switchCamera}
            className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <FaRedo className="text-lg" />
          </motion.button>

          {/* Capture Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={capturePhoto}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-gray-300 hover:border-gray-400 transition-colors"
          >
            <FaCamera className="text-2xl text-gray-700" />
          </motion.button>

          {/* Placeholder for symmetry */}
          <div className="w-12 h-12"></div>
        </div>
      )}
    </motion.div>
  );
};

export default Camera;