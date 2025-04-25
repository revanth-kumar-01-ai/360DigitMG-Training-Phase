"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  HeadingFontSmall,
  ParagraphFont1,
  SubHeadingXSmall,
} from "../../../../components/fonts";
import { Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function HeroSection() {
  return (
    <Box
      component={"div"}
      sx={{
        pt: 1,
        minHeight: "50vh",
        background: "red",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2}>
        {/* content */}
        <Grid size={{ sm: 12, xs: 12, xl: 7, lg: 7, md: 12 }}>
          <Box id="content" sx={{ p: 3,}}>  
            {/* heading  */}
            <HeadingFontSmall pb={2}>
              Embryo Quality Prediction <br />
              System
            </HeadingFontSmall>

            <SubHeadingXSmall pb={2}>
              A1-Powered Analysis for Precise Embryo Assessment
            </SubHeadingXSmall>

            <ParagraphFont1 pb={2} sx={{ width: "90%" }}>
              Leverage advanced artificial intelligence to accurately assess
              embryo quality. Our system provides real-time analysis, helping
              medical professionals make informed decisions with greater
              confidence and precision.
            </ParagraphFont1>

            <Box>
              <Button
                variant="contained"
                sx={{
                  "&:hover": {
                    backgroundColor: "primary.main",
                    boxShadow: "none",
                  },
                }}
              >
                Start Embryo Prediction <ArrowRightAltIcon />
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* image */}
        <Grid
          size={{ sm: 12, xs: 12, xl: 5, lg: 5, md: 6 }}
          sx={{
            display: { xs: "none", md: "block", sm: "block", xs: "block" },
          }}
        >
          <Box
            id="image"
            sx={{
              bgcolor: "primary.light",
              height: "100%",
              backgroundImage: "url('/Hero-Img.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderRadius: 2,
            }}
          ></Box>
        </Grid>
      </Grid>
    </Box>
  );
}
