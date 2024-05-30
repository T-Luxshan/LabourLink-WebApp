import * as React from 'react';
import  { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

const SignUp = () => {

  const [logError, setLogError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    try{
      let response = await loginCustomer("CUSTOMER", data.get('email'), data.get('password')); 

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      console.log(response);
      navigate('/');
            
      setLogError("");
    } catch (e){
      setLogError("Invalid login, please try again");
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
            backgroundImage: `url(${require("../../Assets/Signup3.gif")})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[0] : t.palette.grey[900],
            // backgroundSize: 'contain', 
            backgroundSize: '450px 450px', 
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={2} square sx={{ height: '95vh', mt: '15px',}}>
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

            
            
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            { logError &&
              <Typography variant="subtitle2" gutterBottom color="#742F2F" backgroundColor="#F4D6D2" 
                sx={{ mt: 0,
                      mb:0,
                      pt: 1, 
                      pr: 2,
                      pb: 1, 
                      pl: 2, 
                      borderRadius: 1
                        }}>
                {logError}
              </Typography>
            }
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Your Name"
                name="name"
                autoComplete="name"
                autoFocus
                sx={{ mb:0 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{ mb:0 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    sx={{ flex: 1, mr: 1,mb:0 }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    sx={{ flex: 1, ml: 1, mb:0 }}
                />
            </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="number"
                label="Mobile Number"
                name="number"
                autoComplete="number"
                autoFocus
                sx={{ mb:0 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                autoFocus
                sx={{ mb:0 }}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1, color: 'white'}}
              >
                Sign Up
              </Button>
              {/* <Grid container> */}
                <Grid item sx={{ml:15}}>
                  <Link href="#" variant="body2">
                    {"Have an account? Sign In"}
                   
                  </Link>
                </Grid>
              {/* </Grid> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignUp;
