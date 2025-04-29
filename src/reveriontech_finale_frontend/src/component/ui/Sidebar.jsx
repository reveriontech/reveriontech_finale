import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { title: 'Dashboard', path: '/portal' },
    { title: 'Profile', path: '/portal/profile'},
    { title: 'Settings', path: '/portal/settings' },
    { title: 'Help', path: '/portal/help' },
  ];

  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed left-0 top-0">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">ReverionTech</h2>
        <nav>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg mb-1 transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;