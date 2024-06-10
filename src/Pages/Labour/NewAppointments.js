import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Report from '../../Components/Report';

// Import the reviews JSON data
import reviewsData from './MyReviews.json';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#FE9E0D',
    },
    secondary: {
      main: '#00204A',
    },
  },
});

const FullHeightBox = styled(Box)({
  margin: 0,
  backgroundColor: '#F4F3EF',
});

const MainBox = styled(Box)({
  minHeight: '100vh',
  marginTop: 80,
  marginLeft: 60,
  backgroundColor: '#F4F3EF',
  paddingTop: '20px',
  borderRadius: 20,
});

const SubBox = styled(Box)({
  minHeight: '50vh',
  marginTop: 80,
  marginRight: 50,
  backgroundColor: '#F4F3EF',
  padding: '20px',
  borderRadius: 20,
});

const NewAppointments = () => {
  const [jobRole, setJobRole] = useState([]);
  const [service, setService] = useState('');
  const [experience, setExperience] = useState('');
  const [avgRating, setAvgRating] = useState('');
  const [name, setName] = useState('');
  const [reviews, setReviews] = useState([]);
  const [appointment, setAppointment] = useState([]);

  let availableJobRoles = ["Painter", "Driver"];

  useEffect(() => {
    setJobRole(availableJobRoles);
    setService(120);
    setExperience(20);
    setAvgRating(4.8);
    setName('Luxshan Thuraisingam');
    setReviews(reviewsData); // Set reviews from the imported JSON data
  }, []);

  const handleReviewClick = (review) => {
    console.log(review);
  };

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
                
              }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black', mb: '5px', mt: '20px' }}>
                  Appointment requests
                </Typography>
                <Box sx={{ marginTop: '20px' }}>
                  {appointment.length === 0 ? (
                    <Typography sx={{ textAlign: 'center', color: 'grey' }}>
                      There are no pending requests
                    </Typography>
                  ) : (
                    // Map through appointments here if there are any
                    appointment.map((appt, index) => (
                      <Typography key={index}>
                        {/* Display appointment details here */}
                        {appt.detail}
                      </Typography>
                    ))
                  )}
                </Box>
              </Box>
            </MainBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <SubBox>
              <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A237E', mb: 3, mt: '20px' }}>
                  My Reviews
                </Typography>
                {reviews.map((review, index) => (
                  <Box key={index} sx={{ pt: 2, pr: 2, pl: 2, boxShadow: 1, borderRadius: 4, mb: 2, display: 'flex', flexDirection: 'column' }} onClick={() => handleReviewClick(review)}>
                    <Typography sx={{ fontWeight: 'bold', mb: 2 }}>{review.customerName}</Typography>
                    <Rating name="half-rating-read" value={review.rating} precision={0.5} readOnly />
                    <Typography sx={{ color: 'grey' }}>Job role : {review.jobRole}</Typography>
                    <Typography>{review.description}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                      <Report />
                    </Box>
                  </Box>
                ))}
              </Box>
            </SubBox>
          </Grid>
        </Grid>
      </FullHeightBox>
    </ThemeProvider>
  );
}

export default NewAppointments;
