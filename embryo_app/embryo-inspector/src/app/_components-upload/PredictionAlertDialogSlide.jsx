"use client";

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { patientImageUpload } from "../../../redux/slice/uploadImgSlice";
import { useRouter } from "next/navigation";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PredictionAlertDialogSlide({ base64 }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.userUploadUImage
  );

  // route
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    patient_name: "",
    patient_age: "",
    patient_blood_group: "",
    base64: base64 || "",
  });

  useEffect(() => {
    if (base64) {
      setPatientDetails((prev) => ({
        ...prev,
        base64: base64,
      }));
    }
  }, [base64]);

  const handleClickOpen = () => {
    if (base64) {
      setOpen(true);
    } else {
      alert("Please select the image first 📸");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePatient = async () => {
    const { patient_name, patient_age, patient_blood_group, base64 } =
      patientDetails;

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const doctor_id = userInfo?.doctor_id;

    if (!doctor_id) {
      alert("Doctor ID not found in localStorage ❌");
      return;
    }

    if (!patient_name || !patient_age || !patient_blood_group || !base64) {
      alert("Please fill all fields and select image 🛑");
      return;
    }

    if (isNaN(patient_age) || Number(patient_age) <= 0) {
      alert("Age must be a valid number 🚫");
      return;
    }

    try {
      const result = await dispatch(
        patientImageUpload({
          id: doctor_id,
          uploadImage: {
            base64: base64,
            patient_name: patient_name,
            patient_age: patient_age,
            patient_blood_group: patient_blood_group,
          },
        })
      );

      const patient_id = result.payload?.patient_data?.patient_id;

      // if(data)
      // {
      //   console.log(data);
      // }

      setPatientDetails({
        patient_age: "",
        patient_blood_group: "",
        base64: "",
        patient_name: "",
      });

      setOpen(false);

      router.push(`/analysis_result/${patient_id}`);
    } catch (err) {
      alert(`Upload failed ❌: ${err?.error || "Unknown error"}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Box
        component="div"
        sx={{
          width: { xl: "40%", lg: "40%", md: "80%", sm: "80%", xs: "80%" },
          height: "50px",
          margin: "1rem auto",
        }}
      >
        <Button
          onClick={handleClickOpen}
          variant="contained"
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          Predict Embryo Quality
        </Button>
      </Box>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Patient Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" pb={2}>
            Patient Details: Basic info about a person receiving medical care —
            includes name, age, and blood group.
          </DialogContentText>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            name="patient_name"
            value={patientDetails.patient_name}
            onChange={handleChange}
            sx={{ padding: "10px", width: "100%" }}
          />
          <TextField
            id="age"
            label="Age"
            variant="outlined"
            name="patient_age"
            value={patientDetails.patient_age}
            onChange={handleChange}
            sx={{ padding: "10px", width: "100%" }}
          />
          <TextField
            id="bloodGroup"
            label="Blood Group"
            variant="outlined"
            name="patient_blood_group"
            value={patientDetails.patient_blood_group}
            onChange={handleChange}
            sx={{ padding: "10px", width: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handlePatient} disabled={loading}>
            {loading ? "Uploading..." : "Agree"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
