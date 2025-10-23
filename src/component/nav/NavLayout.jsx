import React, { useState } from 'react';
import Navigation from './Navigation';
import Sidebar from './Sidebar';

const NavLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main content */}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default NavLayout;