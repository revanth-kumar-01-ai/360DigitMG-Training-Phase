"use client";
import { Box, ThemeProvider, Typography } from "@mui/material";
import { myTheme } from "../../../components/Theme";
import UploadHero from "../_components-upload/UploadHero";
import DragAndDrop from "../_components-upload/DragAndDrop";
import AlertInfo from "../_components-upload/AlertInfo";

export default function Upload() {
  return (
    <ThemeProvider theme={myTheme}>
      <Box
        component={"section"}
        sx={{
          minHeight: "100vh",
          width: { xl: "90%", lg: "80%", md: "80%", sm: "80%", xs: "90%" },
          margin: "0 auto",
          //   background: "red",
          paddingTop: "64px",
        }}
      >
        {/* uploadHero */}
        <UploadHero />

        {/* drag and drop  */}
        <DragAndDrop />

        {/* Alert  */}
        <AlertInfo />

        {/* copy rights  */}
        <Box
          component={"div"}
          sx={{
            width: { xl: "40%", lg: "40%", md: "80%", sm: "80%", xs: "80%" },
            minHeight: "50px",
            // background: "yellow",
            margin: "1rem auto",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              lineHeight: "30px",
              textAlign: "center",
            }}
          >
            Powered by EmbryoAl <br />© 2024 EmbryoAl- All lights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
