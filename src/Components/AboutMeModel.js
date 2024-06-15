import React, { useState } from 'react';
import {
  Grid,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Slide,
  TextField,
  IconButton,
  OutlinedInput,
  InputLabel,
  MenuItem,
  ListItemText,
  Select,
  Checkbox,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { createProfile, getLabourProfileById, updateProfile } from '../Service/LabourHomeService';
import CircularProgress from '@mui/material/CircularProgress';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const languages = [
  'Tamil',
  'Sinhala',
  'English',
];

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#EC9851', 
    },
    secondary: {
      main: '#EAE9E7', 
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const AboutMeModel = ({onAboutMeChange, onLanguageChange, onGenderChange }) => {
  const [open, setOpen] = useState(false);
  const [aboutMe, setAboutMe] = useState('');
  const [language, setLanguage] = useState([]);
  const [gender, setGender] = React.useState('');
  const [updated, setUpdated] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem('userEmail'));
  // const [email, setEmail] = useState("sophiawilliams@example.com");
  const [error, setError] = useState('');
  

  const handleGender = (event) => {
    setGender(event.target.value);
    onGenderChange(event.target.value);
  };

  const handleAboutMeChange = (event) => {
    setAboutMe(event.target.value);
    onAboutMeChange(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setUpdated(false);
    setError('');
  };

  const handleCancel = () => setOpen(false);

  const handleSave = () => {

    if (!aboutMe && language.length === 0 && !gender) {
      setError("Please fill out at least one field");
      return;
    }
    console.log(language);

    setIsLoading(true);

    getLabourProfileById(email)
      .then(res=>{
        const profileData = res.data;
        if(!profileData.aboutMe && (!profileData.language || profileData.language.length === 0) && !profileData.gender){
          createProfile(aboutMe, gender, languages, email)
            .then(res=>{
              setUpdated(true);
              setIsLoading(false);
              setOpen(false);
            })
            .catch(err=>{
              setError("Profile update failed");
              console.log(err);
            })
        }else {
          updateProfile(email, aboutMe, gender, language)
          .then(res => {
            setUpdated(true);
            setIsLoading(false);
            setOpen(false);
          })
          .catch(err => {
            setError("Profile update failed");
            console.log(err);
            // setIsLoading(false);
          });
        }
      })

    
  };

  const handleLanguageChange = (event) => {
    const {
      target: { value },
    } = event;
    setLanguage(
      typeof value === 'string' ? value.split(',') : value,
    );
    onLanguageChange(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" item xs={false} sm={4} md={6}>
        <IconButton aria-label="edit" onClick={handleClickOpen}>
          <EditIcon fontSize='small'/>
        </IconButton>

        <Grid item xs={12} sm={8} md={5} elevation={2} sx={{ height: '0vh', mt: '0px' }}> 
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCancel}
            aria-describedby="alert-dialog-slide-aboutMe"
            sx={{ backgroundPosition: 'center' }}
          >
            <DialogTitle>Personal details</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-aboutMe">
               Please add your personal details, so customers can know about you.
              </DialogContentText>
              <Box sx={{ minWidth: 120, my: 1 }}>
                {isLoading ? 
                  <Box sx={{m:10, ml:25}}>
                    <CircularProgress color='primary'/>
                  </Box>
                  :(
                  <>
                    <FormControl fullWidth> 
                      <TextField
                        label="About Me"
                        variant="outlined"
                        value={aboutMe}
                        onChange={handleAboutMeChange}
                        multiline
                        rows={2}
                        placeholder="Say something about yourself"
                        sx={{ mt: 2 }}
                      />

                      <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="language-select-label">Languages</InputLabel>
                        <Select
                          labelId="language-select-label"
                          id="language-select"
                          multiple
                          value={language}
                          onChange={handleLanguageChange}
                          input={<OutlinedInput label="Languages" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                        >
                          {languages.map((lang) => (
                            <MenuItem key={lang} value={lang}>
                              <Checkbox checked={language.indexOf(lang) > -1} />
                              <ListItemText primary={lang} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        label="Gender"
                        onChange={handleGender}
                      >
                        <MenuItem value={'Male'}>Male</MenuItem>
                        <MenuItem value={'Female'}>Female</MenuItem>
                        <MenuItem value={'Other'}>Other</MenuItem>
                        <MenuItem value={'Prefer not to say'}>Prefer not to say</MenuItem>
                      </Select>
                    </FormControl>
                    {updated && <Typography sx={{color:'green', mt:1}}>Successfully Updated!</Typography>}
                    {error && <Typography sx={{color:'red', mt:1}}>{error}</Typography>}
                  </>
                  )
                }
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
