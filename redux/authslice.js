// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  authToken: null,
  userId: null, // Add userId to the initial state
  error: null,
};

export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
  try {
    const response = await axios.post('https://dummyjson.com/auth/login', {
      username,
      password,
    });

    const authToken = response.data.token;
    const userId = response.data.id;
    console.log(authToken);
    console.log('atstart' + userId);

    if (authToken) {
      return { authToken, userId };
    } else {
      throw new Error('Wrong credentials. Please try again.');
    }
  } catch (error) {
    throw new Error('An error occurred during login. Please try again.');
  }
});

// Updated resetAuthState action
export const resetAuthState = () => ({
  type: 'auth/resetState',
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Define a reducer for resetting auth state
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
        state.userId = action.payload.userId; // Set userId when login is successful
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { resetState } = authSlice.actions; // Export the resetState action
export default authSlice.reducer;
