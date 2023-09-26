// // authSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   user: null,
//   authToken: null,
//   userId: null, // Add userId to the initial state
//   error: null,
// };

// export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
//   try {
//     const response = await axios.post('https://dummyjson.com/auth/login', {
//       username,
//       password,
//     });

//     const authToken = response.data.token;
//     const userId = response.data.id;
//     console.log(authToken);
//     console.log('atstart' + userId);

//     if (authToken) {
//       return { authToken, userId };
//     } else {
//       throw new Error('Wrong credentials. Please try again.');
//     }
//   } catch (error) {
//     throw new Error('An error occurred during login. Please try again.');
//   }
// });

// // Updated resetAuthState action
// export const resetAuthState = () => ({
//   type: 'auth/resetState',
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     // Define a reducer for resetting auth state
//     resetState: (state) => {
//       state.userId = null;
//       state.authToken = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {})
//       .addCase(login.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.authToken = action.payload.authToken;
//         state.userId = action.payload.userId; // Set userId when login is successful
//         state.error = null;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.error = action.error.message;
//       });
//   },
// });

// export const { resetState } = authSlice.actions; // Export the resetState action
// export default authSlice.reducer;
// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'; // Import redux-persist
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth'; // Import Firebase Auth
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
      const authToken = userCredential.user.uid; // Using the UID as authToken
      const userId = userCredential.user.email; // Use email as userId for comparison

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

export const { resetState } = authSlice.actions; // Export the resetState action
export default persistReducer(persistConfig,authSlice.reducer);
