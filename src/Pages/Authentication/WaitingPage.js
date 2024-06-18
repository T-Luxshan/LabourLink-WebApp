import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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

const WaitingPage = () => {

    const [role, setRole] = useState('');
    const [enable, setEnable] = useState(true);
    const [selectedCustomer, setSelectedCustomer] = useState(false);
    const [selectedLabour, setSelectedLabour] = useState(false);
    const navigate = useNavigate();


    const sendMail = () => {
        window.location.href = 'mailto:labourlink@gmail.com';
      };
    
      const handleCall = () => {
        window.location.href = 'tel:+94764541834';
      };

    const handleLabour = () => {
        setRole("labour");
        setEnable(false);
        setSelectedLabour(true);
        setSelectedCustomer(false);
    }

    const createAccount = () => {
      navigate(`/signup/${role}`)
      console.log(role);
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <FullHeightBox>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            <BlueBox>
                <Typography  variant="h3" sx={{ fontWeight: 'bold', color:'white', mb: '20px', mt:'20px' }}>Hello Friend!</Typography>
                <Typography  variant="h6" sx={{ fontWeight: 'bold', color:'white', mb: '20px', mt:'20px' }}>Your registration is under process, We will get back at you within 2 weeks.</Typography>
                <Typography  variant="h6" sx={{ fontWeight: 'bold', color:'white', mb: '20px', mt:'20px' }}>For any inquiries contact us</Typography>

                <Box sx={{flexDirection:'row'}}>
                    <Button variant="text" color="primary" 
                        onClick={sendMail}
                        >
                    labourlink@gmail.com 
                    </Button>
                    <Button variant="text" color="primary" 
                        onClick={handleCall}
                        >
                        +94 76 4541 834 
                    </Button>
                </Box>
                

            </BlueBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <WhiteBox
                sx={{
                    backgroundImage:  `url(${require("../../Assets/processing.gif")})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[0] : t.palette.grey[900],
                    backgroundSize: 'cover',
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

export default WaitingPage;
