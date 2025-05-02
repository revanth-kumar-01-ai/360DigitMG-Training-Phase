import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


const API_URL = process.env.NEXT_PUBLIC_API_SIGN_IN

export const signInAsync = createAsyncThunk("embryo/signup", async (signInUserData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, signInUserData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add contact");
    }
  });

// login user 
const userSignInSlice = createSlice({
    name: "user",
    initialState: {
      signInData: [],
      signInLoading: false,
      signInError: null,
    },
    reducers: {},  // No manual reducers needed for async actions
    extraReducers: (builder) => {
      builder
        // 🔹 Handle POST Request
      .addCase(signInAsync.pending, (state) => {
        state.signInLoading = true;
        state.signInError = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.signInLoading = false;
        state.signInData.push(action.payload);
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.signInLoading = false;
        state.signInError = action.payload;
      });
      
    },
  });
  


export default userSignInSlice.reducer;