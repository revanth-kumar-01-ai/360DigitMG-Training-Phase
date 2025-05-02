"use client"
import { Box, ThemeProvider } from "@mui/material";
import HeroPage from "./_components-home/HeroPage";
import { myTheme } from "../../components/Theme";
import Accuracy from "./_components-home/Accuracy";
import EmbryoInsightsHub from "./_components-home/EmbryoInsightsHub";
import Score from "./_components-home/Score";
import Footer from "./_components-Footer/Footer";
import CopyRight from "./_components-Footer/CopyRight";

export default function Home() {
  return (
    <ThemeProvider theme={myTheme}>
      <Box component={'div'}
        sx={{
          minHeight:'100vh',
          width: { xl: '90%', lg: '80%', md: '80%', sm: '80%', xs: '90%' },
          margin: '0 auto',
        }}
      >
        {/* hero page */}
        <HeroPage/>
        
        {/* cards  */}
        <Accuracy/>

        {/* Embryo Insights Hub */}
        <EmbryoInsightsHub/>

      </Box>
      {/* score table  */}
      <Score/>
      {/* footer  */}
      <Footer/>
      <CopyRight/>
    </ThemeProvider>
  );
}
