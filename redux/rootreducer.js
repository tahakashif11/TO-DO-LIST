// rootReducer.js
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import taskReducer from './taskSlice'; // Import your task reducer
import profileReducer from './profileSlice'; // Import your profile reducer

const rootReducer = combineReducers({
  tasks: taskReducer,
  profile: profileReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Optionally, you can whitelist specific reducers if needed:
  // whitelist: ['tasks', 'profile'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
