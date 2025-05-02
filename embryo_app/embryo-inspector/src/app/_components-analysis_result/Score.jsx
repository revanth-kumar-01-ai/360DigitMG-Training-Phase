"use client";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { ParagraphFont2, SubHeadingSmall } from "../../../components/fonts";
import getEmbryoQuality from "../../../utils/content";

export default function Score({ details }) {
  // if(details)
  // {
  //   console.log(details);

  // }

  return (
    <Grid container spacing={2}>
      <Grid size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }} pt={2}>
        <Card>
          <CardContent>
            <Typography variant="body2" fontWeight={"700"} color="#888">
              Grade
            </Typography>
            <SubHeadingSmall sx={{ fontWeight: "bolder" }}>
              {details?.prediction}
            </SubHeadingSmall>
            <ParagraphFont2 color="#888">
              {getEmbryoQuality(details?.prediction || "")}
            </ParagraphFont2>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }} pt={2}>
        <Card>
          <CardContent>
            <Typography variant="body2" fontWeight={"700"} color="#888">
              Success Rate
            </Typography>
            <SubHeadingSmall sx={{ fontWeight: "bolder" }} color="primary.main">
              {details?.probability?.slice(0, 5)}%
            </SubHeadingSmall>
            <ParagraphFont2 color="#888">
              Based on historical data
            </ParagraphFont2>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
