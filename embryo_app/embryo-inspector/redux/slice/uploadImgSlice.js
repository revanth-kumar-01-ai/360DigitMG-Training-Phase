import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_PREDICTION


export const patientImageUpload = createAsyncThunk(
  "embryo/upload",
  async ({ id, uploadImage }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/${id}`,
        uploadImage
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Upload failed ❌");
    }
  }
);

const uploadImgSlice = createSlice({
  name: "userUploadUImage",
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(patientImageUpload.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patientImageUpload.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(patientImageUpload.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default uploadImgSlice.reducer;
