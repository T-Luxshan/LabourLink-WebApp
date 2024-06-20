import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkIcon from "@mui/icons-material/Work";
import {
  getAppointmentsByLabourAndStage,
  UpdateBookingStage,
  getFullBookingDetails,
} from "../../Service/HiringService";
import addNotification from "react-push-notification";
import { saveNotifications } from "../../Service/NotificationService";
import logo from "../../Images/app-logo3.png";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../../Service/AuthService";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#FE9E0D",
    },
    secondary: {
      main: "#00204A",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

const FullHeightBox = styled(Box)({
  margin: 0,
  backgroundColor: "#F6F9FD",
});

const MainBox = styled(Box)({
  minHeight: "100vh",
  marginTop: 80,
  marginLeft: 60,
  backgroundColor: "#F6F9FD",
  paddingTop: "20px",
  borderRadius: 20,
});

const SubBox = styled(Box)({
  minHeight: "50vh",
  marginTop: 80,
  marginRight: 50,
  backgroundColor: "#F6F9FD",
  padding: "20px",
  borderRadius: 20,
});

const NewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  let email = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    getAppointmentsByLabourAndStage(email, "PENDING")
      .then((res) => {
        let appointmentData = res.data;
        setAppointments(appointmentData);
        if (appointmentData.length > 0) {
          setCurrentAppointment(appointmentData[0]);
        }
      })
      .catch((err) => {
        console.log("fetching appointmentData failed.", err);
        LogoutUser();
        navigate("/login"); 
      });
  }, [email]);

  useEffect(() => {
    if (currentAppointment) {
      getFullHiringDetails(currentAppointment.id);
    }
  }, [currentAppointment]);

  async function getFullHiringDetails(id) {
    try {
      const response = await getFullBookingDetails(id);
      setBookingDetails(response.data);
    } catch (error) {
      console.log("error fetching booking details", error);
    }
  }

  const handleViewClick = (appointment) => {
    setCurrentAppointment(appointment);
  };

  const handleAccept = (id) => {
    // if (!bookingDetails) return; 
    labourAccepted();
    UpdateBookingStage(id, "ACCEPTED")
      .then((res) => {
        console.log("updated to ACCEPTED");
        let updatedPending = appointments.filter((appt) => appt.id !== id);
        setAppointments(updatedPending);
        setCurrentAppointment("");
      })
      .catch((err) => console.log("update stage failed", err));
  };

  const handleReject = (id) => {
    // if (!bookingDetails) return;
    labourRejected();
    UpdateBookingStage(id, "DECLINED")
      .then((res) => {
        console.log("updated to DECLINED");
        let updatedPending = appointments.filter((appt) => appt.id !== id);
        setAppointments(updatedPending);
        setCurrentAppointment(null);
      })
      .catch((err) => console.log("update stage failed", err));
  };

  const labourAccepted = async () => {
    if (!currentAppointment || !bookingDetails) return;

    const notification = {
      title: `Request accepted from ${currentAppointment.customerName}`,
      message: `You have successfully accepted hiring request from ${currentAppointment.customerName}`,
      recipient: email,
      createdAt: new Date().toISOString(),
    };

    const notificationToCustomer = {
      title: `Request for ${currentAppointment.jobRole} accepted by ${bookingDetails.labourName}`,
      message: `Labour has successfully accepted hiring request`,
      recipient: bookingDetails.customerId,
      createdAt: new Date().toISOString(),
    };

    try {
      await saveNotifications(notification);
      await saveNotifications(notificationToCustomer);
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

  const labourRejected = async () => {
    if (!currentAppointment || !bookingDetails) return;

    const notification = {
      title: `Request from ${currentAppointment.customerName} rejected`,
      message: `You have rejected hiring request from ${currentAppointment.customerName}`,
      recipient: email,
      createdAt: new Date().toISOString(),
    };

    const notificationToCustomer = {
      title: `Request for ${currentAppointment.jobRole} is rejected by ${bookingDetails.labourName}`,
      message: `Labour has rejected hiring request`,
      recipient: bookingDetails.customerId,
      createdAt: new Date().toISOString(),
    };
    try {
      await saveNotifications(notification);
      await saveNotifications(notificationToCustomer);
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <FullHeightBox>
        <Grid container spacing={0}>
          <Grid item xs={12} md={8}>
            <MainBox>
              <Box
                sx={{
                  mb: 2,
                  backgroundColor: "white",
                  p: 2,
                  borderRadius: 4,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "black",
                    mb: "5px",
                    mt: "20px",
                  }}
                >
                  Appointment requests
                </Typography>
                <Box sx={{ marginTop: "20px" }}>
                  {currentAppointment ? (
                    <Box sx={{ m: 4 }}>
                      <Typography
                        variant="h6"
                        sx={{ color: "#FE9E0D", fontWeight: "bold", mb: 2 }}
                      >
                        Schedule details
                      </Typography>
                      <Typography sx={{ mb: 2 }}>
                        <CalendarMonthIcon fontSize="small" />{" "}
                        {currentAppointment.date}
                      </Typography>
                      <Typography sx={{ mb: 2 }}>
                        <AccessTimeIcon fontSize="small" />{" "}
                        {currentAppointment.startTime}
                      </Typography>
                      <Typography sx={{ mb: 2 }}>
                        <WorkIcon fontSize="small" />{" "}
                        {currentAppointment.jobRole}
                      </Typography>

                      <Typography sx={{ fontWeight: "bold", mb: 2 }}>
                        Client name : {currentAppointment.customerName}
                      </Typography>

                      <Typography sx={{ mb: 2 }}>
                        Description: {currentAppointment.jobDescription}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "right",
                          gap: "50px",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleAccept(currentAppointment.id)}
                        >
                          {" "}
                          Accept{" "}
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleReject(currentAppointment.id)}
                        >
                          {" "}
                          Reject{" "}
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Typography sx={{ textAlign: "center", color: "grey" }}>
                      Click view to respond to the pending requests.
                    </Typography>
                  )}
                </Box>
              </Box>
            </MainBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <SubBox>
              <Box sx={{ backgroundColor: "white", p: 2, borderRadius: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#1A237E",
                    mb: 3,
                    mt: "20px",
                  }}
                >
                  Pending requests
                </Typography>
                {appointments.length === 0 ? (
                  <Typography sx={{ textAlign: "center", color: "grey" }}>
                    There are no pending requests
                  </Typography>
                ) : (
                  appointments.map((appointment, index) => (
                    <Box
                      key={index}
                      sx={{
                        pt: 2,
                        pr: 2,
                        pl: 2,
                        boxShadow: 1,
                        borderRadius: 4,
                        mb: 2,
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#F6F9FD",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold", mb: 0 }}>
                        {appointment.customerName}
                      </Typography>
                      <Typography sx={{ color: "grey" }}>
                        I Need a {appointment.jobRole} on {appointment.date}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          mt: 0,
                        }}
                      >
                        <Button
                          onClick={() => handleViewClick(appointment)}
                          sx={{
                            fontSize: "12px",
                            textTransform: "none",
                            ml: "auto",
                          }}
                        >
                          View
                        </Button>
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            </SubBox>
          </Grid>
        </Grid>
      </FullHeightBox>
    </ThemeProvider>
  );
};

export default NewAppointments;
