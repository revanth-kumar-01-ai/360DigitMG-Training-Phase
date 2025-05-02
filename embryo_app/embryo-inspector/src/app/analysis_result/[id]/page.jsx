"use client";

import { Box, Typography, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import Score from "../../_components-analysis_result/Score";
import VisualImages from "../../_components-analysis_result/VisualImages";
import Insights from "../../_components-analysis_result/Insights";
import DoctorComments from "../../_components-analysis_result/DoctorComments";
import Footer from "../../_components-Footer/Footer";
import TitleBar from "../../_components-analysis_result/TitleBar";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePatient } from "../../../../redux/slice/singlePatientSlice";

export default function Page() {
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.single_patient);

  useEffect(() => {
    if (id) {
      dispatch(fetchSinglePatient(id));
    }
  }, [id]);

  const details = data?.patient_data?.[0];

  // if(details)
  // {
  //   console.log(details);

  // }

  return (
    <>
      {/* Header */}
      <TitleBar details={details} />

      <Box
        component="section"
        sx={{
          minHeight: "100vh",
          width: { xl: "90%", lg: "80%", md: "80%", sm: "80%", xs: "90%" },
          margin: "0 auto",
          paddingTop: "64px",
        }}
      >
        {/* ⏳ Loading */}
        {loading && (
          <Box textAlign="center" py={5}>
            <CircularProgress />
            <Typography mt={2}>Loading patient details... ⏳</Typography>
          </Box>
        )}

        {/* ❌ Error */}
        {error && (
          <Box textAlign="center" py={5} color="red">
            <Typography>Error: {error} ❌</Typography>
          </Box>
        )}

        {/* ✅ Success */}
        {!loading && !error && details && (
          <>
            <Score details={details} />
            <VisualImages details={details} />
            <Insights details={details} />
            <DoctorComments details={details} />
          </>
        )}

        {/* ⚠️ No Data */}
        {!loading && !error && !details && (
          <Box textAlign="center" py={5}>
            <Typography>loading</Typography>
          </Box>
        )}
      </Box>

      <Footer />
    </>
  );
}
