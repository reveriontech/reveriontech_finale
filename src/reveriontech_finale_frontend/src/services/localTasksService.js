const generateId = () => Math.random().toString(36).substr(2, 9);

// In-memory task storage
let tasks = [];

// Client-side API functions
export const fetchTasks = () => {
  console.log('Fetching tasks from local memory');
  return Promise.resolve([...tasks]);
};

export const fetchTaskById = (id) => {
  console.log(`Fetching task ${id} from local memory`);
  const task = tasks.find(task => task.id === id);
  if (task) {
    return Promise.resolve({...task});
  }
  return Promise.reject(new Error('Task not found'));
};

export const createTask = (taskData) => {
  console.log('Creating new task in local memory');
  const newTask = {
    id: generateId(),
    ...taskData,
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  console.log('Current tasks:', tasks);
  return Promise.resolve({...newTask});
};

export const updateTask = (id, taskData) => {
  console.log(`Updating task ${id} in local memory`);
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    const updatedTask = {
      ...tasks[index],
      ...taskData,
      updatedAt: new Date().toISOString()
    };
    tasks[index] = updatedTask;
    console.log('Current tasks:', tasks);
    return Promise.resolve({...updatedTask});
  }
  return Promise.reject(new Error('Task not found'));
};

export const deleteTask = (id) => {
  console.log(`Deleting task ${id} from local memory`);
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== id);
  console.log('Current tasks:', tasks);
  
  if (tasks.length < initialLength) {
    return Promise.resolve({ success: true });
  }
  return Promise.reject(new Error('Task not found'));
};

export const changeTaskStatus = (id, status) => {
  console.log(`Changing status of task ${id} to ${status} in local memory`);
  return updateTask(id, { status });
};

export default {
  fetchTasks,
  fetchTaskById,
  createTask,
  updateTask,
  deleteTask,
  changeTaskStatus
};