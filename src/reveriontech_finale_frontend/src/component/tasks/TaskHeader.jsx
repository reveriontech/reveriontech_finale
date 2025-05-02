import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useTasks } from '../../hooks/useTasks';

// Components
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';
import TaskForm from './TaskForm';

const TaskHeader = () => {
    const { createNewTask } = useTasks();
    const [isOpen, setIsOpen] = React.useState(false);
  
    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);
  
    const handleSubmit = (taskData) => {
      createNewTask(taskData);
      handleClose();
    };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 py-2 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
        
        <div className="flex items-center space-x-4">
          <Dropdown
            trigger={
              <Button 
                variant="primary" 
                size="md"
                onClick={handleOpen}>
                <AiOutlinePlus className="mr-1" />
                Add Task
              </Button>
            }
            title="Create New Task"
            isOpen={isOpen}
            onClose={handleClose}
            width="w-full max-w-md"
          >
            <TaskForm onSubmit={handleSubmit} onClose={handleClose} />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;