"use client";

import { Box, Grid } from "@mui/material";
import React from "react";

import Right_Side from "../_components-authentication/Right_Side";
import Left_Side from "../_components-authentication/Left_Side";
function page() {
  return (
    <Box component={"section"}>
      <Grid container>
        <Grid
          size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}
          sx={{
            minHeight: "100vh",
            background: "#ebf8ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Right_Side />
        </Grid>
        <Grid
          size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
          }}
        >
          <Left_Side />
        </Grid>
      </Grid>
    </Box>
  );
}

export default page;
