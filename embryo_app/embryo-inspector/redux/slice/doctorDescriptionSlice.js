import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  name: "",
  date: "",
};

const doctorDescriptionSlice = createSlice({
  name: "doctorDescription",
  initialState,
  reducers: {
    setDoctorDescription: (state, action) => {
      const { message, name, date } = action.payload;
      state.message = message;
      state.name = name;
      state.date = date;
    },
  },
});

export const { setDoctorDescription } = doctorDescriptionSlice.actions;

export default doctorDescriptionSlice.reducer;