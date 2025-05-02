import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_SINGLE_PATIENT; 

// 🧠 Thunk for GET request
export const fetchSinglePatient = createAsyncThunk(
  "embryo/fetchSinglePatient",
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${patientId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch failed ❌");
    }
  }
);

// 🧬 Slice
const singlePatientSlice = createSlice({
  name: "singlePatientDetails",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSinglePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSinglePatient.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSinglePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default singlePatientSlice.reducer;
