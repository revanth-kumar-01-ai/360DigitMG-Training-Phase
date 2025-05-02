import React from "react";
import { ParagraphFont1 } from "../../../components/fonts";
import { Box } from "@mui/material";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
export default function Preview({ image }) {
  return (
    <Box
      component={"div"}
      sx={{
        width: { xl: "40%", lg: "40%", md: "80%", sm: "80%", xs: "80%" },
        minHeight: "100px",
        // background: "brown",
        margin: "1rem auto",
        padding: "10px",
      }}
    >
      <ParagraphFont1 fontWeight="900" color="#888">
        Preview
      </ParagraphFont1>
      <Box
        component={"div"}
        sx={{
          width: { xl: "40%", lg: "40%", md: "50%", sm: "80%", xs: "80%" },
          height: "200px",
          margin: "1rem auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#888",
          border: "2px dashed #888",
          borderRadius: "10px",
        }}
      >
        {image ? (
          <>
            <img
              src={image}
              alt="preview image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                borderRadius: "10px",
              }}
            />
          </>
        ) : (
          <>
            <PhotoSizeSelectActualOutlinedIcon fontSize="large" />
          </>
        )}
      </Box>
    </Box>
  );
}
