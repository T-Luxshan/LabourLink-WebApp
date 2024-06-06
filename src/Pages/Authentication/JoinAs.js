import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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
  minHeight: '100vh',
  width: '100%',
  margin: 0,
  padding: 0,
});

const BlueBox = styled(Box)({
  backgroundColor: '#00204A',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '20px',
});

const WhiteBox = styled(Box)({
  backgroundColor: 'white',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  '@media (max-width: 600px)': {
    backgroundImage: 'none',
  },
});

const JoinAs = () => {

    const [role, setRole] = useState('');
    const [enable, setEnable] = useState(true);
    const [selectedCustomer, setSelectedCustomer] = useState(false);
    const [selectedLabour, setSelectedLabour] = useState(false);


    const handleCustomer = () => {
        setRole("CUSTOMER");
        setEnable(false);
        setSelectedCustomer(true);
        setSelectedLabour(false);
    }

    const handleLabour = () => {
        setRole("LABOUR");
        setEnable(false);
        setSelectedLabour(true);
        setSelectedCustomer(false);
    }

    const createAccount = () => {
        console.log(role);
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <FullHeightBox>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            <BlueBox>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color:'white', mb: '20px', mt:'20px' }}>How do you want to</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color:'white' }}>use LabourLINK?</Typography>
                <Button variant={selectedCustomer ? "outlined" :"text" } color="primary" 
                    sx={{ width: '100%', maxWidth: '500px', height: '80px', fontSize: '1.5rem', mt: '1rem',
                     backgroundColor:selectedCustomer ? '#00204A' : '#001C41' }}
                    onClick={handleCustomer}
                    >
                    I am here to hire professionals
                </Button>
                <Button variant={selectedLabour ? "outlined" :"text" } color="primary" 
                    sx={{ width: '100%', maxWidth: '500px', height: '80px', fontSize: '1.5rem', mt: '1rem', mb: '5rem',
                     backgroundColor:selectedLabour ? '#00204A' : '#001C41' }}
                    onClick={handleLabour}
                    >
                    I am here to work
                </Button>
                <Button variant="contained" color="primary" disabled={enable} onClick={createAccount} sx={{ width: '100%', maxWidth: '500px' }}>Create account</Button>
            </BlueBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <WhiteBox
                sx={{
                    backgroundImage: enable ? `url(${require("../../Assets/Signup5.gif")})`
                      : (selectedCustomer ? `url(${require("../../Assets/hire.gif")})` : 
                      `url(${require("../../Assets/work.gif")})`),
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[0] : t.palette.grey[900],
                    backgroundSize: 'cover', // or 'contain' depending on your preference
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                }}
            >
            </WhiteBox>
          </Grid>
        </Grid>
      </FullHeightBox>
    </ThemeProvider>
  );
}

export default JoinAs;
