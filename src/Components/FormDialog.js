import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { bookLabour } from "../Service/HiringService";
import { saveNotifications } from "../Service/NotificationService";
import {updateUserStatus} from "../Service/UserService";
import addNotification from "react-push-notification";
import logo from "../Images/app-logo3.png";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";

function FormDialog({ labourEmail, cutomerEmail, labourName }) {
  // Destructure props
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [bookingStage, setBookingStage] = useState("PENDING");
  const { jobRole } = useParams();
  const [booking, setBooking] = useState({
    labourId: "",
    customerId: "",
    date: "",
    startTime: "",
    bookingStage: "PENDING",
    jobDescription: "",
    jobRole:`${jobRole}`
  });
  const email = cutomerEmail;
  const navigate = useNavigate();
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "date":
        setDate(value);
        break;
      case "startTime":
        setStartTime(value);
        break;
      case "jobDescription":
        setJobDescription(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !labourEmail ||
      !cutomerEmail ||
      !date ||
      !startTime ||
      !jobDescription
    ) {
      console.error("Please fill out all required fields");
      return; // Prevent form submission if data is missing
    }

    const updatedBooking = {
      ...booking, // Spread existing booking state to avoid mutations
      labourId: labourEmail,
      customerId: cutomerEmail,
      date,
      startTime,
      jobDescription,
    };

    setBooking(updatedBooking); // Update booking state with latest data
    console.log("Form submitted:", updatedBooking);

    try {
      const response = await bookLabour(updatedBooking); // Assuming bookLabour returns a Promise
      // Handle successful booking response
      console.log("Booking successful:", response.data); // Example: access response data
      handleClose(); // Close the dialog (assuming handleClose exists)
      labourHired();
    } catch (error) {
      console.error("Error saving booking", error);
    }
    handleClose();
  };

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

  const updateUserStatusToDB = async(labourEmail) =>{
    try{
      const response = await updateUserStatus(labourEmail, { status: "ONLINE" });
      console.log(response);
      console.log("User status changed successfully");
    }catch (error) {
      console.error("Error updating user status:", error);
      // Handle errors such as displaying an error message to the user
    }

  }

  return (
    <React.Fragment>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          style={{ backgroundColor: "#F97300", color: "#00204A" }}
        >
          Hire <HowToRegRoundedIcon style={{ marginLeft: 10 }} />
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            navigate(`/chat/${cutomerEmail}/${labourEmail}`);
            {updateUserStatusToDB(labourEmail)}
          }}
        >
          Start Chat <SendRoundedIcon style={{ marginLeft: 10 }} />
        </Button>
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ component: "form", onSubmit: handleSubmit }}
      >
        <DialogTitle>Hire {labourName}</DialogTitle>
        <DialogContent dividers>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                fullWidth
                id="date"
                name="date"
                label="Date (YYYY-MM-DD)"
                type="date"
                value={date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                fullWidth
                id="startTime"
                name="startTime"
                label="Start Time"
                type="time"
                value={startTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                fullWidth
                name="jobDescription"
                id="jobDescription"
                label="Job Description"
                value={jobDescription}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default FormDialog;
