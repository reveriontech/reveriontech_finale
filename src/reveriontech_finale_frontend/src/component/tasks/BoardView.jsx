import React from 'react';
import { useSelector } from 'react-redux';
import TaskCard from './TaskCard';
import { selectTasksStatus, selectTasksForBoard } from '../../store/slices/tasksSlice';
import { AiOutlineInbox } from 'react-icons/ai';
import EmptyState from '../common/EmptyState';

const BoardColumn = ({ title, tasks, status }) => {
  return (
    <div className="flex flex-col w-full min-w-[280px] bg-gray-100 rounded-lg p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-200 rounded-full">
          {tasks.length}
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-20 p-4 text-sm text-gray-500 bg-white border-2 border-dashed border-gray-200 rounded-lg">
            <AiOutlineInbox size={20} className="mb-1" />
            <span>No tasks</span>
          </div>
        )}
      </div>
    </div>
  );
};

const BoardView = () => {
  // Use the memoized selector to get tasks grouped by status
  const tasksByStatus = useSelector(selectTasksForBoard);
  const status = useSelector(selectTasksStatus);
  const isLoading = status === 'loading';
  
  // Check if there are any tasks
  const isEmpty = Object.values(tasksByStatus).every(group => group.length === 0);
  
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
  
  // If completely empty, show empty state
  if (isEmpty) {
    return <EmptyState />;
  }
  
  return (
    <div className="h-full">
      <div className="flex space-x-4 overflow-x-auto pb-4 h-[calc(100vh-180px)]">
        <BoardColumn title="To Do" tasks={tasksByStatus.todo} status="todo" />
        <BoardColumn title="In Progress" tasks={tasksByStatus['in-progress']} status="in-progress" />
        <BoardColumn title="Completed" tasks={tasksByStatus.completed} status="completed" />
      </div>
    </div>
  );
};

export default BoardView;