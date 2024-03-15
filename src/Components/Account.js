import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import Avatar from "@mui/material/Avatar"; // Import Avatar component
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Account = ({ user }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Typography
        variant="h5"
        style={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        Personal Info
      </Typography>
      <Paper
        style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}
        elevation={3}
      >
        {/* Avatar */}
        <Avatar
          style={{
            margin: "0 auto",
            marginBottom: "20px",
            backgroundColor: "orange",
          }}
        >
          <AccountCircleIcon />
        </Avatar>
        {/* Render user information here */}
        <Typography variant="body1">{`Name: ${user.name}`}</Typography>
        <Typography variant="body1">{`Email: ${user.email}`}</Typography>
        {/* Add more user info fields as needed */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button size="small" color="primary">
            <CreateIcon />
            Edit
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Account;
