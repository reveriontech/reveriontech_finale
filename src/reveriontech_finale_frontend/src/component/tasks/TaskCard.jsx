import React from 'react';
import { useDispatch } from 'react-redux';
import { openTaskForm } from '../../store/slices/uiSlice';
import { useTasks } from '../../hooks/useTasks';
import { AiOutlineClockCircle, AiOutlineEdit, AiOutlineDelete, AiOutlineCheck } from 'react-icons/ai';

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const { changeTaskStatus, deleteTask } = useTasks();
  
  const handleStatusChange = (e) => {
    changeTaskStatus(task.id, e.target.value);
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-3">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
        <div className="flex space-x-1">
          <button 
            onClick={() => dispatch(openTaskForm(task.id))}
            className="p-1 text-gray-400 rounded hover:bg-gray-100"
          >
            <AiOutlineEdit className="w-4 h-4" />
          </button>
          <button 
            onClick={() => deleteTask(task.id)}
            className="p-1 text-gray-400 rounded hover:bg-gray-100 hover:text-red-500"
          >
            <AiOutlineDelete className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {task.description && (
        <p className="mb-3 text-sm text-gray-600">{task.description}</p>
      )}
      
      <div className="flex flex-wrap items-center justify-between mt-3">
        <div className="flex items-center space-x-2">
          {task.dueDate && (
            <div className="flex items-center text-xs text-gray-500">
              <AiOutlineClockCircle className="w-3 h-3 mr-1" />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
          
          {task.priority && (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          )}
          
          {task.assignee && (
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">{task.assignee.slice(0, 2).toUpperCase()}</span>
              </div>
            </div>
          )}
        </div>
        
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="mt-2 text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TaskCard;