// "use client";

import { Box, Grid } from "@mui/material";
import { ParagraphFont1, SubHeadingFont } from "../../../components/fonts";

export default function VisualImages({ details }) {
  return (
    <Box
      component={"main"}
      sx={{
        width: "100%",
        minHeight: "50vh",
        // bgcolor: "yellow",
      }}
    >
      <Box component={"div"}>
        <SubHeadingFont py={2}>Visual Analysis</SubHeadingFont>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}>
          <ParagraphFont1>Original Embryo Images</ParagraphFont1>
          <Box
            component={"div"}
            sx={{
              width: "100%",
              minHeight: "40vh",
              //   background: "gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component={"div"}
              sx={{
                width: "30vh",
                height: "30vh",
                // background: "yellow",
              }}
            >
              <img
                src={details?.image_path}
                alt="preview image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                  borderRadius: "10px",
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}>
          <ParagraphFont1>Explainable AI</ParagraphFont1>
          <Box
            component={"div"}
            sx={{
              width: "100%",
              minHeight: "40vh",
              //   background: "gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component={"div"}
              sx={{
                width: "30vh",
                height: "30vh",
                // background: "yellow",
              }}
            >
              <img
                src={details?.XAImage}
                alt="preview image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                  borderRadius: "10px",
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
