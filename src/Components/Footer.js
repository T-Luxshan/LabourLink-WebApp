import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

import AppStore from "../Assets/AppStore.svg";
import PlayStore from "../Assets/PlayStore.svg";

export default function Footer() {
  const listItemButtonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px", // Adjust spacing between icon and text
    backgroundColor: "transparent", // Remove button background color
    border: "none", // Remove button border
    cursor: "pointer", // Change cursor to pointer on hover
    color: "#ffffff", // White color for icon and text
  };

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that this effect runs only once after component mount

  return (
    <footer
      style={{ backgroundColor: "#00204A", color: "#ffffff", padding: "1px" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isSmallScreen ? "1fr" : "1fr 1fr 1fr 1fr",
          gap: "1px",
        }}
      >
        <List>
          <ListItem>
            <ListSubheader
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                textAlign: "center",
                color: "#F97300",
                backgroundColor: "transparent", // Set background color to transparent
              }}
            >
              Contact Us
            </ListSubheader>
          </ListItem>
          <ListItem style={listItemButtonStyle}>
            <ListItemButton>
              <PhoneIcon />
              <Box sx={{ marginBottom: 4, marginRight: 2 }} />
              {/* Add spacing */}
              +94 011 123 4567
            </ListItemButton>
          </ListItem>
          <ListItem style={listItemButtonStyle}>
            <ListItemButton>
              <EmailIcon />
              <Box sx={{ marginBottom: 4, marginRight: 2 }} />
              {/* Add spacing */}
              samplemail@gmail.com
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListSubheader
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                textAlign: "center",
                color: "#F97300",
                backgroundColor: "transparent", // Set background color to transparent
              }}
            >
              Social Media
            </ListSubheader>
          </ListItem>
          <ListItem style={listItemButtonStyle}>
            <ListItemButton>
              <FacebookIcon />
              <Box sx={{ marginBottom: 4, marginRight: 2 }} />
              {/* Add spacing */}
              Labor Link
            </ListItemButton>
          </ListItem>
          <ListItem style={listItemButtonStyle}>
            <ListItemButton>
              <InstagramIcon />
              <Box sx={{ marginBottom: 4, marginRight: 2 }} />
              {/* Add spacing */}
              @labour_link
            </ListItemButton>
          </ListItem>
        </List>

        <List>
          <ListItem>
            <ListSubheader
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                textAlign: "center",
                color: "#F97300",
                backgroundColor: "transparent", // Set background color to transparent
              }}
            >
              Sitemap
            </ListSubheader>
          </ListItem>
          <ListItem>
            <ListItemButton>Services</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>Blog</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>About</ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListSubheader
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                textAlign: "center",
                color: "#F97300",
                backgroundColor: "transparent", // Set background color to transparent
              }}
            >
              Products
            </ListSubheader>
          </ListItem>
          <ListItem sx={{ width: "200px", height: "auto" }}>
            <ListItemButton>
              <img
                src={AppStore}
                alt="App Store"
                style={{ width: "100%", height: "100%" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ width: "200px", height: "auto" }}>
            <ListItemButton>
              <img
                src={PlayStore}
                alt="Play Store"
                style={{ width: "100%", height: "100%" }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </footer>
  );
}
