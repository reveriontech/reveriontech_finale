import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineInbox, AiOutlineDashboard, AiOutlineProject } from 'react-icons/ai';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

const Sidebar = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (onToggle) {
        onToggle(!isOpen);
      }
  };

  // Run onToggle on initial render to sync parent component
  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen);
    }
  }, [isOpen, onToggle]);

  const menuItems = [
    { title: 'Home', path: '/portal', icon: <AiOutlineHome size={20} /> },
    { title: 'Inbox', path: '/portal/inbox', icon: <AiOutlineInbox size={20} /> },
    { divider: true },
    { title: 'Dashboard', path: '/portal/dashboard', icon: <AiOutlineDashboard size={20} /> },
    { title: 'Projects', path: '/portal/projects', icon: <AiOutlineProject size={20} /> },
  ];

  return (
    <div 
      className={`h-screen bg-[#212529] text-white fixed left-0 top-0 transition-all duration-300 z-10 flex flex-col ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <h2 className="text-xl font-bold">ReverionTech</h2>}
        <button 
          onClick={toggleSidebar}
          className={`p-2 rounded-lg hover:bg-gray-700 transition-colors ${!isOpen && 'mx-auto'}`}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <HiOutlineChevronLeft size={20} /> : <HiOutlineChevronRight size={20} />}
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            item.divider ? (
              <div key={`divider-${index}`} className="h-px bg-gray-700 my-4" />
            ) : (
              <Link
                key={index}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                title={!isOpen ? item.title : ""}
              >
                <span>{item.icon}</span>
                {isOpen && <span>{item.title}</span>}
              </Link>
            )
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-700">
        {isOpen ? (
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-gray-600"></div>
            <div>
              <p className="text-sm font-medium">User Name</p>
              <p className="text-xs text-gray-400">user@example.com</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-gray-600"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;