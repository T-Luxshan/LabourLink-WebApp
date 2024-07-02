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
import { getUserRole, login, loginCustomer } from '../../Service/AuthService';
import { Navigate, useNavigate } from 'react-router-dom';
import addNotification from "react-push-notification";
import logo from "../../Images/app-logo3.png";

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

const SignInSide = () => {

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
      let lowercaseEmail = data.get('email').toLowerCase();
      getUserRole(lowercaseEmail)
        .then(res=>{
          console.log(res.data)
          login(res.data.role, lowercaseEmail, data.get('password'))
            .then(response=> {
              localStorage.setItem("token", response.data.accessToken);
              localStorage.setItem("refreshToken", response.data.refreshToken);
              localStorage.setItem("userEmail", lowercaseEmail);
              localStorage.setItem("userRole",res.data.role);
              console.log(response);
              if(res.data.role == 'CUSTOMER'){
                navigate('/');
                console.log(response);
                loggedIn();
              }else {
                if(res.data.verified) {
                  navigate('/labour/home');
                  console.log(response);
                  loggedIn();
                } else {
                  navigate('/wait');
                }
              }
            })
            .catch(error=> {
              console.log(error)
              setLogError("Invalid login, please try again");
            }); 
          
        })
        .catch(err=>{
          console.log(err);
          setLogError("Account with this email doesn't exist");
        })
      // let response = await loginCustomer("CUSTOMER", data.get('email'), data.get('password')); 
      //     localStorage.setItem("token", response.data.accessToken);
      //     localStorage.setItem("refreshToken", response.data.refreshToken);
      //     navigate('/');


      // new change of pull
     
            
      setLogError("");
    } catch (e){
      setLogError("Invalid login, please try again");
    }
    

  };

  const loggedIn = async () => {
    const notification = {
      title: "LogIn Success",
      message: "You have successfully logged In",
      // recipient: email,
      createdAt: new Date().toISOString(), // Add current time
    };

    try {
      addNotification({
        title: notification.title,
        message: notification.message,
        duration: 4000,
        icon: logo,
        native: true,
      });
    } catch (error) {
      console.error("Error saving notification", error);
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
            backgroundImage: `url(${require("../../Assets/Login.gif")})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[0] : t.palette.grey[900],
            backgroundSize: 'contain', 
            // backgroundSize: '600px 400px', 
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={2} square sx={{ height: '85vh', mt: '50px',}}>
          <Box
            sx={{
              my: 5,
              mx: 8,
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
              Sign in
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/joinas" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInSide;
