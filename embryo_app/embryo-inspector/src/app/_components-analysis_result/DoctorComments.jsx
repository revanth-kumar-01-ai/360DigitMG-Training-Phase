"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { ParagraphFont } from "../../../components/fonts";
import TextField from "@mui/material/TextField";
import { setDoctorDescription } from "../../../redux/slice/doctorDescriptionSlice";
import { useDispatch } from "react-redux";

export default function DoctorComments() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    message: "",
    name: "",
    date: "",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
    dispatch(setDoctorDescription(formData));
  };

  // if(message)
  // {
  //   console.log(message, name, date);

  // }

  return (
    <Box component={"div"} paddingBottom={2}>
      <ParagraphFont pt={3} pb={2}>
        Doctor's Comments
      </ParagraphFont>

      <TextField
        label="Comments"
        multiline
        rows={5}
        variant="outlined"
        fullWidth
        value={formData.message}
        onChange={handleChange("message")}
        sx={{ marginBottom: "10px" }}
      />

      <Box
        component={"div"}
        sx={{
          minHeight: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xl: "center",
            lg: "center",
            md: "none",
            sm: "none",
            xs: "none",
          },
          flexDirection: {
            xl: "row",
            lg: "row",
            md: "column",
            sm: "column",
            xs: "column",
          },
          rowGap: { xl: 0, lg: 0, md: "15px", sm: "15px", xs: "15px" },
        }}
      >
        {/* Doctor Name */}
        <TextField
          id="standard-text"
          label="Doctor Name"
          variant="standard"
          type="text"
          value={formData.name}
          onChange={handleChange("name")}
        />

        {/* Date */}
        <TextField
          label=" "
          id="standard-date"
          variant="standard"
          type="date"
          value={formData.date}
          onChange={handleChange("date")}
        />
      </Box>
    </Box>
  );
}
