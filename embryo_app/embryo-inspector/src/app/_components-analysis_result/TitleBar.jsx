"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import dynamic from "next/dynamic";
import AIResultPDF from "../_components-generatePDF/AIResultPDF";
import { useSelector } from "react-redux";
// Dynamically import PDFDownloadLink only on the client
const AIResultPDFLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

function TitleBar({ details }) {
  const { message, name, date } = useSelector(
    (state) => state.doctorDescription
  );

  return (
    <Box sx={{ flexGrow: 1, position: "sticky", top: 0 }}>
      <AppBar sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          {/* Left Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Embryo Analysis Results
          </Typography>

          {/* Right Button */}
          <AIResultPDFLink
            document={
              <AIResultPDF
                details={details}
                message={message}
                name={name}
                date={date}
              />
            }
            fileName={`Embryo_report_${details?.patient_name}.pdf`}
          >
            {({ loading }) =>
              loading ? (
                "Generating PDF..."
              ) : (
                <Button
                  color="inherit"
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={{
                    backgroundColor: "#fff",
                    color: "#1976d2",
                    borderColor: "#fff",
                    "&:hover": {
                      backgroundColor: "#e3f2fd",
                    },
                  }}
                >
                  Report
                </Button>
              )
            }
          </AIResultPDFLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TitleBar;
