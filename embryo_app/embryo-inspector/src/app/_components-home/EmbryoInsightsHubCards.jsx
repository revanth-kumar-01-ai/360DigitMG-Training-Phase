"use client";
import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ScienceIcon from "@mui/icons-material/Science";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
export default function EmbryoInsightsHubCards(item) {
  return (
    <Box component={"article"}>
      <Card
        variant="outlined"
        sx={{
          borderRadius: "10px",
          boxShadow: "none",
          padding: "20px",
          background: "#f9fafa",
        }}
      >
        <CardContent>
          <Box component={"div"}>{item.icon}</Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {item.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", marginTop: 1 }}
          >
            {item.content}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
