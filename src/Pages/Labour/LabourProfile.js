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

import reviewsData from './MyReviews.json';
import AboutMeModel from '../../Components/AboutMeModel';

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

const LabourProfile = () => {
  const [jobRole, setJobRole] = useState([]);
  const [service, setService] = useState('');
  const [experience, setExperience] = useState('');
  const [avgRating, setAvgRating] = useState('');
  const [name, setName] = useState('');
  const [reviews, setReviews] = useState([]);
  const [aboutMe, setAboutMe] = useState('');

  let availableJobRoles = ["Painter", "Driver"];

  useEffect(() => {
    setJobRole(availableJobRoles);
    setService(120);
    setExperience(20);
    setAvgRating(4.8);
    setName('Luxshan Thuraisingam');
    setReviews(reviewsData);
    setAboutMe(" Experienced Driver with over two decades of dedicated service since the year 2000. Possessing a strong track record of safe driving, punctuality, and excellent knowledge of local and regional routes.");
  }, []);

  const handleReviewClick = (review) => {
    console.log(review);
  };

  const handleAboutMe = (abtME) => {
    setAboutMe(abtME);
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
                backgroundImage: `url(${require("../../Assets/Ellipse3.png")})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '840px 200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left'
              }}>
                <Avatar alt="Labour" src={require('../../Images/findMe.png')} sx={{ width: 150, height: 150 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black', mb: '5px', mt: '20px' }}>
                  {name}
                </Typography>
                <Typography sx={{ fontWeight: '500', color: 'black', mb: '5px' }}>
                  {jobRole.join(' | ')}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '100px', marginTop: '20px' }}>
                  <Typography sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1A237E' }}>
                    {service} <br />
                    Total Service
                  </Typography>
                  <Typography sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1A237E' }}>
                    {experience} yrs<br />
                    Experience
                  </Typography>
                  <Typography sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1A237E' }}>
                    {avgRating} <br />
                    Rating
                  </Typography>
                </Box>
              </Box>
              {/* About me box */}
              <Box sx={{
                mb: 2,
                backgroundColor: 'white', pt: 2, pl: 3, pr: 3, borderRadius: 4,
              }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', mb: '5px', mt: '20px' }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FE9E0D' }}>
                    About me
                  </Typography>
                  <AboutMeModel aboutMe={aboutMe} onAboutMeChange={handleAboutMe} />
                </Box>
                {aboutMe ?
                  <Typography sx={{ fontWeight: '500', color: 'black', mb: '5px' }}>
                    {aboutMe}
                  </Typography>
                  :
                  <Typography sx={{ fontWeight: '500', color: 'grey', mb: '5px' }}>
                    Say something about yourself, So customer will know about you.
                  </Typography>
                }

                <Typography sx={{ fontWeight: 'bold', color: '#FE9E0D', mt: '20px' }}>
                  Contact details
                </Typography>
                <Typography sx={{ fontWeight: 'bold', mb: 2, pb: 3 }}>
                  <CallIcon sx={{ fontSize: 'small', mr: 1 }}></CallIcon>
                  0764541834
                </Typography>
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
                  <Typography sx={{ fontWeight: '500', color: 'black', mb: '5px' }}>
                    <RadioButtonCheckedIcon sx={{ fontSize: 'small', mr: 1 }}></RadioButtonCheckedIcon>
                    Nina Patel
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: 'black', mb: '5px', ml: 3 }}>
                    20.12.2000 | 10am-2pm
                  </Typography>
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
                  <Typography sx={{ fontWeight: '500', color: 'black', mb: '5px' }}>
                    <RadioButtonCheckedIcon sx={{ fontSize: 'small', mr: 1 }}></RadioButtonCheckedIcon>
                    Nina Patel
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: 'black', mb: '5px', ml: 3 }}>
                    20.12.2000 | 10am-2pm
                  </Typography>
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
                {reviews.length === 0 ? (
                  <Typography sx={{ textAlign: 'center', color: 'grey' }}>
                    There are no reviews yet
                  </Typography>
                ) : (
                  reviews.map((review, index) => (
                    <Box key={index} sx={{ pt: 2, pr: 2, pl: 2, boxShadow: 1, borderRadius: 4, mb: 2, display: 'flex', flexDirection: 'column' }} onClick={() => handleReviewClick(review)}>
                      <Typography sx={{ fontWeight: 'bold', mb: 2 }}>{review.customerName}</Typography>
                      <Rating name="half-rating-read" value={review.rating} precision={0.5} readOnly />
                      <Typography sx={{ color: 'grey' }}>Job role : {review.jobRole}</Typography>
                      <Typography>{review.description}</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                        <Report />
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

export default LabourProfile;
