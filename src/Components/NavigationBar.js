import React, { useState, useEffect } from "react";
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
  Badge,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookIcon from "@mui/icons-material/Book";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import { findNotifications } from "../Service/NotificationService";
import { LogoutUser } from "../Service/AuthService";
import addNotification from "react-push-notification";
import logo from "../Images/app-logo3.png";
import {totalUnreadMessageCount} from "../Service/ChatService"

const NavigationBar = () => {
  const [email, setEmail] = useState(localStorage.getItem("userEmail"));
  const [notifications, setNotifications] = useState([]);
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const [totalUnreadMessageCounts,setTotalUnreadMessageCounts]=useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  async function findNotificationMessages(email) {
    try {
      const response = await findNotifications(email);
      // Sort notifications by time (newest first)
      const sortedNotifications = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNotifications(sortedNotifications);
    } catch (error) {
      console.log("Error fetching notifications ", error);
    }
  }

  async function findtotalUnreadMessageCounts(email) {
    try {
      const response = await totalUnreadMessageCount(email);
      setTotalUnreadMessageCounts(response.data);
      // console.log("total unread :",response.data);
    } catch (error) {
      console.log("Error fetching unread message count ", error);
    }
  }

  useEffect(() => {
    findNotificationMessages(email);
    findtotalUnreadMessageCounts(email);
  }, [notifications,totalUnreadMessageCounts]);

  const count = notifications.length;
  const readCount = notifications.filter(
    (notification) => notification.read
  ).length;
  const unreadCount = count - readCount;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    loggedOut();

    navigate("/login");
  };

  const loggedOut = async () => {
    const notification = {
      title: "Log Out Success",
      message: "You have successfully logged Out",
      // recipient: email,
      createdAt: new Date().toISOString(), // Add current time
    };

    try {
      addNotification({
        title: notification.title,
        message: notification.message,
        duration: 4000,
        icon: logo,
        native: true,
      });
    } catch (error) {
      console.error("Error saving notification", error);
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ background: "#00204A" }}>
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
                label="Hire Labor"
                component={Link}
                to="/labourcategories"
                sx={{
                  color: value === 1 ? "#F97300" : "white",
                  textTransform: "none",
                  fontFamily: "Montserrat",
                }}
                icon={<BookIcon />}
              />
              <Tab
                label="Chat"
                component={Link}
                to={`/chat`}
                sx={{
                  color: value === 2 ? "#F97300" : "white",
                  textTransform: "none",
                  fontFamily: "Montserrat",
                }}
                icon={
                  <>
                  <Badge
                    color="secondary"
                    badgeContent={totalUnreadMessageCounts}
                    max={99}
                  >
                    <ChatRoundedIcon sx={{mb: 0.5}}/>
                  </Badge>
                </>
                }
              />
              <Tab
                label="History"
                component={Link}
                to="/history"
                sx={{
                  color: value === 3 ? "#F97300" : "white",
                  textTransform: "none",
                  fontFamily: "Montserrat",
                }}
                icon={<HistoryRoundedIcon />}
              />
              <Tab
                label="Notification"
                component={Link}
                to="/notification"
                sx={{
                  color: value === 4 ? "#F97300" : "white",
                  textTransform: "none",
                  fontFamily: "Montserrat",
                }}
                icon={
                  <>
                    <Badge
                      color="secondary"
                      badgeContent={unreadCount}
                      max={99}
                    >
                      <NotificationsActiveIcon sx={{mb: 0.5}}/>
                    </Badge>
                  </>
                }
              />
              <Tab
                label="Profile"
                component={Link}
                to="/profile"
                sx={{
                  color: value === 5 ? "#F97300" : "white",
                  textTransform: "none",
                  fontFamily: "Montserrat",
                }}
                icon={<AccountCircleIcon sx={{mb: 2}}/>}
              />
            </Tabs>
          )}

          <>
            {email !== null ? (
              <Button
                sx={{ color: "white" }}
                variant="contained"
                onClick={handleLogout}
              >
                Log out
              </Button>
            ) : (
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
                  onClick={() => navigate("/joinas")}
                >
                  Sign Up
                </Button>
              </Stack>
            )}
          </>

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
