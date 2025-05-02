"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Star, FitnessCenter, Update } from "@mui/icons-material";
import { ParagraphFont } from "../../../components/fonts";
export default function AccuracyCards(item) {
  return (
    <Box component={"article"}>
      <Card variant="outlined" sx={{ borderRadius: "10px", boxShadow: "none" }}>
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 12, fontWeight: "bold" }}
          >
            <Star sx={{ fontSize: "18px", verticalAlign: "middle" }} />{" "}
            {item.ranking}
          </Typography>
          <ParagraphFont sx={{ fontWeight: "400" }}>
            {item.modelName}
          </ParagraphFont>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            Input Size → {item.imageSize}x{item.imageSize} pixels
          </Typography>
          <Typography gutterBottom variant="body2" sx={{ color: "#00796b" }}>
            <FitnessCenter sx={{ fontSize: "20px", verticalAlign: "middle" }} />{" "}
            Training Accuracy → {item.TrainingAcc}%
          </Typography>
          <Typography variant="body2" sx={{ color: "#0288d1" }}>
            <FitnessCenter sx={{ fontSize: "20px", verticalAlign: "middle" }} />{" "}
            Testing Accuracy → {item.TestAcc}%
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", marginTop: 1 }}
          >
            <Update sx={{ fontSize: "20px", verticalAlign: "middle" }} />{" "}
            {item.Date}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
