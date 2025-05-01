import React from 'react';
import { AiOutlinePlus, AiOutlineInbox } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { openTaskForm } from '../../store/slices/uiSlice';
import Button from '../ui/Button';

const EmptyState = ({ type = 'default', title, description }) => {
  const dispatch = useDispatch();
  
  // Default texts based on type
  const defaultTexts = {
    default: {
      title: 'No tasks yet',
      description: 'Start by creating your first task'
    },
    todo: {
      title: 'No to-do tasks',
      description: 'Add a new task to get started'
    },
    'in-progress': {
      title: 'No tasks in progress',
      description: 'Move a task here when you start working on it'
    },
    completed: {
      title: 'No completed tasks',
      description: 'Tasks will appear here when completed'
    },
    error: {
      title: 'Failed to load tasks',
      description: 'Please try again later'
    }
  };
  
  // Use provided texts or defaults
  const displayTitle = title || defaultTexts[type].title;
  const displayDescription = description || defaultTexts[type].description;
  
  return (
    <div className="flex flex-col items-center justify-center p-6 my-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg text-center">
      <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
        <AiOutlineInbox className="w-8 h-8 text-gray-400" />
      </div>
      
      <h3 className="mb-2 text-lg font-medium text-gray-900">{displayTitle}</h3>
      <p className="mb-4 text-sm text-gray-500">{displayDescription}</p>
      
      {type !== 'error' && (
        <Button
          variant="primary"
          size="md"
          onClick={() => dispatch(openTaskForm())}
        >
          <AiOutlinePlus className="mr-1" />
          Add Task
        </Button>
      )}
    </div>
  );
};

export default EmptyState;