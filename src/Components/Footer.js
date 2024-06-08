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
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <footer
      style={{
        backgroundColor: "#00204A",
        color: "#ffffff",
        padding: "20px 10px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isSmallScreen ? "1fr" : "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        <List>
          <ListSubheader
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "#F97300",
              backgroundColor: "transparent",
              marginBottom: "10px",
            }}
          >
            Contact Us
          </ListSubheader>
          <ListItem>
            <ListItemButton style={{ color: "#ffffff" }}>
              <PhoneIcon />
              <Box sx={{ ml: 1 }}>+94 011 123 4567</Box>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton style={{ color: "#ffffff" }}>
              <EmailIcon />
              <Box sx={{ ml: 1 }}>samplemail@gmail.com</Box>
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListSubheader
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "#F97300",
              backgroundColor: "transparent",
              marginBottom: "10px",
            }}
          >
            Social Media
          </ListSubheader>
          <ListItem>
            <ListItemButton style={{ color: "#ffffff" }}>
              <FacebookIcon />
              <Box sx={{ ml: 1 }}>Labor Link</Box>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton style={{ color: "#ffffff" }}>
              <InstagramIcon />
              <Box sx={{ ml: 1 }}>@labour_link</Box>
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListSubheader
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "#F97300",
              backgroundColor: "transparent",
              marginBottom: "10px",
            }}
          >
            Sitemap
          </ListSubheader>
          <ListItem>
            <ListItemButton style={{ color: "#ffffff" }}>Services</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton style={{ color: "#ffffff" }}>Blog</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton style={{ color: "#ffffff" }}>About</ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListSubheader
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "#F97300",
              backgroundColor: "transparent",
              marginBottom: "10px",
            }}
          >
            Products
          </ListSubheader>
          <ListItem style={{ justifyContent: "center" }}>
            <ListItemButton>
              <img
                src={AppStore}
                alt="App Store"
                style={{ width: "150px", height: "auto" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem style={{ justifyContent: "center" }}>
            <ListItemButton>
              <img
                src={PlayStore}
                alt="Play Store"
                style={{ width: "150px", height: "auto" }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          borderTop: "1px solid #F97300",
          paddingTop: "10px",
        }}
      >
        &copy; {new Date().getFullYear()} Labor Link. All rights reserved.
      </div>
    </footer>
  );
}
