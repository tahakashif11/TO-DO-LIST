import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert } from 'react-native'

export const signUpUser = createAsyncThunk('auth/signUpUser', async (userData, { rejectWithValue }) => {
  const { email, password, username, weight, profileImage } = userData;
  console.log(email)

  try {
    if(email && password)
    {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    const imageRef = await firestore().collection('users').doc(user.uid);
    await imageRef.set({
      uri: profileImage,
      username: username,
      email: email,
      weight: weight,
    });
    return user;}
    else{
        Alert.alert(wrong)
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
