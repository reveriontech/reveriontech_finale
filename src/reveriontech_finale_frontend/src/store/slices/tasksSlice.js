import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import localTasksService from '../../services/localTasksService';

const initialState = {
  tasks: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Use local service instead of API calls
export const fetchAllTasks = createAsyncThunk(
  'tasks/fetchAllTasks',
  async (_, { rejectWithValue }) => {
    try {
      return await localTasksService.fetchTasks();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTask = createAsyncThunk(
  'tasks/addNewTask',
  async (taskData, { rejectWithValue }) => {
    try {
      return await localTasksService.createTask(taskData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateExistingTask = createAsyncThunk(
  'tasks/updateExistingTask',
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      return await localTasksService.updateTask(id, taskData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (id, { rejectWithValue }) => {
    try {
      await localTasksService.deleteTask(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllTasks
      .addCase(fetchAllTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle addNewTask
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      // Handle updateExistingTask
      .addCase(updateExistingTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      // Handle removeTask
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  },
});

export const { setTaskStatus } = tasksSlice.actions;

// Basic selector for the tasks state slice
const selectTasksState = state => state.tasks;

// Memoized selectors using createSelector
export const selectAllTasks = createSelector(
  [selectTasksState],
  tasksState => tasksState.tasks
);

export const selectTasksByStatus = createSelector(
  [selectAllTasks, (_, status) => status],
  (tasks, status) => tasks.filter(task => task.status === status)
);

export const selectTasksStatus = createSelector(
  [selectTasksState],
  tasksState => tasksState.status
);

export const selectTasksError = createSelector(
  [selectTasksState],
  tasksState => tasksState.error
);

// Memoized selector for board view
export const selectTasksForBoard = createSelector(
  [selectAllTasks],
  (tasks) => {
    return {
      todo: tasks.filter(task => task.status === 'todo' || !task.status),
      'in-progress': tasks.filter(task => task.status === 'in-progress'),
      completed: tasks.filter(task => task.status === 'completed')
    };
  }
);

export default tasksSlice.reducer;