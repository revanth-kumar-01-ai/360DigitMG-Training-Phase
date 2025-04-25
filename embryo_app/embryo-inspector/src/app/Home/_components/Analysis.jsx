"use client";

import Grid from "@mui/material/Grid";
import { SubHeadingFont } from "../../../../components/fonts";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
const mentors = [
    { name: "Dr. Priya Sharma", role: "Fertility Specialist", img: "/mentor1.jpg" },
    { name: "Dr. Anil Mehta", role: "Embryologist", img: "/mentor2.jpg" },
    { name: "Dr. Kavya Rao", role: "Gynaecologist", img: "/mentor3.jpg" },
  ];


export default function Analysis() {
  return (
    <Box
      component="div"
      sx={{
        pt: 10,
        minHeight: "40vh",
        background: "red",
      }}
    >
    
      <Grid container spacing={3} display={'flex'} justifyContent={'space-evenly'}>
  {mentors.map((mentor, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Card sx={{ minWidth: {xs:275}, p: 2, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Box pb={2}>
          <Avatar sx={{ width: 56, height: 56 }}>
        <FolderIcon />
      </Avatar>
          </Box>
          <Typography variant="h5" pb={2}>
            A1-Powered Analysis
          </Typography>
            <Typography variant="body2">
            Advanced machine learning algorithms provide <br/>
    accurate and consistent embryo quality
    assessment
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
    </Box>
  );
}

