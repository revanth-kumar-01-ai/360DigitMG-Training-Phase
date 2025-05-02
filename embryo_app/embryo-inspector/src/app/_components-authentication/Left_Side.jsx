"use client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { ParagraphFont } from "../../../components/fonts";
import { useSelector, useDispatch } from "react-redux";
import { addContact } from "../../../redux/slice/userSlice";
import { signInAsync } from "../../../redux/slice/userSingInSlice";
import { useRouter } from "next/navigation";

function Left_Side() {
  const { data, loading, error } = useSelector((state) => state.userInfo);
  const { signInData, signInLoading, signInError } = useSelector(
    (state) => state.userSignIn
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(true);
  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const [getData, setGetData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!getData.email || !getData.name || !getData.password) {
      alert("⚠️ Please enter all contact details");
      return;
    }

    if (!emailRegex.test(getData.email)) {
      alert("📧 Please enter a valid email address");
      return;
    }

    try {
      // Check if user is already logged in
      const userInfo = localStorage.getItem("userInfo");

      if (userInfo) {
        // If userInfo exists, show that user is already logged in
        alert("You're already logged in!");
        router.push("/"); // Redirect to home or dashboard
      } else {
        // If user is not logged in, proceed with signup
        const result = await dispatch(addContact(getData));
        const data = result.payload;

        if (data?.message === "User already exists with this email 🚫") {
          alert("🚫 Email already exists. Try with another email.");
        } else if (data?.message === "Sign up successfully") {
          alert("✅ Sign-up successful!");

          // 🎯 Save userInfo to localStorage
          localStorage.setItem("userInfo", JSON.stringify(data));

          // Clear the form data
          setGetData({
            email: "",
            name: "",
            password: "",
          });

          // Redirect to home page
          // router.push("/");
          window.location.reload();
        }
      }
    } catch (err) {
      console.error("Signup error 😓:", err);
      alert("❌ Something went wrong during sign-up.");
    }
  };

  //  Sign In
  const handleSignIn = async () => {
    const tempData = { ...getData };
    delete tempData["name"];

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if all required fields are filled
    if (!tempData.email || !tempData.password) {
      alert("⚠️ Please enter all contact details");
      return;
    }

    // Validate email format
    if (!emailRegex.test(tempData.email)) {
      alert("📧 Please enter a valid email address");
      return;
    }

    try {
      const userInfo = localStorage.getItem("userInfo");

      if (userInfo) {
        // If userInfo exists, show that user is already logged in
        alert("You're already logged in!");
        router.push("/"); // Redirect to home or dashboard
      } else {
        const result = await dispatch(signInAsync(tempData));
        const data = result.payload;

        // Show response message
        alert(data?.message);

        if (data?.message === "Signin successful") {
          // ✅ Save user info only if sign-in is successful
          localStorage.setItem("userInfo", JSON.stringify(data));

          // 🔄 Clear form
          setGetData({
            email: "",
            name: "",
            password: "",
          });

          window.location.reload();

          // 🚀 Redirect to home
        }
      }
    } catch (err) {
      alert("🚨 Something went wrong. Please try again!");
      console.error(err);
    }
  };

  return (
    <Card
      sx={{
        minWidth: "400px",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <ParagraphFont>{isSignUp ? "Sign In" : "Sign up"}</ParagraphFont>

        {isSignUp && (
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={getData.name}
            onChange={handleChange}
          />
        )}
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={getData.email}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          fullWidth
          name="password"
          value={getData.password}
          onChange={handleChange}
        />
        <CardActions
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Button variant="contained" onClick={handleToggle}>
            {isSignUp ? "Go to Sign In" : "Go to Sign Up"}
          </Button>
          <Button
            variant="contained"
            onClick={isSignUp ? handleSignUp : handleSignIn}
            disabled={isSignUp ? loading : signInLoading}
          >
            {isSignUp ? "Submit Sign Up" : "Submit Sign In"}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default Left_Side;
