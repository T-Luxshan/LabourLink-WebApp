import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import CallIcon from '@mui/icons-material/Call';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Report from '../../Components/Report';
import LanguageIcon from '@mui/icons-material/Language';
import reviewsData from './MyReviews.json';
import AboutMeModel from '../../Components/AboutMeModel';
import { getLabourById } from '../../Service/LabourService';
import { getAvgRating, getLabourProfileById, getMyReviews } from '../../Service/LabourHomeService';
import { useNavigate } from "react-router-dom";
import { getAppointmentsByLabourAndStage, UpdateBookingStage } from '../../Service/HiringService';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkIcon from '@mui/icons-material/Work';
import Button from "@mui/material/Button";
import { addLabourLocation } from '../../Service/LocationService';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#FE9E0D',
    },
    secondary: {
      main: '#00204A',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

const FullHeightBox = styled(Box)({
  margin: 0,
  backgroundColor: '#F6F9FD',
});

const MainBox = styled(Box)({
  minHeight: '100vh',
  marginTop: 80,
  marginLeft: 60,
  backgroundColor: '#F6F9FD',
  paddingTop: '20px',
  borderRadius: 20,
});

const SubBox = styled(Box)({
  minHeight: '50vh',
  marginTop: 80,
  marginRight: 50,
  backgroundColor: '#F6F9FD',
  padding: '20px',
  borderRadius: 20,
});

const LabourHome = () => {
  const navigate = useNavigate();
  const [service, setService] = useState(0);
  const [avgRating, setAvgRating] = useState();
  const [reviews, setReviews] = useState([]);
  const [aboutMe, setAboutMe] = useState('');
  const [language, setLanguage] = useState([]);
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState(localStorage.getItem('userEmail'));
  const [labour, setLabour] = useState(null);
  const [profile, setProfile] = useState(null);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [position, setPosition] = useState({ lat: 6.7953, lng: 79.9022 });

  useEffect(() => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          addLabourLocation(position.coords.latitude, position.coords.longitude, email)
            .then(res=>console.log(res.data))
            .catch(err=>console.log("failed to add location"))
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
      console.log(position);
      
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
    
    fetchLabour(email);
    appointmentDetails(email);
    // setAcceptedAppointments(appointmentData);
    // setCompletedAppointments(appointmentData);
  }, [email]);

  const fetchLabour = (email) => {
    getLabourById(email)
      .then(res => {
        setLabour(res.data);
        console.log(res);
      })
      .catch(err => {
        console.log("labour fetching failed:", err);
        // navigate("/login"); uncomment later.
      });

    getLabourProfileById(email)
      .then(res => {
        setProfile(res.data);
        setAboutMe(res.data.aboutMe);
        setGender(res.data.gender);
        setLanguage(res.data.languages);
        console.log(res);
      })
      .catch(err => {
        console.log("profile fetch failed :", err)
        // navigate("/login"); // uncomment later
      });

    getMyReviews()
      .then(res => {
        console.log(res.data);
        setReviews(res.data);
      })
      .catch(err => console.log("Review fetch failed :", err));

    getAvgRating()
      .then(res => {
        setAvgRating(res.data);
      })
      .catch(err => console.log("avg rating fetch failed :", err));
  }

  const appointmentDetails = (email) => {
    getAppointmentsByLabourAndStage(email, "ACCEPTED")
      .then(res => {
        setAcceptedAppointments(res.data);
      })
      .catch(err => {
        console.log("Fetching appointments failed", err);
        // navigate("/login"); // uncomment later
      })

      getAppointmentsByLabourAndStage(email, "COMPLETED")
      .then(res => {
        setCompletedAppointments(res.data);
        setService((res.data).length);
        console.log((res.data).length);
      })
      .catch(err => {
        console.log("Fetching appointments failed", err);
        // navigate("/login"); // uncomment later
      })
  }

  const handleReviewClick = (review) => {
    console.log(review);
  };

  const handleAboutMe = (abtME) => {
    setAboutMe(abtME);
  };

  const handleLanguage = (lang) => {
    setLanguage(lang);
  };

  const handleGender = (gen) => {
    setGender(gen);
  };

  const handleComplete = (id) => {
    console.log("this is ", id);
    UpdateBookingStage(id, "COMPLETED")
      .then(res=>{
        console.log("updated to completed");
        let updatedAccepted = acceptedAppointments.filter(appt => appt.id !== id);
        let completedAppt = acceptedAppointments.find(appt => appt.id === id);

        setService(service+1);
        setAcceptedAppointments(updatedAccepted);
        setCompletedAppointments([...completedAppointments, completedAppt]);
      })
      .catch(err=>console.log("update stage failed", err))
  }
  const handleReject = (id) => {
    UpdateBookingStage(id, "DECLINED")
      .then(res=>{
        console.log("updated to DECLINED");
        let updatedAccepted = acceptedAppointments.filter(appt => appt.id !== id);
        setAcceptedAppointments(updatedAccepted);
    })
      .catch(err=>console.log("update stage failed", err))
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <FullHeightBox>
        <Grid container spacing={0}>
          <Grid item xs={12} md={8}>
            <MainBox>
              <Box sx={{
                mb: 2,
                backgroundColor: 'white', p: 2, borderRadius: 4,
                backgroundImage: `url(${require("../../Assets/Ellipse3.png")})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '840px 200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left'
              }}>
                <Avatar alt="Labour" src={require('../../Images/findMe.png')} sx={{ width: 150, height: 150 }} />
                {labour && (
                  <>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black', mb: '5px', mt: '20px' }}>
                      {labour.name} 
                    </Typography>
                    <Typography sx={{ fontWeight: '500', color: 'black', mb: '5px' }}>
                      {labour.jobRole.join(' | ')}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '100px', marginTop: '20px' }}>
                      <Typography sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1A237E' }}>
                        {service} <br />
                        Total Service
                      </Typography>
                      <Typography sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1A237E' }}>
                        {avgRating} <br />
                        Rating
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
              {/* About me box */}
              <Box sx={{
                mb: 2,
                backgroundColor: 'white', pt: 2, pl: 3, pr: 3, borderRadius: 4
              }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', mb: '5px', mt: '20px' }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FE9E0D' }}>
                    About me
                  </Typography>
                  <AboutMeModel
                    onAboutMeChange={handleAboutMe}
                    onLanguageChange={handleLanguage}
                    onGenderChange={handleGender}
                  />
                </Box>
                {profile && profile.aboutMe ?
                  <Typography sx={{ fontWeight: '500', color: 'black', mb: '5px' }}>
                    {aboutMe}
                  </Typography>
                  :
                  <Typography sx={{ fontWeight: '500', color: 'grey', mb: '5px'}}>
                    Say something about yourself, So customer will know about you.
                  </Typography>
                }

                <Typography sx={{ fontWeight: 'bold', color: '#FE9E0D', mt: '20px'}}>
                  Language
                </Typography>
                {profile && profile.languages && profile.languages.length !== 0 ?
                  <Typography sx={{ mb: 1, pb: 1, display: 'flex', alignItems: 'center' }}>
                    <LanguageIcon sx={{ fontSize: 'small', mr: 1 }} />
                    {language.join(', ')}
                  </Typography>
                  :
                  <Typography sx={{ fontWeight: '500', color: 'grey', mb: '5px' }}>
                    Add language/ languages you speak.
                  </Typography>
                }
                <Typography sx={{ fontWeight: 'bold', color: '#FE9E0D', mt: '20px' }}>
                  Gender
                </Typography>
                {profile && profile.gender ?
                  <Typography sx={{ fontWeight: '500', color: 'black', mb: '5px' }}>
                    {gender}
                  </Typography>
                  :
                  <Typography sx={{ fontWeight: '500', color: 'grey', mb: '5px' }}>
                    Add your gender
                  </Typography>
                }

                <Typography sx={{ fontWeight: 'bold', color: '#FE9E0D', mt: '20px' }}>
                  Contact details
                </Typography>
                {labour && (
                  <Typography sx={{ mb: 2, pb: 3, display: 'flex', alignItems: 'center' }}>
                    <CallIcon sx={{ fontSize: 'small', mr: 1 }}></CallIcon>
                    {labour.mobileNumber}
                  </Typography>
                )}
              </Box>

              {/* Appointments */}
              <Box sx={{
                mb: 2,
                backgroundColor: 'white', pt: 2, pl: 3, pr: 3, borderRadius: 4,
              }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FE9E0D', mb: '5px', mt: '20px' }}>
                  Appointments
                </Typography>
                <Box sx={{ ml: 2, pb: 3 }}>
                  {acceptedAppointments.length === 0 ?
                    <Typography sx={{ textAlign: 'center', color: 'grey' }}>
                      There are no appointments to attend.
                    </Typography>
                    :
                    acceptedAppointments.map((appointment, index) => (
                      <Box sx={{ display: 'flex', flexDirection: 'column' }} key={index}>
                        <Box sx={{ p: 2, m: 1, borderRadius: 4 }} backgroundColor="#F6F9FD">
                          <Typography sx={{ mb: 0, pb: 1, display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                            <RadioButtonCheckedIcon fontSize='small' sx={{ mr: "5px" }} />
                            {appointment.customerName}
                          </Typography>
                          <Typography sx={{ mb: 1, ml: 3, pb: 1, display: 'flex', alignItems: 'center' }}>
                            <CalendarMonthIcon fontSize="10px" sx={{ mr: "5px" }} />
                            {appointment.date} |
                            <AccessTimeIcon fontSize="10px" sx={{ mr: "5px", ml: "5px" }} />
                            {appointment.startTime} |
                            <WorkIcon fontSize="small" sx={{ mr: "5px", ml: "5px" }} />
                            {appointment.jobRole}
                            <Box sx={{ ml: 10, display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                              <Button variant="outlined" color="secondary" onClick={()=> handleComplete(appointment.id)}>Completed</Button>
                              <Button variant="outlined" color="secondary" onClick={()=> handleReject((appointment.id))}>Reject</Button>
                            </Box>
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  }
                </Box>
              </Box>

              {/* Work history */}
              <Box sx={{
                mb: 2,
                backgroundColor: 'white', pt: 2, pl: 3, pr: 3, borderRadius: 4,
              }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FE9E0D', mb: '5px', mt: '20px' }}>
                  Work history
                </Typography>
                <Box sx={{ ml: 2, pb: 3 }}>
                  {completedAppointments.length === 0 ?
                    <Typography sx={{ textAlign: 'center', color: 'grey' }}>
                      Your work history is empty
                    </Typography>
                    :
                    completedAppointments.map((appointment, index) => (
                      <Box sx={{ display: 'flex', flexDirection: 'column' }} key={index}>
                        <Box sx={{ p: 2, m: 1, borderRadius: 4 }} backgroundColor="#F6F9FD">
                          <Typography sx={{ mb: 0, pb: 1, display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                            <RadioButtonCheckedIcon fontSize='small' sx={{ mr: "5px" }} />
                            {appointment.customerName}
                          </Typography>
                          <Typography sx={{ mb: 1, ml: 3, pb: 1, display: 'flex', alignItems: 'center' }}>
                            <CalendarMonthIcon fontSize="10px" sx={{ mr: "5px" }} />
                            {appointment.date} |
                            <AccessTimeIcon fontSize="10px" sx={{ mr: "5px", ml: "5px" }} />
                            {appointment.startTime} |
                            <WorkIcon fontSize="small" sx={{ mr: "5px", ml: "5px" }} />
                            {appointment.jobRole}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  }
                </Box>
              </Box>
            </MainBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <SubBox>
              <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A237E', mb: 3, mt: '5px', textAlign: 'center' }}>
                  My Reviews
                </Typography>
                {reviews.length === 0 ? (
                  <Typography sx={{ textAlign: 'center', color: 'grey' }}>
                    There are no reviews yet
                  </Typography>
                ) : (
                  reviews.map((review, index) => (
                    <Box key={index} sx={{ backgroundColor: '#F6F9FD', pt: 2, pr: 2, pl: 2, boxShadow: 0, borderRadius: 4, mb: 2, display: 'flex', flexDirection: 'column' }} onClick={() => handleReviewClick(review)}>
                      <Typography sx={{ fontWeight: 'bold', mb: 2 }}>{review.customerName}</Typography>
                      <Rating name="half-rating-read" value={review.rating} precision={0.5} readOnly />
                      <Typography sx={{ color: 'grey' }}>Job role : {review.jobRole}</Typography>
                      <Typography>{review.description}</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                        <Report reportTo={review.customerEmail} />
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
}

export default LabourHome;
