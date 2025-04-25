import { Box, Grid, Typography } from "@mui/material";
import { SubHeadingFont } from "../../../../components/fonts";

export default function StatsSection() {
  const stats = [
    { number: "95%", label: "Success Rate" },
    { number: "10,000+", label: "Analyzed Samples" },
    { number: "50+", label: "Expert Doctors" },
    { number: "25+", label: "Research Papers" },
  ];

  return (
    <Box sx={{ bgcolor: "primary.main", py: 6 }}>
      <Grid container spacing={4} justifyContent='space-around'>
        {stats.map((item, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Box textAlign="center">
              <SubHeadingFont variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
                {item.number}
              </SubHeadingFont>
              <Typography sx={{ color: "#fff" }}>
                {item.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}