// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define an initial state for the authentication slice
const initialState = {
  user: null,
  authToken: null,
  loading: false, // Add the loading state
  error: null,
};

// Define an async thunk for user login
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  try {
    const response = await axios.post('https://dummyjson.com/auth/login', credentials);

    if (response.data.token) {
      // Save the user token and data to AsyncStorage
      await AsyncStorage.setItem('authToken', response.data.token);
      await AsyncStorage.setItem('userid', response.data.id.toString());

      // Return the user data
      return response.data;
    } else {
      throw new Error('Wrong credentials. Please try again.');
    }
  } catch (error) {
    throw error;
  }
});

// Create the authentication slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Define any additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.authToken = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the action creators and reducer
export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
