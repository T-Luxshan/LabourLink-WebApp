import React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

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
//   padding: 10,
  backgroundColor: '#F4F3EF',
});

const MainBox = styled(Box)({
  minHeight: '100vh',
  marginTop: 100,
  marginLeft: 20,
  backgroundColor: '#F4F3EF',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
  padding: '20px',
  borderRadius: 20,
});

const SubBox = styled(Box)({
  minHeight: '50vh',
  width: '100%',
  marginTop: 100,
  backgroundColor: '#F4F3EF',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  borderRadius: 20,
});

const LabourProfile = () => {

 const [jobRole, setJobRole] = useState([]);
 const [service, setService] = useState('');
 const [eperience, setExperience] = useState('');
 const [rating, setRating] = useState('');


 let availableJobRoles = [ "Painter", "Driver"];

 useEffect(()=>{
     setJobRole(availableJobRoles);
     setService(120);
     setExperience(20);
     setRating(4.8);
 }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <FullHeightBox>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <MainBox>
                <Box sx={{backgroundColor:'white', p:2, borderRadius:4,
                     backgroundImage: `url(${require("../../Assets/Ellipse3.png")})`,
                     backgroundRepeat: 'no-repeat',
                     backgroundSize: '800px 200px', 
                    }}>
                    <Avatar alt="Labour" src="../../Images/app-logo3.png" 
                     sx={{ width: 150, height: 150 }}/>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black', mb: '5px', mt: '20px' }}>
                        Luxshan Thuraisingam
                    </Typography>
                    <Typography   sx={{ fontWeight: '500', color: 'black', mb: '5px' }}>
                        {jobRole.join(' | ')}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '100px', marginTop: '20px' }}>
                        <Typography sx={{textAlign:'center', fontWeight: 'bold', color:'#00204A'}}>
                            {service} <br />
                            Total Service
                        </Typography>
                        <Typography sx={{textAlign:'center', fontWeight: 'bold', color:'#00204A'}}>
                            {eperience} yrs<br />
                            Experience
                        </Typography>
                        <Typography sx={{textAlign:'center', fontWeight: 'bold', color:'#00204A'}}>
                            {rating} <br />
                            Rating
                        </Typography>
                    </Box>
                    
                    
                </Box>
              
            </MainBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <SubBox>
            <Box sx={{backgroundColor:'white', p:2, borderRadius:4}}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black', mb: '5px', mt: '20px' }}>
                        My Review
                </Typography>
            </Box>
            
            </SubBox>
          </Grid>
        </Grid>
      </FullHeightBox>
    </ThemeProvider>
  );
}

export default LabourProfile;
