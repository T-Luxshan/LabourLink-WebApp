import * as React from 'react';
import { useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
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
import { registerLabour } from '../../Service/AuthServeice';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import UploadDocument from '../../Components/UploadDocument';
import JobRole from '../../Components/JobRole';

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

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
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
  nic: yup
    .string()
    .matches(/^[0-9]{12}$|^[0-9]{9}[v|V]$/, 'Please enter a valid NIC number')
    .required('Your NIC number is required')
});

const LabourSignUp = () => {
  const [logError, setLogError] = useState('');
  const [fileURI, setFileURI] = useState(null);
  const [nicError, setNicError] = useState('');
  const [jobList, setJoblist] = useState([]);
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors }, setError, clearErrors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFileURI = (fileUri) => {
    setFileURI(fileUri);
  }

  const handleJobList = (jobList) => {
    setJoblist(jobList);
  }

  const validateNIC = (value) => {
    if (!/^[0-9]{12}$|^[0-9]{9}[v|V]$/.test(value)) {
      setNicError('Please enter a valid NIC number');
      setError('nic', { message: 'Please enter a valid NIC number' });
    } else {
      setNicError('');
      clearErrors('nic');
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // name, email, password, mobileNumber, nic, documentUri, jobRole
      let lowercaseEmail = data.email.toLowerCase();
      let response = await registerLabour(data.name, lowercaseEmail, data.password ,data.mobileNumber, data.nic, fileURI, jobList); 
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      console.log(response);
      navigate('/');
      setLogError("");
    } catch (e) {
      setLogError("An account with this email or mobile number already exist");
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
            backgroundImage: `url(${require("../../Assets/Signup5.gif")})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[0] : t.palette.grey[900],
            backgroundSize: '480px 480px', 
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={5} 
        square sx={{ height: '95vh', mt: '15px', overflow: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.01)'}}>
          <Box
            sx={{
              my: 1,
              mx: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.001)'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{mt:0}}>
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
                    mt: 1,
                    mb: 1,
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
                    sx={{ mb: 0, mt:0 }}
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
                    error={!!errors.mobileNumber}
                    helperText={errors.mobileNumber ? errors.mobileNumber.message : ''}
                    sx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name="nic"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    id="nic"
                    label="NIC"
                    autoComplete="nic"
                    onChange={(e) => {
                      field.onChange(e); // Update field value
                      validateNIC(e.target.value); // Validate NIC
                    }}
                    error={!!errors.nic || !!nicError}
                    helperText={errors.nic ? errors.nic.message : nicError}
                    sx={{ mb: 0 }}
                  />
                )}
              />
              <Box sx={{mt:2, ml:2}}>
                <JobRole onJobListChange={handleJobList}/>
              </Box >
              <Box sx={{mt:2, ml:2}}>
                <UploadDocument nic={useWatch({ control, name: "nic" })} onFileUpload={handleFileURI} />
              </Box>
                  
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1, color: 'white' }}
              >
                Sign Up
              </Button>
              <Grid item sx={{ ml: 15 }}>
                <Link href="/login" variant="body2">
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

export default LabourSignUp;
