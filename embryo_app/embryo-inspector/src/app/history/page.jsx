"use client";
import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PatientDetails from "../_components-history/PatientDetails";
import { useSelector, useDispatch } from "react-redux";
import { fetchDoctorPatients } from "../../../redux/slice/doctorPatientsSlice";

export default function Page() {
  const { patients, loading, error } = useSelector(
    (state) => state.doctorPatientsData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo?.doctor_id) {
      dispatch(fetchDoctorPatients(userInfo.doctor_id));
    }
  }, [dispatch]);

  const data = patients?.patient_data;

  return (
    <Box
      component={"section"}
      sx={{
        minHeight: "100vh",
        width: { xl: "90%", lg: "80%", md: "80%", sm: "80%", xs: "90%" },
        margin: "0 auto",
        paddingTop: "64px",
      }}
    >
      {/* Loading Spinner ⏳ */}
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      )}

      {/* Error message ❌ */}
      {error && (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      )}

      {/* No data message ❗ */}
      {!loading && !error && data?.length === 0 && (
        <Typography
          textAlign="center"
          mt={5}
          fontSize="18px"
          color="text.secondary"
        >
          🚫 No Patient Data Found
        </Typography>
      )}

      {/* Show Patient Details if data available ✅ */}
      {!loading && !error && data?.length > 0 && <PatientDetails />}
    </Box>
  );
}
