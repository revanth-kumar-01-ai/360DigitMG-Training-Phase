import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_DOCTOR_PATIENTS; 

// 🧠 Thunk for getting all patients handled by a doctor
export const fetchDoctorPatients = createAsyncThunk(
  "doctor/fetchDoctorPatients",
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${doctorId}`);
      return response.data; // should be an array of patients
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch failed ❌");
    }
  }
);


const doctorPatientsSlice = createSlice({
  name: "doctorPatients",
  initialState: {
    patients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload; // store array of patients
      })
      .addCase(fetchDoctorPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default doctorPatientsSlice.reducer;
