import * as React from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { verifyOTP } from '../../Service/AuthService';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import OTPInput, { ResendOTP } from "otp-input-react";
import { useEmailContext } from '../../Service/EmailContext';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#EC9851', 
    },
    secondary: {
      main: '#EAE9E7', 
    },
  },
});

const schema = yup.object().shape({
  email: yup
    .string()
    .email("This is not a valid email")
    .required("Email is required"),
});

const VerifyOTP = () => {
  const { email } = useEmailContext();
  const { role } = useEmailContext();
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();



  const handleOTP = async () => {
    
    console.log(email);
    verifyOTP(OTP, email, role)
        .then(res => {
            console.log(res);
            navigate("/changepassword");
        }).catch(err => {
            console.log(error);
            setError("OTP verification failed");
        })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${require("../../Assets/OTP.gif")})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[0] : t.palette.grey[900],
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={2} square sx={{ height: '60vh', mt: '120px', ml:10}}>
          <Box
            sx={{
              my: 8,
              mx: 10,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
              alignItems:'center'
            }}
          >
            <Typography component="h5" variant="h5" align="left" sx={{mb:5, fontWeight: 'bold' }}>
              Enter the OTP
            </Typography>
            <Box sx={{alignItems:'center'}}>
                <Box sx={{ml:3}}>
                    <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} 
                        otpType="number" disabled={false} secure />
                    {error && 
                        <Typography variant="subtitle2" gutterBottom sx={{ m: 1, color:'red' }}>
                        {error}
                        </Typography>
                    }
                </Box>
                <Button variant="contained" onClick={handleOTP} 
                    sx={{mt:5, boxShadow: 'none', color:'white', width:'100%'}}>
                    Verify OTP
                </Button>
                <Box sx={{ mt: 0, ml: 7, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ mr: 0, lineHeight: 1 }}>
                        Didn't receive OTP?
                    </Typography>
                    <Button variant="text" 
                        sx={{ fontSize: 13, textTransform: 'none', pb: 2, mt:1, mr:10 }}>
                        Resend
                    </Button>
                </Box>

                {/* <ResendOTP onResendClick={() => console.log("Resend clicked")} 
                    style={{backgroundColor:"#FB9741"}}/> */}
                
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default VerifyOTP;
