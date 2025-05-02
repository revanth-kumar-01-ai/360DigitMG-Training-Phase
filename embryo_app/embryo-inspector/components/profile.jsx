"use client";

import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Avatar, Button, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null); // ✅ to avoid hydration error
  const router = useRouter();

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(data);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.dispatchEvent(new Event("userChanged"));
    router.push("/");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar>{userInfo?.name?.[0]?.toUpperCase() || "R"}</Avatar>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>Doctor ID: {userInfo?.doctor_id}</Typography>
        <Typography sx={{ p: 2 }}>Email: {userInfo?.email}</Typography>
        <Typography sx={{ p: 2 }}>Name: {userInfo?.name}</Typography>
        <Button sx={{ m: 2 }} color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Popover>
    </>
  );
}
