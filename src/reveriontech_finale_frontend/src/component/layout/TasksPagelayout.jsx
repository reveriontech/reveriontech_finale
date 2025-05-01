import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Redux actions
import { setCurrentView, openTaskForm, selectCurrentView } from '../../store/slices/uiSlice';
import { fetchAllTasks } from '../../store/slices/tasksSlice';
import { AiOutlineAppstore,  AiOutlineTable, AiOutlinePlus} from 'react-icons/ai';

// Components
import BoardView from '../tasks/BoardView';
import TableView from '../tasks/TableView';
import TaskForm from '../tasks/TaskForm';
import Button from '../ui/Button';



const TasksPagelayout = () => {
  const dispatch = useDispatch();
  const currentView = useSelector(selectCurrentView);
  
  // Fetch tasks on initial load
  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 py-2 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
        
        <div className="flex items-center space-x-4">
          {/* View toggle buttons */}
          <div className="flex bg-gray-100 rounded-lg">
            <button
              onClick={() => dispatch(setCurrentView('board'))}
              className={`p-2 rounded-l-lg ${
                currentView === 'board' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              aria-label="Board View"
            >
              <AiOutlineAppstore size={20} />
            </button>
            <button
              onClick={() => dispatch(setCurrentView('table'))}
              className={`p-2 rounded-r-lg ${
                currentView === 'table' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              aria-label="Table View"
            >
              <AiOutlineTable size={20} />
            </button>
          </div>
          
          {/* Add Task button using your existing Button component */}
          <Button
            onClick={() => dispatch(openTaskForm())}
            variant="primary"
            size="md"
          >
            <AiOutlinePlus className="mr-1" />
            Add Task
          </Button>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 overflow-hidden">
        {currentView === 'board' ? <BoardView /> : <TableView />}
        <TaskForm />
      </div>
    </div>
  );
};

export default TasksPagelayout;