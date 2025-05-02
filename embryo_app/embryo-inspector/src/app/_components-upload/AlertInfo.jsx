import { Alert, Box, Typography } from "@mui/material";
import React from "react";

export default function AlertInfo() {
  return (
    <Box
      component={"div"}
      sx={{
        width: { xl: "40%", lg: "40%", md: "80%", sm: "80%", xs: "80%" },
        minHeight: "50px",
        //   background:'yellow',
        margin: "1rem auto",
      }}
    >
      <Alert severity="info">
        AI + XAI powered prediction
        <Typography variant="body2" pt={1}>
          Using advanced artificial intelligence and explainable AI technology
        </Typography>
      </Alert>
    </Box>
  );
}
