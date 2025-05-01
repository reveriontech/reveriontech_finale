import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  currentView: 'board', // 'board' | 'table'
  taskFormOpen: false,
  currentTaskId: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    openTaskForm: (state, action) => {
      state.taskFormOpen = true;
      state.currentTaskId = action.payload || null; // If payload exists, we're editing a task
    },
    closeTaskForm: (state) => {
      state.taskFormOpen = false;
      state.currentTaskId = null;
    },
  },
});

export const { setCurrentView, openTaskForm, closeTaskForm } = uiSlice.actions;

// Basic selector for the ui state slice
const selectUiState = state => state.ui;

// Memoized selectors
export const selectCurrentView = createSelector(
  [selectUiState],
  uiState => uiState.currentView
);

export const selectTaskFormOpen = createSelector(
  [selectUiState],
  uiState => uiState.taskFormOpen
);

export const selectCurrentTaskId = createSelector(
  [selectUiState],
  uiState => uiState.currentTaskId
);

export default uiSlice.reducer;