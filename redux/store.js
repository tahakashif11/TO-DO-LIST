// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist'; 
import persistedReducer from './rootreducer'; 

const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false, 
    });
  },
  
});

const persistor = persistStore(store);

export { store, persistor };
