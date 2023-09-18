// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist'; // Remove persistReducer import
import persistedReducer from './rootreducer'; // Import your combined reducer

const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false, // Disable serializable action check
    });
  },
  // Use the persisted reducer
});

const persistor = persistStore(store);

export { store, persistor };
