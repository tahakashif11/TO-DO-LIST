// taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    nextId: 1,
    showCompleteTasks: false,
    showIncompleteTasks: false,
    searchQuery: '',
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ id: state.nextId, text: action.payload, completed: false });
      state.nextId++;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    editTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.text = action.payload.text;
        console.log(task)
        console.log(task.text)
      }
    },
    setShowCompleteTasks: (state, action) => {
      state.showCompleteTasks = action.payload;
    },
    setShowIncompleteTasks: (state, action) => {
      state.showIncompleteTasks = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetState: (state) => {
      // Reset the state to its initial values here
      state.tasks = [];
      state.nextId = 1;
      state.showCompleteTasks = false;
      state.showIncompleteTasks = false;
      state.searchQuery = '';
    },
    
    
      
  },
});

export const {
  addTask,
  deleteTask,
  toggleComplete,
  editTask,
  setShowCompleteTasks,
  setShowIncompleteTasks,
  setSearchQuery,
  resetState

 
} = taskSlice.actions;

export default taskSlice.reducer;
