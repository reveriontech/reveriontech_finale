import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTasks } from '../../hooks/useTasks';
import { openTaskForm } from '../../store/slices/uiSlice';
import { selectTasksStatus } from '../../store/slices/tasksSlice';
import {AiOutlineEdit, AiOutlineDelete, AiOutlineSortAscending, AiOutlineSortDescending,} from 'react-icons/ai';
import EmptyState from '../common/EmptyState';

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const statusLabels = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'completed': 'Completed'
};

const statusColors = {
  'todo': 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'completed': 'bg-green-100 text-green-800'
};

const TableView = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, deleteTask, changeTaskStatus } = useTasks();
  const status = useSelector(selectTasksStatus);
  
  // Sort state
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const sortedTasks = React.useMemo(() => {
    if (!tasks.length) return [];
    
    return [...tasks].sort((a, b) => {
      if (!a[sortField] && !b[sortField]) return 0;
      if (!a[sortField]) return 1;
      if (!b[sortField]) return -1;
      
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [tasks, sortField, sortDirection]);
  
  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' ? (
      <AiOutlineSortAscending className="w-4 h-4 text-gray-500" />
    ) : (
      <AiOutlineSortDescending className="w-4 h-4 text-gray-500" />
    );
  };
  
  const handleStatusChange = (taskId, newStatus) => {
    changeTaskStatus(taskId, newStatus);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          <span className="mt-2 text-sm text-gray-500">Loading tasks...</span>
        </div>
      </div>
    );
  }
  
  if (status === 'failed') {
    return <EmptyState type="error" />;
  }
  
  if (tasks.length === 0) {
    return <EmptyState title="No tasks yet" description="Create your first task to get started" />;
  }
  
  return (
    <div className="h-full overflow-hidden">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Title</span>
                    {renderSortIcon('title')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    {renderSortIcon('status')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('priority')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Priority</span>
                    {renderSortIcon('priority')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('assignee')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Assignee</span>
                    {renderSortIcon('assignee')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('dueDate')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Due Date</span>
                    {renderSortIcon('dueDate')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={task.status || 'todo'}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.priority && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{task.assignee || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => dispatch(openTaskForm(task.id))}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <AiOutlineEdit className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <AiOutlineDelete className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableView;