import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../ui/Sidebar';
import { useState } from 'react';

const Portallayout = () => {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleSidebarToggle = (isOpen) => {
        setSidebarOpen(isOpen);
      };
  return (
    <div className="flex">
      <Sidebar onToggle={handleSidebarToggle}/>

      <div 
         className={`transition-all duration-300 w-full min-h-screen bg-gray-100 ${
            sidebarOpen ? 'ml-64' : 'ml-20'
          }`}
      >
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Portallayout;