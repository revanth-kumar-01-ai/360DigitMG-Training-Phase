"use client";

import { Box, Grid } from "@mui/material";
import { ParagraphFont, SubHeadingSmall } from "../../../components/fonts";

export default function Footer() {
  return (
    <Box component={"footer"} minHeight={"30vh"} bgcolor={"#111726"}>
      <Grid container p={5}>
        <Grid
          size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Box component={"div"} sx={{ display: "flex", alignItems: "center" }}>
            <Box component={"div"}>
              <img
                src={"/logo.png"}
                alt="Logo"
                style={{ height: 50, marginRight: 10 }}
              />
            </Box>
            <SubHeadingSmall color={'white'}>Embryo Inspector</SubHeadingSmall>
          </Box>
          <ParagraphFont pt={2} color="#d8d8d8" sx={{width:{xl: "50%", lg: '50%', md: "50%", sm: "100%", xs: "100%"}}}>
            Leading the way in A1-powered embryo quality
            assessment technology for improved fertility 
            treatment outcomes.
          </ParagraphFont>
        </Grid>
        <Grid size={{ xl: 3, lg: 3, md: 12, sm: 12, xs: 12 }} pt={{md:2, sm:2, xs:2}}>
          <Box component={"div"}>
            <SubHeadingSmall color={'white'}>Quick Links</SubHeadingSmall>
          </Box>
          <Box component={"div"} pt={2}> 
            <ParagraphFont color="#d8d8d8">Home</ParagraphFont>
            <ParagraphFont pt={2} color="#d8d8d8">Predict</ParagraphFont>
            <ParagraphFont pt={2} color="#d8d8d8">Dashboard</ParagraphFont>
          </Box>
        </Grid>
        <Grid size={{ xl: 3, lg: 3, md: 12, sm: 12, xs: 12 }} pt={{md:2, sm:2, xs:2}}>
          <SubHeadingSmall color={'white'}>Contact</SubHeadingSmall>
          <ParagraphFont pt={2} color="#d8d8d8">
            360DigiTMG , chennai <br />
            TamilNadu, India
          </ParagraphFont>
        </Grid>
      </Grid>
    </Box>
  );
}


// 