// rootReducer.js
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileReducer from './profileSlice'; 
import authReducer from './authslice'

const rootReducer = combineReducers({
  profile: profileReducer,
  auth: authReducer, 
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
