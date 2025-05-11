import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineInbox, AiOutlineDashboard, AiOutlineProject, AiOutlineCheckSquare} from 'react-icons/ai';
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineChevronUp, HiOutlineChevronDown  } from 'react-icons/hi';
import Dropdown from './Dropdown';
import { Session } from '../../routes/ProtectedRoutes'
import { signoutII } from '../../services/authWithNFID'

const Sidebar = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isTasksOpen, setIsTasksOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Toggle sidebar open/close state
  const toggleSidebar = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (onToggle) {
      onToggle(newIsOpen);
    }
  };

  // Run onToggle on initial render to sync parent component
  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen);
    }
  }, [onToggle]);

  const toggleTasksDropdown = () => {
    setIsTasksOpen(!isTasksOpen);
  };

  const handleCreateTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const {
		userIdentity,
        principalId,
        userData
	} = Session()

  const menuItems = [
    { title: 'Home', path: '/portal', icon: <AiOutlineHome size={20} /> },
    { title: 'Inbox', path: '/inbox', icon: <AiOutlineInbox size={20} /> },
    { divider: true },
    { title: 'Dashboard', path: '/dashboard', icon: <AiOutlineDashboard size={20} /> },
    { title: 'Projects', path: '/projects', icon: <AiOutlineProject size={20} /> },
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
                className="flex items-center text-sm gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                title={!isOpen ? item.title : ""}
              >
                <span>{item.icon}</span>
                {isOpen && <span>{item.title}</span>}
              </Link>
            )
          ))}

         {/* Tasks Item with Dropdown */}
          <div className="relative">
              <button
                onClick={toggleTasksDropdown}
                className="w-full flex items-center justify-between text-sm gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                title={!isOpen ? "Tasks" : ""}
              >
                <div className="flex items-center gap-3">
                  <span><AiOutlineCheckSquare size={20} /></span>
                  {isOpen && <span>Tasks</span>}
                </div>
                {isOpen && (
                  <span>
                    {isTasksOpen ? <HiOutlineChevronUp size={16} /> : <HiOutlineChevronDown size={16} />}
                  </span>
                )}
              </button>
              
              {/* Tasks Dropdown Component */}
              {isOpen && (
                <Dropdown 
                  isOpen={isTasksOpen}
                  items={tasks}
                  onCreateItem={handleCreateTask}
                  linkPath="/taskspage"
                />
              )}
            </div>

             {/* Task list */}
            {isOpen && !isTasksOpen && tasks.length > 0 && (
              <div className="pl-10 mt-1 space-y-1">
                {tasks.map((task, index) => (
                  <Link
                    key={index}
                    to="/taskspage"
                    className="flex items-center text-sm py-2 text-gray-300 hover:text-gray-100"
                  >
                    <span>{task.title}</span>
                  </Link>
                ))}
              </div>
            )}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-700">
        {isOpen ? (
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-gray-600"></div>
            <div>
              <p className="text-sm font-medium">{userData?.username?.split('@')[0] || "Null"}</p>
              <p className="text-xs text-gray-400">{userData?.username?.split('@')[0] || ""}</p>
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

Sidebar.propTypes = {
  onToggle: PropTypes.func
};

export default Sidebar;