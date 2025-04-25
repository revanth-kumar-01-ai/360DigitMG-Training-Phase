"use client"

import { Box, Grid, Typography, Link, IconButton } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
    return (
      <Box sx={{ bgcolor: "#0c1120", color: "#fff", px: 4, py: 6 }}>
        <Grid container spacing={4}>
          {/* Logo + Intro */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              🧫 EmbryoAI
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Leading the way in AI-powered embryo quality assessment technology
              for improved fertility treatment outcomes.
            </Typography>
          </Grid>
  
          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                {["Home", "Prediction", "Dashboard", "About Us"].map((text) => (
                  <Typography key={text} variant="body2" sx={{ color: "gray", mb: 1 }}>
                    <Link href="#" underline="none" color="inherit">
                      {text}
                    </Link>
                  </Typography>
                ))}
              </Grid>
              <Grid item xs={6}>
                {["Upload", "Explainability", "History", "Contact"].map((text) => (
                  <Typography key={text} variant="body2" sx={{ color: "gray", mb: 1 }}>
                    <Link href="#" underline="none" color="inherit">
                      {text}
                    </Link>
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Grid>
  
          {/* Contact */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
              SRM University, Chennai <br />
              Tamil Nadu, India
            </Typography>
            <Box>
              <IconButton href="#" sx={{ color: "white" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: "white" }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: "white" }}>
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }