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
import { changePassword } from '../../Service/AuthServeice';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useEmailContext } from '../../Service/EmailContext';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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
});

const ChangePassword = () => {
  const { email } = useEmailContext();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // setOpen(false);
    navigate('/login');
  };
 
  const handleChangePassword = async (data) => {
    console.log(data);
    
    changePassword(email, data.password, data.confirmPassword)
        .then(res => {
            console.log(res);
            handleClickOpen();
            setError("");
        })
        .catch(error => {
            console.log(error);
            setError("Failed to change password, Please try again later");
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
            backgroundImage: `url(${require("../../Assets/password.gif")})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[0] : t.palette.grey[900],
            backgroundSize: '500px 500px', 
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
            <Typography variant="subtitle1" gutterBottom align="left" sx={{ fontWeight: 'bold' }}>
              Change Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(handleChangePassword)} sx={{ mt: 1 }}>
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
                    />
                  )}
                />
                <React.Fragment>
                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle sx={{color: 'green'}}>
                        Password has been changed sucessfully!!
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText >
                            Please log in to your account
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Log in
                        </Button>
                        </DialogActions>
                    </Dialog>
                    </React.Fragment>
               {loading ? 
              <Box sx={{ display: 'flex',  mt:4, ml:20}}>
                <CircularProgress color='primary'/>
              </Box>
              : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1, color: 'white' }}
              >
                Change Password
              </Button>
              )}
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

export default ChangePassword;
