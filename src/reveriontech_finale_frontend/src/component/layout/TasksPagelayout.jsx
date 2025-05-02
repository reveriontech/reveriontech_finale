import React from 'react'
import TaskHeader from '../tasks/TaskHeader'
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineAppstore, AiOutlineTable, AiOutlinePlus } from 'react-icons/ai';
import { setCurrentView, selectCurrentView } from '../../store/slices/uiSlice';

// Components view
import BoardView from '../tasks/BoardView';
import TableView from '../tasks/TableView';

const TasksPagelayout = () => {
  const currentView = useSelector(selectCurrentView);
  const dispatch = useDispatch();

  return (
    <div className="h-screen p-6 bg-gray-50">
        <TaskHeader />
          <div className="flex bg-gray-100 rounded-lg">
               <button
                   onClick={() => dispatch(setCurrentView('board'))}
                     className={`px-4 py-2 rounded-l-lg ${
                        currentView === 'board'
                           ? 'bg-white shadow-sm text-blue-600'
                           : 'text-gray-600 hover:text-gray-900'
                        }`}
                        >
                        <AiOutlineAppstore className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => dispatch(setCurrentView('table'))}
                            className={`px-4 py-2 rounded-r-lg ${
                                currentView === 'table'
                                ? 'bg-white shadow-sm text-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                           >
                         <AiOutlineTable className="w-5 h-5" />
                      </button>
                  </div>

      {/* Main content area */}
        <div className="flex-1 overflow-hidden">
           {currentView === 'board' ? <BoardView /> : <TableView />}
         </div>
    </div>
  )
}

export default TasksPagelayout