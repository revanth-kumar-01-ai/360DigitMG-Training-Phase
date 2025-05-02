import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


const API_URL = process.env.NEXT_PUBLIC_API_SIGN_UP

export const addContact = createAsyncThunk("embryo/signup", async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, contactData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add contact");
    }
  });

// sign up user
const userSignUpSlice = createSlice({
    name: "user",
    initialState: {
      data: [],
      loading: false,
      error: null,
    },
    reducers: {},  // No manual reducers needed for async actions
    extraReducers: (builder) => {
      builder
        // 🔹 Handle POST Request
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
    },
  });
  


export default userSignUpSlice.reducer;