
"use client";
import { Grid, Box } from "@mui/material";
import React from "react";
import PatientDetailsCards from "./PatientDetailsCards";
import { useSelector } from "react-redux";

export default function PatientDetails() {
  const { patients } = useSelector((state) => state.doctorPatientsData);

  return (
    <Box>
      <Grid container spacing={2} p={5}>
        {patients?.patient_data?.map((item, index) => (
          <Grid  size={{xl:3, lg:3,  md:6, sm:12, xs:12}} key={index}>
            <PatientDetailsCards
              image_path={item?.image_path}
              name={item?.patient_name}
              score={item?.probability}
              label={item?.prediction}
              id = {item?.patient_id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}