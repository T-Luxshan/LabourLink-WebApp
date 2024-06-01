import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import addNotification from "react-push-notification";
import logo from '../Images/app-logo3.png'; 
import { Container, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import { findNotifications, saveNotifications, updateNotificationReadStatus } from '../Service/NotificationService'


function Notification() {
  const email = "johndoe@example.com";
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    findNotificationMessages(email);
  }, [email]);

  async function findNotificationMessages(email) {
    try {
      const response = await findNotifications(email);
      // Sort notifications by time (newest first)
      const sortedNotifications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNotifications(sortedNotifications);
    } catch (error) {
      console.log("Error fetching notifications ", error);
    }
  }

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString();
  };

  const clickToNotify = async () => {
    const notification = {
      title: "First Notification",
      message: "This is the first notification testing",
      recipient: email,
      createdAt: new Date().toISOString() // Add current time
    };

    try {
      await saveNotifications(notification);
      addNotification({
        title: notification.title,
        message: notification.message,
        duration: 4000,
        icon: logo,
        native: true,
        onClick: () => navigate('/notification')
      });
      findNotificationMessages(email); // Fetch updated notifications
    } catch (error) {
      console.error("Error saving notification", error);
    }
  };

  const labourHired = async () => {
    const notification = {
      title: "Hiring Successful",
      message: "You have successfully hired ",
      recipient: email, // Adjust as necessary
      createdAt: new Date().toISOString() // Add current time
    };

    try {
      await saveNotifications(notification);
      addNotification({
        title: notification.title,
        message: notification.message,
        duration: 4000,
        icon: logo,
        native: true,
        onClick: () => navigate('/notification')
      });
      findNotificationMessages(email); // Fetch updated notifications
    } catch (error) {
      console.error("Error saving notification", error);
    }
  };

  const markNotificationAsRead = async (id) => {
    console.log(id);
    try {
      // Update the notification read status on the server
      await updateNotificationReadStatus(id, { read: true }); // Send only the 'read' field to be updated
      // Update the local state to mark the notification as read
      setNotifications(notifications.map(notification => {
        if (notification.id === id) {
          return { ...notification, read: true }; // Spread the existing notification properties and update 'read' to true
        } else {
          return notification;
        }
      }));
    } catch (error) {
      console.error("Error updating notification read status", error);
    }
  };
  
  

  return (
    <div>
      <button onClick={clickToNotify} style={{ margin: '100px' }}>
        Click to Notify
      </button>

      <button onClick={labourHired} style={{ margin: '100px' }}>
        Hire
      </button>

      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Typography variant="h4" gutterBottom>
          Notifications
        </Typography>
        <List>
          {notifications.map((notification) => (
            <React.Fragment key={notification.id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  bgcolor: notification.read ? '#f9f9f9' : '#fff',
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': {
                    bgcolor: '#f0f0f0',
                  },
                  padding: 2
                }}
              >
                <ListItemAvatar>
                  <Badge
                    color="secondary"
                    variant="dot"
                    invisible={notification.read}
                    overlap="circular"
                  >
                    <Avatar sx={{ bgcolor: notification.read ? 'grey.300' : 'primary.main' }}>
                      <NotificationsIcon />
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', color: notification.read ? 'text.secondary' : 'text.primary' }}>
                      {notification.title}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2" color="textPrimary">
                        {notification.message}
                      </Typography>
                      <br />
                      <Typography component="span" variant="caption" color="text.secondary">
                        {formatTime(notification.createdAt)}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => markNotificationAsRead(notification.id)} // Call markNotificationAsRead function with notification id
                  sx={{ color: 'error.main' }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Container>
    </div>
  );
}

export default Notification;
