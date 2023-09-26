// In your profileSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import  firestore  from '@react-native-firebase/firestore';
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (userId) => {
    try {
      // Assuming you have a Firestore collection named 'users'
      const userDoc = await firestore().collection('users').doc(userId).get();
      console.log('ok'+userDoc)

      if (userDoc.exists) {
        const userData = userDoc.data();
        console.log('yes'+userData)
        return userData;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw error;
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
