"use client";
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ScoreIcon from "@mui/icons-material/Score";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GradeIcon from "@mui/icons-material/Grade";
import InfoIcon from "@mui/icons-material/Info";
import { getConfidenceScoreDescription } from "../../../utils/Insights";
import { useRouter } from "next/navigation";

export default function PatientDetailsCards({
  image_path,
  name,
  score,
  label,
  id,
}) {
  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/analysis_result/${id}`);
  };

  return (
    <Card>
      <CardActionArea onClick={() => handleClick(id)}>
        <CardMedia
          component="img"
          height="140"
          image={image_path}
          alt="green iguana"
        />
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
            <PersonIcon fontSize="small" />
            <Typography variant="body1">Name: {name}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
            <ScoreIcon fontSize="small" />
            <Typography variant="body2">Prob Score: {score}%</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
            <CalendarTodayIcon fontSize="small" />
            <Typography variant="body2">Date: April 29, 2025</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
            <GradeIcon fontSize="small" />
            <Typography variant="body2">Result: {label}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <InfoIcon fontSize="small" />
            <Typography variant="body2">
              {getConfidenceScoreDescription(score)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
