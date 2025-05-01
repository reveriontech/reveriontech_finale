import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchAllTasks, 
  selectAllTasks, 
  selectTasksStatus, 
  selectTasksError, 
  addNewTask, 
  updateExistingTask, 
  removeTask, 
  setTaskStatus,
  selectTasksByStatus
} from '../store/slices/tasksSlice';
import localTasksService from '../services/localTasksService';

export const useTasks = () => {
  const dispatch = useDispatch();
  
  // Use memoized selectors to prevent unnecessary rerenders
  const tasks = useSelector(selectAllTasks);
  const status = useSelector(selectTasksStatus);
  const error = useSelector(selectTasksError);
  
  // Load tasks on initial mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllTasks());
    }
  }, [status, dispatch]);
  
  // Task operations
  const createNewTask = (taskData) => dispatch(addNewTask(taskData));
  
  const updateTask = (id, taskData) => dispatch(updateExistingTask({ id, taskData }));
  
  const deleteTask = (id) => dispatch(removeTask(id));
  
  const changeTaskStatus = (id, status) => {
    // Update both local service and Redux state
    localTasksService.changeTaskStatus(id, status);
    dispatch(setTaskStatus({ id, status }));
  };
  
  // Get tasks by status using memoized selector
  const todoTasks = useSelector(state => selectTasksByStatus(state, 'todo'));
  const inProgressTasks = useSelector(state => selectTasksByStatus(state, 'in-progress'));
  const completedTasks = useSelector(state => selectTasksByStatus(state, 'completed'));
  
  return {
    tasks,
    status,
    error,
    isLoading: status === 'loading',
    createNewTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
    todoTasks,
    inProgressTasks,
    completedTasks
  };
};

export default useTasks;