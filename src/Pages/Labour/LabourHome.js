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
  // const [jobRole, setJobRole] = useState([]);
  const [service, setService] = useState('');
  const [experience, setExperience] = useState('');
  const [avgRating, setAvgRating] = useState('');
  // const [name, setName] = useState('');
  const [reviews, setReviews] = useState([]);
  const [aboutMe, setAboutMe] = useState('');
  const [language, setLanguage] = useState([]);
  const [gender, setGender] = useState('');
  // const [email, setEmail] = useState(localStorage.getItem('userEmail'));
  const [email, setEmail] = useState("sophiawilliams@example.com");
  const [labour, setLabour] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setService(120);
    setExperience(20);
    // setAvgRating(4.8);
    // setName('Luxshan Thuraisingam');
    // setReviews(reviewsData);
    // setLanguage(languages);
    // setAboutMe(" Experienced Driver with over two decades of dedicated service since the year 2000. Possessing a strong track record of safe driving, punctuality, and excellent knowledge of local and regional routes.");
    fetchLabour(email);
  }, [email]);

  const fetchLabour = (email) => {
    getLabourById(email)
      .then(res => {
        setLabour(res.data);
        console.log(res);
      })
      .catch(err => {
        console.log("labor fetching failed:", err);
      });

    getLabourProfileById(email)
      .then(res => {
        setProfile(res.data);
        setAboutMe(res.data.aboutMe);
        setGender(res.data.gender);
        setLanguage(res.data.languages);
        console.log(res);
      })
      .catch(err => console.log("profile fetch failed :", err));

    getMyReviews()
      .then(res=>{
        console.log(res.data);
        setReviews(res.data);
      })
      .catch(err => console.log("Review fetch failed :", err));

    getAvgRating()
      .then(res=>{
        setAvgRating(res.data);
      })
      .catch(err => console.log("avg rating fetch failed :", err));
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
  const  handleGender= (gen) => {
    setGender(gen);
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
                        {experience} yrs<br />
                        Experience
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
                backgroundColor: 'white', pt: 2, pl: 3, pr: 3, borderRadius: 4,
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
                  <Typography sx={{ fontWeight: '500', color: 'grey', mb: '5px' }}>
                    Say something about yourself, So customer will know about you.
                  </Typography>
                }

                <Typography sx={{ fontWeight: 'bold', color: '#FE9E0D', mt: '20px' }}>
                  Language
                </Typography>
                {profile && profile.languages && profile.languages.length !== 0 ?
                  <Typography sx={{ mb: 1, pb: 1 }}>
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
                  <Typography sx={{ mb: 2, pb: 3 }}>
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

export default LabourHome;
