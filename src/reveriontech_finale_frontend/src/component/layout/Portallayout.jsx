import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../ui/Sidebar';

const Portallayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen bg-gray-100">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Portallayout;