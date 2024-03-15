import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FiArrowRight } from "react-icons/fi";
import NavigationBar from "../Components/NavigationBar";
import BannerBackground from "../Assets/home-banner-background.png";
import LaborBanner from "../Assets/Labor-Banner.png";

const Home = () => {
  const theme = useTheme();

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
    <Box sx={{ flexGrow: 1 }}>
      <NavigationBar />
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: isSmallScreen ? "500px" : "700px",
          backgroundImage: `url(${BannerBackground})`,
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          position: "relative",
          backgroundPosition: "right",
        }}
      >
        {/* Overlay Image */}
        <img
          src={LaborBanner}
          alt="Overlay"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            maxWidth: "50%", // Initially set to 100% to ensure responsiveness
            height: "auto",
            opacity: 1,
            "@media (min-width: 768px)": {
              maxWidth: "75%", // Set to 75% on screens wider than 768px
            },
            "@media (max-width: 767px)": {
              maxWidth: "25%", // Set to 50% on screens narrower than 768px
            },
          }}
        />

        <Typography
          variant={isSmallScreen ? "h4" : "h2"}
          sx={{
            color: "#4c4c4c",
            maxWidth: "600px",
            mt: "5rem",
            fontFamily: "Montserrat",
          }}
        >
          Welcome To <br />
          Labor Hiring App
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#6a6a6a",
            maxWidth: "500px",
            mt: "1.5rem",
            fontFamily: "Open Sans",
          }}
        >
          Join Us, Find your fit and feel appreciated!
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: "2rem",
            backgroundColor: "#00204A",
            color: "white",
            padding: "1rem 2rem", // Adjust padding to increase button size
          }}
        >
          Hire Now <FiArrowRight />
        </Button>
      </Paper>
    </Box>
  );
};

export default Home;
