"use client";
import { Box } from "@mui/material";
import {
  ParagraphFont1,
  ParagraphFont,
  ParagraphFont2,
} from "../../../components/fonts";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useRef, useState } from "react";
import Preview from "./Preview";
import PredictionAlertDialogSlide from "./PredictionAlertDialogSlide";

export default function DragAndDrop() {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const processImageFile = (file) => {
    const maxSizeMB = 10;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file && file.type.startsWith("image/")) {
      if (file.size > maxSizeBytes) {
        alert("❌ File too big! Max 10MB allowed.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("❌ Only image files are allowed!");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    processImageFile(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processImageFile(file);
  };

  return (
    <>
      <Box
        component={"div"}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        sx={{
          width: { xl: "40%", lg: "40%", md: "80%", sm: "80%", xs: "80%" },
          height: "220px",
          border: "2px dashed #888",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#888",
          backgroundColor: "#f6fafb",
          margin: "1rem auto",
          cursor: "pointer",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <CloudUploadOutlinedIcon fontSize="large" />
        <ParagraphFont sx={{ textAlign: "center" }}>
          Drag and drop your embryo image here
        </ParagraphFont>
        <ParagraphFont1 sx={{ textAlign: "center" }}>
          or click to browse
        </ParagraphFont1>
        <ParagraphFont2 sx={{ textAlign: "center" }}>
          Supported: JPG, PNG (Max 10MB)
        </ParagraphFont2>
        <input
          type="file"
          accept="image/png, image/jpeg"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Box>

      {/* Preview Image */}
      <Preview image={preview} />

      {/* Prediction Alert Dialog */}
      <PredictionAlertDialogSlide base64={preview} />
    </>
  );
}
