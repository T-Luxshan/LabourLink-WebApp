// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   AppBar,
//   Toolbar,
//   Tabs,
//   Tab,
//   Typography,
//   Box,
//   useMediaQuery,
//   useTheme,
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
//   Stack,
//   Button,
// } from "@mui/material";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import BookIcon from "@mui/icons-material/Book";
// import MenuIcon from "@mui/icons-material/Menu";
// import HomeIcon from "@mui/icons-material/Home";
// import { useNavigate } from 'react-router-dom';

// const NavigationBar = () => {
//   const [value, setValue] = useState(0);
//   const theme = useTheme();
//   const isMatch = useMediaQuery(theme.breakpoints.down("md"));
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <React.Fragment>
//       <AppBar sx={{ background: "#00204A" }}>
//         <Toolbar>
//           <img
//             src={"/Images/app-logo3.png"}
//             alt="App Logo"
//             style={{ width: "50px", height: "auto" }}
//           />
//           <Box sx={{ mr: 3 }} /> {/* Add space */}
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexGrow: 10, color: "#F97300" }}
//             style={{ fontFamily: "Montserrat" }}
//           >
//             Labour LINK
//           </Typography>
//           {isMatch ? (
//             <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
//               <MenuIcon sx={{ color: "white" }} />
//             </IconButton>
//           ) : (
//             <Tabs
//               value={value}
//               onChange={handleChange}
//               TabIndicatorProps={{
//                 style: {
//                   backgroundColor: "#F97300",
//                   fontFamily: "Montserrat",
//                 },
//               }}
//             >
//               <Tab
//                 label="Home"
//                 component={Link}
//                 to="/"
//                 isSelected={value === 0}
//                 sx={{ color: value === 0 ? "#F97300" : "white" }}
//                 icon={<HomeIcon />}
//               />

//               <Tab
//                 label="Notification"
//                 component={Link}
//                 to="/notification"
//                 sx={value === 1 ? { color: "#F97300" } : { color: "white" }}
//                 icon={<NotificationsActiveIcon />}
//               />
//               <Tab
//                 label="Hire Labor"
//                 icon={<BookIcon />}
//                 component={Link}
//                 to="/labourcategories"
//                 isSelected={value === 2}
//                 sx={{ color: value === 2 ? "#F97300" : "white" }}
//               />

//               <Tab
//                 label="Profile"
//                 icon={<AccountCircleIcon />}
//                 component={Link}
//                 to="/profile"
//                 isSelected={value === 3}
//                 sx={{ color: value === 3 ? "#F97300" : "white" }}
//               />
//             </Tabs>
//           )}
//           <Box sx={{ mr: 4 }} /> {/* Add space */}
//           <Stack spacing={2} direction="row">
//             <Button sx={{ marginLeft: "auto" }} variant="contained" onClick={() => {navigate('/login');}}>
//               Log In
//             </Button>
//             <Button
//               sx={{ marginLeft: "auto", color: "white" }}
//               variant="outlined" onClick={() => {navigate('/signup');}}
//             >
//               Sign Up
//             </Button>
//           </Stack>
//         </Toolbar>
//       </AppBar>
//       <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
//         <List>
//           <ListItemButton>
//             <ListItemIcon>
//               <NotificationsActiveIcon />
//             </ListItemIcon>
//             <ListItemText>{"Notification"}</ListItemText>
//           </ListItemButton>
//           <ListItemButton>
//             <ListItemIcon>
//               <BookIcon />
//             </ListItemIcon>
//             <ListItemText>{"Hire Labor"}</ListItemText>
//           </ListItemButton>
//           <ListItemButton>
//             <ListItemIcon>
//               <AccountCircleIcon />
//             </ListItemIcon>
//             <ListItemText>{"Profile"}</ListItemText>
//           </ListItemButton>
//         </List>
//       </Drawer>
//     </React.Fragment>
//   );
// };

// export default NavigationBar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookIcon from "@mui/icons-material/Book";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <AppBar position="static" sx={{ background: "#00204A" }}>
        <Toolbar>
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <img
              src={"/Images/app-logo3.png"}
              alt="App Logo"
              style={{ width: "50px", height: "auto", marginRight: "10px" }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "#F97300", fontFamily: "Montserrat", flexGrow: 1 }}
            >
              Labour LINK
            </Typography>
          </Box>
          {isMatch ? (
            <IconButton onClick={handleDrawerToggle}>
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
          ) : (
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="secondary"
              aria-label="navigation tabs"
              sx={{ flexGrow: 1 }}
            >
              <Tab
                label="Home"
                component={Link}
                to="/"
                sx={{
                  color: value === 0 ? "#F97300" : "white",
                  textTransform: "none",
                  fontFamily: "Montserrat",
                }}
                icon={<HomeIcon />}
              />
              <Tab
                label="Notification"
                component={Link}
                to="/notification"
                sx={{
                  color: value === 1 ? "#F97300" : "white",
                  textTransform: "none",
                  fontFamily: "Montserrat",
                }}
                icon={<NotificationsActiveIcon />}
              />
              <Tab
                label="Hire Labor"
                component={Link}
                to="/labourcategories"
                sx={{
                  color: value === 2 ? "#F97300" : "white",
                  textTransform: "none",
                  fontFamily: "Montserrat",
                }}
                icon={<BookIcon />}
              />
              <Tab
                label="Profile"
                component={Link}
                to="/profile"
                sx={{
                  color: value === 3 ? "#F97300" : "white",
                  textTransform: "none",
                  fontFamily: "Montserrat",
                }}
                icon={<AccountCircleIcon />}
              />
            </Tabs>
          )}
          <Stack spacing={2} direction="row">
            <Button
              sx={{ color: "white" }}
              variant="contained"
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
            <Button
              sx={{ color: "white" }}
              variant="outlined"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={openDrawer} onClose={handleDrawerToggle}>
        <List>
          <ListItemButton component={Link} to="/" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/notification"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <NotificationsActiveIcon />
            </ListItemIcon>
            <ListItemText primary="Notification" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/labourcategories"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary="Hire Labor" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/profile"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default NavigationBar;
