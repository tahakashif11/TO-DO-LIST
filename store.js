// Create a file named 'store.js'
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import profileReducer from './profileSlice'; 


const store = configureStore({
  reducer: {
    tasks: taskReducer,
    profile: profileReducer,
  },
});

export default store;
