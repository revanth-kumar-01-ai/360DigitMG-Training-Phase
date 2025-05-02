"use client";

import { Box, Grid } from "@mui/material";
import EmbryoInsightsHubCards from "./EmbryoInsightsHubCards";
import { EmbryoInsightsHubDetails } from "../../../utils/content";
import { SubHeadingFont } from "../../../components/fonts";

export default function EmbryoInsightsHub() {
  return (
    <Box
      component={"div"}
      sx={{
        // background: "red",
        minHeight: "40vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <Grid container spacing={2}>
        {EmbryoInsightsHubDetails.map((item, index) => (
          <Grid size={{ xl: 4, lg: 4, md: 6, sm: 12, xs: 12 }} key={index}>
            <EmbryoInsightsHubCards {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
