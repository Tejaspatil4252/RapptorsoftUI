import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaBars, FaChevronDown } from 'react-icons/fa';
import navLogo from '../../assets/navIMG/rapportlogo.png';

const Navigation = ({ onToggleSidebar }) => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gray-900 backdrop-blur-lg border-b border-gray-700 px-6 py-4 shadow-2xl relative"
    >
      <div className="flex items-center justify-between">
        
        {/* Left Section - User Info */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-4"
        >
          <div className="flex items-center gap-3 group cursor-pointer">
            {/* User Avatar with Red Gradient */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <FaUser className="text-white text-lg" />
              </div>
              {/* Online Status Indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            
            {/* User Info */}
            <div className="text-left">
              <div className="flex items-center gap-2">
                <p className="text-white font-semibold text-sm">John Doe</p>
                <FaChevronDown className="text-gray-400 text-xs group-hover:text-red-400 transition-colors" />
              </div>
              <p className="text-red-400 text-xs font-medium bg-red-900/30 px-2 py-1 rounded-full inline-block">Administrator</p>
            </div>
          </div>
        </motion.div>

        {/* Right Section - Floating Logo & Menu Toggle */}
        <motion.div 
          className="flex items-center gap-6"
        >
          {/* Floating Logo - No Background Container */}
          <motion.div 
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex items-center"
          >
            <img 
              src={navLogo} 
              alt="RapptorSoft" 
              className="h-10 drop-shadow-2xl" 
              // Just the logo floating above the nav
            />
          </motion.div>

          {/* Menu Toggle */}
          <motion.button
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "#dc2626",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleSidebar}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 backdrop-blur-sm border border-red-400/30 rounded-2xl p-3 text-white transition-all duration-300 shadow-lg"
          >
            <FaBars className="text-lg" />
          </motion.button>
        </motion.div>

      </div>

      {/* Red Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500/50 to-red-600/50"></div>
    </motion.nav>
  );
};

export default Navigation;