"use client";
import { Box, AppBar, Toolbar, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "./profile";

export default function Navbar() {
  const [userExists, setUserExists] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = () => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      setUserExists(!!user);
    };

    checkUser(); // Run once on mount

    const handleUserChange = () => {
      checkUser();
      console.log("🔁 userInfo updated!");
    };

    window.addEventListener("userChanged", handleUserChange);
    window.addEventListener("storage", handleUserChange);

    return () => {
      window.removeEventListener("userChanged", handleUserChange);
      window.removeEventListener("storage", handleUserChange);
    };
  }, []);

  return (
    <Box component="nav">
      <AppBar color="default" sx={{ boxShadow: "none" }}>
        <Toolbar>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={"/logo.png"}
              alt="Logo"
              style={{ height: 40, marginRight: 10 }}
            />
            <Typography variant="h6" color="inherit">
              Embryo Inspector
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Button color="primary.dark">
            <Link href="/">Home</Link>
          </Button>

          {userExists ? (
            <>
              <Button color="primary.dark">
                <Link href="/upload">Upload</Link>
              </Button>
              <Button color="primary.dark">
                <Link href="/history">History</Link>
              </Button>
              {/* profile show */}
              <Profile />
            </>
          ) : (
            <Button color="primary.dark">
              <Link href="/authentication">Sign Up</Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
