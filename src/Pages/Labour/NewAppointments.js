import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import appointmentData from "./Appointments.json";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkIcon from '@mui/icons-material/Work';
import { getAppointmentsByLabourAndStage } from "../../Service/HiringService";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#FE9E0D",
    },
    secondary: {
      main: "#00204A",
    },
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
  // const [jobRole, setJobRole] = useState([]);
  // const [service, setService] = useState("");
  // const [experience, setExperience] = useState("");
  // const [avgRating, setAvgRating] = useState("");
  // const [name, setName] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  let email = localStorage.getItem('userEmail');

  let availableJobRoles = ["Painter", "Driver"];

  useEffect(() => {
    // setJobRole(availableJobRoles);
    // setService(120);
    // setExperience(20);
    // setAvgRating(4.8);
    // setName("Luxshan Thuraisingam");
    getAppointmentsByLabourAndStage(email, "PENDING")
      .then(res=>{
        let appointmentData = res.data;
        setAppointments(appointmentData); // Set reviews from the imported JSON data
        if (appointmentData.length > 0) {
          setCurrentAppointment(appointmentData[0]);
        }
      })
      .catch(err=>{
        console.log("fetching appointmentData failed.", err);
        // navigate("/login"); uncomment later.
      })
    
  }, [email]);

  const handleViewClick = (appointment) => {
    setCurrentAppointment(appointment);
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
                    <Box sx={{m:4}}>
                      <Typography variant="h6" sx={{color:'#FE9E0D', fontWeight:'bold', mb:2}}>
                        Schedule details
                      </Typography>
                      <Typography sx={{mb:2}}>
                        <CalendarMonthIcon fontSize="small" /> {currentAppointment.date}
                      </Typography>
                      <Typography sx={{mb:2}}>
                        <AccessTimeIcon fontSize="small" /> {currentAppointment.startTime}
                      </Typography>
                      <Typography sx={{mb:2}}>
                        <WorkIcon fontSize="small" /> {currentAppointment.jobRole}
                      </Typography>

                      <Typography sx={{fontWeight:'bold', mb:2}}>
                       Client name : {currentAppointment.customerName}
                      </Typography>
                      
                      <Typography sx={{mb:2}}>
                        Description: {currentAppointment.jobDescription}
                      </Typography>
                      <Box sx={{display:'flex', justifyContent: 'right', gap: '50px', }}>
                        <Button variant="contained" color="secondary"> Accept </Button>
                        <Button variant="contained" color="secondary"> Reject </Button>
                      </Box>
                      
                    </Box>
                  ) : (
                    <Typography sx={{ textAlign: "center", color: "grey" }}>
                      There are no pending requests
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
                        backgroundColor:'#F6F9FD'
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
