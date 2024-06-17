import React from 'react'
import addNotification from "react-push-notification";
import { saveNotifications } from "../../Service/NotificationService";
import logo from "../Images/app-logo3.png";
import { useNavigate } from "react-router-dom";

const labourHired = async () => {
    const notification = {
      title: `Hiring Request sent to ${labourName}`,
      message: `You have successfully sent hiring request to ${labourName} you will be notified when he accepts you work`,
      recipient: email, // Adjust as necessary
      createdAt: new Date().toISOString(), // Add current time
    };

    try {
      await saveNotifications(notification);
      addNotification({
        title: notification.title,
        message: notification.message,
        duration: 4000,
        icon: logo,
        native: true,
        onClick: () => navigate("/notification"),
      });
    } catch (error) {
      console.error("Error saving notification", error);
    }
  };

export default labourHired
