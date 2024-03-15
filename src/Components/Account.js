import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const Account = ({ user }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Avatar
        alt={user.name}
        src={user.profilePicture}
        sx={{ width: 100, height: 100, marginBottom: 2 }}
      />
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontFamily: "Montserrat",
          fontWeight: "bold",
          marginBottom: "10px",
          alignItems: "center",
        }}
      >
        {user.name}
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ fontFamily: "Montserrat", color: "gray", marginBottom: "5px" }}
      >
        Email: {user.email}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontFamily: "Montserrat", color: "gray", marginBottom: "5px" }}
      >
        Address: {user.address}
      </Typography>

      {/* Add more user details as needed */}
    </Box>
  );
};

export default Account;
