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
import { loginCustomer } from '../../Service/AuthServeice';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

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

const ForgotPassword = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleOTP = async (data) => {
    console.log(data);
    try {
      // let response = await loginCustomer("CUSTOMER", data.email);
      // console.log(response);
      navigate('/');
      setError("");
    } catch (e) {
      setError("Couldn't send OTP, please try again in a few minutes");
    }
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
            backgroundImage: `url(${require("../../Assets/Forgot2.gif")})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[0] : t.palette.grey[900],
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={2} square sx={{ height: '70vh', mt: '90px', }}>
          <Box
            sx={{
              my: 8,
              mx: 8,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
            }}
          >
            <Typography component="h5" variant="h5" align="left" sx={{ fontWeight: 'bold' }}>
              Forgot Password?
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <br />
              No Problem! Enter your email below and we will send you an email with 
              OTP to reset your password.
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(handleOTP)} sx={{ mt: 1 }}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                  />
                )}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1, color: 'white' }}
              >
                Send OTP
              </Button>
              {error && (
                <Typography variant="subtitle2" gutterBottom color="#742F2F" backgroundColor="#F4D6D2"
                  sx={{
                    mt: 0,
                    mb: 0,
                    pt: 1,
                    pr: 2,
                    pb: 1,
                    pl: 2,
                    borderRadius: 1
                  }}>
                  {error}
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default ForgotPassword;
