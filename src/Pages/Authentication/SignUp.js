import * as React from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
  name: yup
    .string()
    .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Please enter a valid name")
    .required("Your name is required"),
  email: yup
    .string()
    .email("This is not a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(5, "Password can't be less than 5 letters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password can't be empty"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  mobileNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  address: yup.string().required("Address is required"),
});

const SignUp = () => {
  const [logError, setLogError] = useState('');
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    // try {
    //   let response = await loginCustomer("CUSTOMER", data.email, data.password); 
    //   localStorage.setItem("token", response.data.accessToken);
    //   localStorage.setItem("refreshToken", response.data.refreshToken);
    //   console.log(response);
    //   navigate('/');
    //   setLogError("");
    // } catch (e) {
    //   setLogError("Invalid login, please try again");
    // }
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
            backgroundImage: `url(${require("../../Assets/Signup3.gif")})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[0] : t.palette.grey[900],
            backgroundSize: '450px 450px', 
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={2} 
        square sx={{ height: '95vh', mt: '15px', overflow: 'auto' }}>
          <Box
            sx={{
              my: 1,
              mx: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              {logError && (
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="#742F2F"
                  backgroundColor="#F4D6D2"
                  sx={{
                    mt: 0,
                    mb: 0,
                    pt: 1,
                    pr: 2,
                    pb: 1,
                    pl: 2,
                    borderRadius: 1,
                  }}
                >
                  {logError}
                </Typography>
              )}
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Your Name"
                    autoComplete="name"
                    autoFocus
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ''}
                    sx={{ mb: 0 }}
                  />
                )}
              />
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
                    autoComplete="email"
                    autoFocus
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                    sx={{ mb: 0 }}
                  />
                )}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      error={!!errors.password}
                      helperText={errors.password ? errors.password.message : ''}
                      sx={{ flex: 1, mr: 1, mb: 0 }}
                    />
                  )}
                />
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="current-password"
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                      sx={{ flex: 1, ml: 1, mb: 0 }}
                    />
                  )}
                />
              </Box>
              <Controller
                name="mobileNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    id="number"
                    label="Mobile Number"
                    autoComplete="number"
                    autoFocus
                    error={!!errors.mobileNumber}
                    helperText={errors.mobileNumber ? errors.mobileNumber.message : ''}
                    sx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name="address"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    autoComplete="address"
                    autoFocus
                    error={!!errors.address}
                    helperText={errors.address ? errors.address.message : ''}
                    sx={{ mb: 0 }}
                  />
                )}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1, color: 'white' }}
              >
                Sign Up
              </Button>
              <Grid item sx={{ ml: 15 }}>
                <Link href="#" variant="body2">
                  {"Have an account? Sign In"}
                </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignUp;
