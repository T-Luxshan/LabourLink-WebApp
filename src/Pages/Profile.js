import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Account from "./Profile/Account"; // Make sure to import or define the Account component
import user from "./Profile/User.json"; // Make sure to import or define the user object
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { Typography, Paper, useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import ChangePassword from "./Profile/ChangePassword";
import ReactSwitch from "react-switch";
import { ThemeContext } from "../App";
import { useContext } from "react";
import AboutPage from "./Profile/About";

function Profile() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [value, setValue] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setValue(0); // Reset to the first tab on resize
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <TabContext value={value}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          height: "100%",
          marginTop: "100px",
          marginLeft: "10px",
        }}
      >
        <Tabs
          orientation={isSmallScreen ? "horizontal" : "vertical"}
          variant={isSmallScreen ? "fullWidth" : "scrollable"}
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            width: isSmallScreen ? "100%" : "auto",
            marginBottom: "20px",
            minWidth: "250px", // Adjust width here
          }}
        >
          <Tab
            label={
              <>
                <AccountCircleIcon sx={{ marginRight: "5px" }} /> Account
              </>
            }
            value={0}
            sx={{
              borderRadius: "20px",
              marginBottom: "10px",
            }}
          />
          <Tab
            label={
              <>
                <SettingsIcon sx={{ marginRight: "5px" }} /> Setting
              </>
            }
            value={1}
            sx={{
              borderRadius: "20px",
              marginBottom: "10px",
            }}
          />
          <Tab
            label={
              <>
                <InfoIcon sx={{ marginRight: "5px" }} /> About Us
              </>
            }
            value={2}
            sx={{
              borderRadius: "20px",
              marginBottom: "10px",
            }}
          />
        </Tabs>
        <Box
          sx={{
            display: "flex",
            flex: 1,
          }}
        >
          <TabPanel value={0} sx={{ flex: 1 }}>
            <Box
              sx={{
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
                Account
              </Typography>
              <Paper elevation={3} sx={paperStyles.root}>
                <Typography variant="h5" sx={titleStyles.h5}>
                  Personal Info
                </Typography>
                <Account user={user} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                  }}
                >
                  <Button size="small" color="primary">
                    <CreateIcon />
                    Edit
                  </Button>
                </Box>
              </Paper>
            </Box>
          </TabPanel>

          {/* Setting */}
          <TabPanel value={1} sx={{ flex: 1 }}>
            <Box
              sx={{
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

                <Typography variant="h5" sx={titleStyles.h5}>
                  Change Theme
                </Typography>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <label>{theme === "dark?"}</label>
                  <ReactSwitch
                    onChange={toggleTheme}
                    checked={theme === "dark"}
                  />
                </div>
              </Paper>
            </Box>
          </TabPanel>
          <TabPanel value={2} sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Paper elevation={3} sx={paperStyles.root}>
                <AboutPage />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                  }}
                ></Box>
              </Paper>
            </Box>
          </TabPanel>
        </Box>
      </Box>
    </TabContext>
  );
}

export default Profile;

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
