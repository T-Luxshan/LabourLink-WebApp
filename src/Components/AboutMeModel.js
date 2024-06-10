import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Slide from '@mui/material/Slide';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';


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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const AboutMeModel = ({AboutMe, onAboutMeChange}) => {
  const [open, setOpen] = React.useState(false);
  const [issue, setIssue] = React.useState('');
  const [aboutMe, setAboutMe] = React.useState(AboutMe);
  const [error, setError] = React.useState('');
  const [profileId, setProfileId] = React.useState(null);

  
  const labour = {
            "name":"Luxshan",
            "email": "lucky@gmail.com"
          }

  const handleAboutMeChange = (event) => {
    setAboutMe(event.target.value);
    onAboutMeChange(event.target.value);
  };

  const handleClickOpen = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const handleSave = () => {
    // implement backend code.
      
  };

  return (
    <ThemeProvider theme={defaultTheme}> 
    <Grid container component="main" item xs={false} sm={4} md={6} >
    
      {/* // <Button variant="text" onClick={handleClickOpen} sx={{fontSize: '12px', textTransform: 'none', ml: 0}}>
      //   Edit Report
      // </Button> */}
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        <EditIcon fontSize='small'/>
      </IconButton>
     
                                    {/* Need to check the styling when we merge  */}
      <Grid item xs={12} sm={8} md={5} elevation={2} sx={{ height: '0vh', mt: '0px',  }}> 
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCancel}
          aria-describedby="alert-dialog-slide-aboutMe"
          sx={{backgroundPosition: 'center',}}
        >
          <DialogTitle>About Me</DialogTitle>
          <DialogContent>
          
            <DialogContentText id="alert-dialog-slide-aboutMe">
              Say something about yourself, So customer will know about you.
            </DialogContentText>
            <Box sx={{ minWidth: 120, my:1}}>
              <FormControl fullWidth> 
                <TextField
                  label="About Me"
                  variant="outlined"
                  value={aboutMe}
                  onChange={handleAboutMeChange}
                  multiline
                  rows={2}
                  placeholder="Say something about you"
                  sx={{ mt: 2 }}
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
    </ThemeProvider>
  );
};

export default AboutMeModel;