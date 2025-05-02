"use client";
import { Box, Grid } from "@mui/material";
import { ParagraphFont, SubHeadingFont } from "../../../components/fonts";
import { score } from "../../../utils/content";

export default function Score() {
  return (
    <Box
      component={"article"}
      sx={{
        minHeight: "20vh",
        background: "#2562eb",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={2} p={5}>
        {score.map((item, index) => (
          <Grid size={{ xl: 3, lg: 3, md: 6, sm: 12 }} key={index}>
            <SubHeadingFont
              sx={{ fontWeight: "700", color: "white", textAlign: "center" }}
            >
              {item.score}
            </SubHeadingFont>
            <ParagraphFont
              sx={{ color: "white", textAlign: "center", fontWeight: "900" }}
            >
              {item.name}
            </ParagraphFont>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
