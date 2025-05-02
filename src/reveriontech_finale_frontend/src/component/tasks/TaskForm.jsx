import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeTaskForm, selectCurrentTaskId, selectTaskFormOpen } from '../../store/slices/uiSlice';
import { useTasks } from '../../hooks/useTasks';
import Button from '../ui/Button';
import { AiOutlineClose } from 'react-icons/ai';
import Dropdown from '../ui/Dropdown';

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

const initialTaskData = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: '',
  assignee: ''
};

const TaskForm = ({ onSubmit, onClose }) => {
  const dispatch = useDispatch();
  const { tasks } = useTasks();
  const currentTaskId = useSelector(selectCurrentTaskId);
  const [formData, setFormData] = useState(initialTaskData);
  const [errors, setErrors] = useState({});
  
  const isEditMode = Boolean(currentTaskId);
  
  // Populate form data if editing an existing task
  useEffect(() => {
    if (currentTaskId && tasks.length > 0) {
      const taskToEdit = tasks.find(task => task.id === currentTaskId);
      if (taskToEdit) {
        // Format due date for input if it exists
        const formattedTask = {
          ...taskToEdit,
          dueDate: taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : ''
        };
        setFormData(formattedTask);
      }
    } else {
      setFormData(initialTaskData);
    }
  }, [currentTaskId, tasks]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const taskData = {
      ...formData,
      // Add any additional processing here
    };
    
    onSubmit(taskData);
    onClose();
    setFormData(initialTaskData);
  };
  
    return (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title Section */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>
          
            {/* Description Section */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          
            {/* Status and Priority Section */}
            <div className="grid grid-cols-2 gap-6">
              {/* Status */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Priority */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {priorityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          
            {/* Due Date and Assignee Section */}
            <div className="grid grid-cols-2 gap-6">
              {/* Due Date */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              {/* Assignee */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Assignee</label>
                <input
                  type="text"
                  name="assignee"
                  value={formData.assignee}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter name"
                />
              </div>
            </div>
          
            {/* Action Buttons */}
            <div className="flex justify-end pt-4 space-x-3 border-t border-gray-200">
              <Button 
                variant="outline" 
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="primary"
              >
                {isEditMode ? 'Update Task' : 'Create Task'}
              </Button>
            </div>
          </form>
  );
};

export default TaskForm;