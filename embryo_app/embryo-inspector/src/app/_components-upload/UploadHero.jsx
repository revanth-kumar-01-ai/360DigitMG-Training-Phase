"use client";
import { Box } from "@mui/material";
import { ParagraphFont1, SubHeadingFont } from "../../../components/fonts";

export default function UploadHero() {
  return (
    <Box
      component={"div"}
      sx={{
        textAlign: "center",
      }}
    >
      <SubHeadingFont pt={5}>Upload Embryo Image</SubHeadingFont>
      <ParagraphFont1 pt={1}>Get AI-powered Quality Prediction</ParagraphFont1>
    </Box>
  );
}
