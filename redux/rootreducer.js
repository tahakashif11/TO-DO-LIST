// rootReducer.js
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import taskReducer from './taskSlice'; // Import your task reducer
import profileReducer from './profileSlice'; // Import your profile reducer
import authReducer from './authslice'

const rootReducer = combineReducers({
  tasks: taskReducer,
  profile: profileReducer,
  auth: authReducer, 
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
