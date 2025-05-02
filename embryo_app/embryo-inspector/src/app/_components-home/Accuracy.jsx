"use client";

import { Box, Grid } from "@mui/material";
import AccuracyCards from "./AccuracyCards";
import { homeAccuracyCardsDetails } from "../../../utils/content";

export default function Accuracy() {
  return (
    <Box
      component={"div"}
      sx={{
        background: "#f9fafa",
        minHeight: "50vh",
      }}
    >
      <Grid container spacing={2} p={5}>
        {homeAccuracyCardsDetails.map((item, index) => (
          <Grid size={{ xl: 3, lg: 3, md: 4, sm: 12, xs: 12 }} key={index}>
            <AccuracyCards {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
