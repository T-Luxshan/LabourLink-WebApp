import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ChangePassword from "./ChangePassword";
import ChangeTheme from "./ChangeTheme";

const SettingsInProfile = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: "Montserrat",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Setting
      </Typography>
      <Paper elevation={3} sx={paperStyles.root}>
        <Typography variant="h5" sx={titleStyles.h5}>
          Change Password
        </Typography>
        <ChangePassword />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        ></Box>

        <ChangeTheme />
      </Paper>
    </div>
  );
};

export default SettingsInProfile;

const titleStyles = {
  h5: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    marginBottom: "20px",
  },
};

const paperStyles = {
  root: {
    padding: "20px",
    maxWidth: "800px",
    width: "100%",
  },
};
