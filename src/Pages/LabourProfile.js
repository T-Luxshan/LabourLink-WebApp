import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import user from "../Components/User.json"; 
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { useMediaQuery } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import About from "../Components/About";
import Settings from "../Components/SettingsInProfile";
import AccountLabour from "../Components/AccountLabour";

function LabourProfile() {
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
            marginBottom: "400px",
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
            <AccountLabour/>
          </TabPanel>

          <TabPanel value={1} sx={{ flex: 1 }}>
            <Settings />
          </TabPanel>
*
          <TabPanel value={2} sx={{ flex: 1 }}>
            <About />
          </TabPanel> 
        </Box>
      </Box>
    </TabContext>
  );
}

export default LabourProfile;

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
