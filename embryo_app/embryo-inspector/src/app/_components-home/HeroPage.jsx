"use client";
import { Box, Button, Grid } from "@mui/material";
import {
  HeadingFont,
  ParagraphFont,
  SubHeadingSmall,
} from "../../../components/fonts";
import { heroPageContent } from "../../../utils/content";
import EastIcon from "@mui/icons-material/East";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroPage() {
  const [userExists, setUserExists] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = () => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      setUserExists(!!user);
    };

    checkUser(); // Run once on mount

    const handleUserChange = () => {
      checkUser();
      console.log("🔁 userInfo updated!");
    };

    window.addEventListener("userChanged", handleUserChange);
    window.addEventListener("storage", handleUserChange);

    return () => {
      window.removeEventListener("userChanged", handleUserChange);
      window.removeEventListener("storage", handleUserChange);
    };
  }, []);

  const handleClick = () =>
    userExists
      ? router.push("/upload")
      : alert("Please sign in to your account");

  return (
    <Box
      m={5}
      component={"div"}
      sx={{
        paddingTop: "64px",
        // background: "red",
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xl: 7.5, lg: 7.5, md: 12, sm: 12, xs: 12 }}>
          <HeadingFont>{heroPageContent.textOne}</HeadingFont>
          <SubHeadingSmall py={2}>{heroPageContent.textTwo}</SubHeadingSmall>
          <Box sx={{ width: { xl: "70vh", lg: "70vh", md: "100vh" } }}>
            <ParagraphFont>{heroPageContent.textThree}</ParagraphFont>
          </Box>
          <Button
            variant="contained"
            sx={{
              marginTop: "10px",
              marginBottom: "20px",
              background: "linear-gradient(90deg, #2562eb 0%, #111726 100%)",
              "&:hover": {
                background: "linear-gradient(90deg, #111726 0%, #2562eb 100%)",
              },
            }}
            onClick={handleClick}
          >
            Start Embryo Prediction{" "}
            <EastIcon sx={{ paddingLeft: "10px", fontSize: "35px" }} />
          </Button>
        </Grid>
        <Grid
          size={4.5}
          // bgcolor={"yellow"}
          sx={{
            backgroundImage: "url('/home-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { md: "block", sm: "block", xs: "block" },
            borderRadius: "10px",
          }}
        ></Grid>
      </Grid>
    </Box>
  );
}
