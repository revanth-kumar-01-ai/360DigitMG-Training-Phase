"use client";

import { Box } from "@mui/material";
import React from "react";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import {
  ParagraphFont,
  ParagraphFont2,
  SubHeadingSmall,
} from "../../../components/fonts";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

export default function Right_Side() {
  return (
    <>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <LocalHospitalOutlinedIcon fontSize="large" color="primary" />
        <SubHeadingSmall
          sx={{
            fontWeight: "bolder",
          }}
        >
          MediCare Pro
        </SubHeadingSmall>
      </Box>
      <ParagraphFont>Professional Healthcare Portal</ParagraphFont>
      <Box
        component={"div"}
        sx={{
          width: "450px",
          height: "300px",
          backgroundColor: "yellow",
          borderRadius: "10px",
        }}
      >
        <img
          src={
            "https://images.pexels.com/photos/6149010/pexels-photo-6149010.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
          alt="image"
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "10px",
            objectFit: "fill",
          }}
        />
      </Box>
      <ParagraphFont2
        sx={{
          background: "#fff",
          padding: "5px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          borderRadius: "10px",
        }}
      >
        <ShieldOutlinedIcon color="primary" /> Secure Access
      </ParagraphFont2>
    </>
  );
}
