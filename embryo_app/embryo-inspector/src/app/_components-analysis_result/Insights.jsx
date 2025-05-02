"use client";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import {
  ParagraphFont,
  ParagraphFont1,
  SubHeadingFont,
  SubHeadingSmall,
} from "../../../components/fonts";
import ScienceIcon from "@mui/icons-material/Science";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import {
  generateFocusAreasDescription,
  getConfidenceScoreDescription,
  getDevelopmentStage,
  getKeyIndicatorsDescription,
} from "../../../utils/Insights";
export default function Insights({ details }) {
  const focusArea = generateFocusAreasDescription([details?.prediction]);
  const developmentStage = getDevelopmentStage(details?.prediction);
  const confidenceScore = getConfidenceScoreDescription(details?.probability);
  const KeyIndicators = getKeyIndicatorsDescription(details?.prediction);

  return (
    <Box
      component={"div"}
      sx={{
        width: "100%",
        minHeight: "30vh",
        // background: "brown",
      }}
    >
      <SubHeadingSmall pb={2}>AI Analysis Insights</SubHeadingSmall>
      <Grid container spacing={2}>
        {/* focus Areas */}
        <Grid size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}>
          <Card sx={{ minHeight: "120px" }}>
            <CardContent>
              <Box component={"div"} display={"flex"} gap={"20px"}>
                <Box component={"div"}>
                  <ScienceIcon
                    color="primary"
                    sx={{
                      background: "#dae9fe",
                      padding: "10px",
                      fontSize: "50px",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
                <Box component={"div"}>
                  <ParagraphFont sx={{ fontWeight: 600 }}>
                    Focus Areas
                  </ParagraphFont>
                  <ParagraphFont1>
                    {/* Model focused on inner cell mass and trophectoderm for
                    comprehensive analysis */}
                    {focusArea || ""}
                  </ParagraphFont1>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Development stage */}
        <Grid size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}>
          <Card sx={{ minHeight: "120px" }}>
            <CardContent>
              <Box component={"div"} display={"flex"} gap={"20px"}>
                <Box component={"div"}>
                  <AccessTimeIcon
                    color="secondary"
                    sx={{
                      background: "#f2e7ff",
                      padding: "10px",
                      fontSize: "50px",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
                <Box component={"div"}>
                  <ParagraphFont sx={{ fontWeight: 600 }}>
                    Development Stage
                  </ParagraphFont>
                  <ParagraphFont1>
                    {/* Blastocyst stage with optimal expansion and cell distribution */}
                    {developmentStage || ""}
                  </ParagraphFont1>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Confidence score */}
        <Grid size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}>
          <Card sx={{ minHeight: "120px" }}>
            <CardContent>
              <Box component={"div"} display={"flex"} gap={"20px"}>
                <Box component={"div"}>
                  <TaskAltIcon
                    color="success"
                    sx={{
                      background: "#dbfbe7",
                      padding: "10px",
                      fontSize: "50px",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
                <Box component={"div"}>
                  <ParagraphFont sx={{ fontWeight: 600 }}>
                    Confidence Score
                  </ParagraphFont>
                  <ParagraphFont1>
                    {/* High confidence in assessment based on clear morphological
                    features */}
                    {confidenceScore || ""}
                  </ParagraphFont1>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* key indicator*/}
        <Grid size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}>
          <Card sx={{ minHeight: "120px" }}>
            <CardContent>
              <Box component={"div"} display={"flex"} gap={"20px"}>
                <Box component={"div"}>
                  <InfoOutlineIcon
                    color="warning"
                    sx={{
                      background: "#ffecd5",
                      padding: "10px",
                      fontSize: "50px",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
                <Box component={"div"}>
                  <ParagraphFont sx={{ fontWeight: 600 }}>
                    Key Indicators
                  </ParagraphFont>
                  <ParagraphFont1>
                    {/* Strong cellular organization and membrane integrity
                    observed */}
                    {KeyIndicators || ""}
                  </ParagraphFont1>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
