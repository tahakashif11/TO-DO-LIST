
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth';
const initialState = {
  user: null,
  authToken: null,
  userId: null,
  error: null,
};

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);

    if (userCredential.user) {
      const authToken = userCredential.user.uid; 
      const userId = userCredential.user.email;

      return { authToken, userId };
    } else {
      throw new Error('Wrong credentials. Please try again.');
    }
  } catch (error) {
    throw new Error('An error occurred during login. Please try again.');
  }
});


export const resetAuthState = () => ({
  type: 'auth/resetState',
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: (state) => {
      state.userId = null;
      state.authToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {})
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authToken = action.payload.authToken;
        state.userId = action.payload.userId;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  
};

export const { resetState } = authSlice.actions; 
export default persistReducer(persistConfig,authSlice.reducer);
