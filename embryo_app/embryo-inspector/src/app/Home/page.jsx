"use client";
import { ThemeProvider } from "@mui/material/styles";
import { myTheme } from "../../../components/Theme";
import HeroSection from "./_components/HeroSection";
import Box from "@mui/material/Box";
import Mentors from "./_components/Mentors";
import Analysis from "./_components/Analysis";
import StatsSection from "./_components/StatsSection";
import Footer from "./_components/Footer";
export default function page() {
  return (
    <>
      <ThemeProvider theme={myTheme}>
        <Box /* Section tag main container */
          id="home"
          component={"section"}
          sx={{
            minHeight: "100vh",
            width: "100%",
            background: "#ffffff", // yellow 
          }}
        >
          <Box component={"div"} sx={{ width: "80%", marginX: "auto" }}>

            {/* hero section */}
            <HeroSection/>

            {/* mentors */}
            <Mentors/>

            {/* analysis cards */}
            <Analysis/>

            {/* StatsSection */}
            <StatsSection/>

            <Footer/>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
