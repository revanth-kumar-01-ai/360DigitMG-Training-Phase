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

const mentors = [
    { name: "Dr. Priya Sharma", role: "Fertility Specialist", img: "/mentor1.jpg" },
    { name: "Dr. Anil Mehta", role: "Embryologist", img: "/mentor2.jpg" },
    { name: "Dr. Kavya Rao", role: "Gynaecologist", img: "/mentor3.jpg" },
    { name: "Dr. Ravi Nair", role: "IVF Expert", img: "/mentor4.jpg" },
  ];


export default function Mentors() {
  return (
    <Box
      component="div"
      sx={{
        pt: 5,
        minHeight: "50vh",
        background: "#fafafa",
      }}
    >
      {/* Heading */}
      <SubHeadingFont sx={{ textAlign: "center", mb: 4 , pb:2}}>
        Guided by Mentors 
      </SubHeadingFont>

      <Grid container spacing={3} display={'flex'} justifyContent={'space-evenly'}>
  {mentors.map((mentor, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Card sx={{ minWidth: 275, p: 2, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar
              alt="avvaaaaa"
              src=""
              sx={{ width: 56, height: 56 }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                REVANTH KUMAR
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Project Guide
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2">
            Well meaning and kindly. <br />
            <i>ksj ojdfpgo oajsdfgo oajdafo</i>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">See the profile</Button>
        </CardActions>
      </Card>
    </Grid>
  ))}
</Grid>
    </Box>
  );
}

