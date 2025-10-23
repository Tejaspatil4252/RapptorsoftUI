import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaHome, FaShip, FaChartBar, FaWarehouse, 
  FaUsers, FaFileInvoice, FaDatabase, FaShieldAlt, 
  FaCog, FaSignOutAlt, FaAnchor, FaUpload, FaCamera,
  FaCheck, FaFile
} from 'react-icons/fa';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, onClose }) => {
  const [eriUploadExpanded, setEriUploadExpanded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const menuItems = [
    { icon: FaHome, label: 'Dashboard', path: '/dashboard' },
    { icon: FaShip, label: 'Vessel Management', path: '/vessels' },
    { icon: FaChartBar, label: 'Operations', path: '/operations' },
    { icon: FaWarehouse, label: 'Inventory', path: '/inventory' },
    { icon: FaUsers, label: 'Crew Management', path: '/crew' },
    { icon: FaFileInvoice, label: 'Documentation', path: '/documents' },
    { 
      type: 'expandable',
      icon: FaUpload, 
      label: 'EIR Upload', 
      expanded: eriUploadExpanded,
      onToggle: () => setEriUploadExpanded(!eriUploadExpanded)
    },
    { icon: FaDatabase, label: 'Reports & Analytics', path: '/reports' },
    { icon: FaShieldAlt, label: 'Compliance', path: '/compliance' },
    { icon: FaCog, label: 'Settings', path: '/settings' },
  ];

  const handleScan = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          console.log('Camera accessed successfully');
          onClose();
          // Show camera component in your main app
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
          alert('Cannot access camera. Please check permissions.');
        });
    } else {
      alert('Camera not supported on this device.');
    }
  };

  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        console.log('File selected:', file.name);
      }
    };
    input.click();
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile.name);
      // Simulate upload process
      setTimeout(() => {
        alert(`File "${selectedFile.name}" uploaded successfully!`);
        setSelectedFile(null);
        setEriUploadExpanded(false);
        onClose();
      }, 1000);
    } else {
      alert('Please select a file first.');
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-80 bg-gray-900 shadow-2xl z-50 border-l border-red-500/30 flex flex-col"
          >
            {/* Sidebar Header */}
            <div className="flex-shrink-0">
              <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FaAnchor className="text-white text-lg" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-lg">RapptorSoft</h2>
                    <p className="text-red-400 text-xs">Maritime Portal</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl flex items-center justify-center text-red-400 hover:text-white transition-all"
                >
                  <FaTimes className="text-lg" />
                </motion.button>
              </div>
            </div>

            {/* Menu Items */}
            <div className={`flex-1 overflow-y-auto ${styles.scrollContainer}`}>
              <div className="p-4 space-y-2">
                {menuItems.map((item, index) => (
                  <div key={item.label || item.path}>
                    {item.type === 'expandable' ? (
                      /* Expandable ERI Upload Item - No Arrow */
                      <div className="space-y-2">
                        <motion.button
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ 
                            x: 4,
                            backgroundColor: "rgba(220, 38, 38, 0.15)",
                          }}
                          onClick={item.onToggle}
                          className="flex items-center w-full p-3 rounded-xl text-gray-300 hover:text-white transition-all duration-200 group cursor-pointer border border-transparent hover:border-red-500/20"
                        >
                          <div className="flex items-center gap-4">
                            <item.icon className="text-lg text-red-400 group-hover:text-white transition-colors" />
                            <span className="font-medium text-sm">{item.label}</span>
                          </div>
                        </motion.button>

                        {/* Expanded Options */}
<AnimatePresence>
  {item.expanded && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="ml-4 space-y-3 overflow-hidden"
    >
      {/* Selected File Display - Green */}
      {selectedFile && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-900/20 border border-green-500/30 rounded-lg p-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-400 text-sm" />
              <span className="text-green-400 text-xs font-medium">File Selected</span>
            </div>
            <button
              onClick={clearSelection}
              className="text-green-300 hover:text-green-100 text-xs"
            >
              Change
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <FaFile className="text-green-400 text-xs" />
            <span className="text-green-300 text-xs truncate">
              {selectedFile.name}
            </span>
          </div>
          <div className="text-green-400 text-xs mt-1">
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </div>
        </motion.div>
      )}

      {/* Action Buttons - Sleek & Modern */}
      <div className="grid grid-cols-2 gap-2">
        {/* Scan Button - Blue */}
        <motion.button
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleScan}
          className="flex items-center justify-center gap-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-medium border border-blue-500/30"
        >
          <FaCamera className="text-xs" />
          <span>Scan</span>
        </motion.button>

        {/* Upload/Select Button - Red */}
        <motion.button
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          whileHover={{ scale: 1.02 }}
          onClick={selectedFile ? handleUpload : handleFileSelect}
          className="flex items-center justify-center gap-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 text-sm font-medium border border-red-500/30"
        >
          <FaUpload className="text-xs" />
          <span>{selectedFile ? 'Upload' : 'Select'}</span>
        </motion.button>
      </div>
    </motion.div>
  )}
</AnimatePresence>
                      </div>
                    ) : (
                      /* Regular Menu Item */
                      <motion.a
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ 
                          x: 4,
                          backgroundColor: "rgba(220, 38, 38, 0.15)",
                        }}
                        href={item.path}
                        className="flex items-center gap-4 p-3 rounded-xl text-gray-300 hover:text-white transition-all duration-200 group cursor-pointer border border-transparent hover:border-red-500/20"
                      >
                        <item.icon className="text-lg text-red-400 group-hover:text-white transition-colors" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </motion.a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="flex-shrink-0 border-t border-gray-700 bg-gray-800/50">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <FaUsers className="text-white text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">John Doe</p>
                    <p className="text-red-400 text-xs">Administrator</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: "#dc2626",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 w-full p-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 shadow-lg mb-2"
                >
                  <FaSignOutAlt className="text-sm" />
                  <span className="font-medium text-sm">Logout System</span>
                </motion.button>
                
                <div className="text-center">
                  <p className="text-xs text-red-400 font-mono">RapptorSoft v2.1.0</p>
                  <p className="text-xs text-gray-500 mt-1">Maritime Management Suite</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;