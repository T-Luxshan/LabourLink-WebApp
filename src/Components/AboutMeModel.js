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
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';

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
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const AboutMeModel = ({ AboutMe, onAboutMeChange, onLanguageChange }) => {
  const [open, setOpen] = useState(false);
  const [aboutMe, setAboutMe] = useState(AboutMe);
  const [language, setLanguage] = useState([]);
  

  const handleAboutMeChange = (event) => {
    setAboutMe(event.target.value);
    onAboutMeChange(event.target.value);
  };

  const handleClickOpen = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const handleSave = () => {
    // Implement backend save code here.
    if(aboutMe != '' && language.length != 0) // set errors
      setOpen(false); // Close dialog after save
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
            <DialogTitle>About Me</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-aboutMe">
                Say something about yourself, so customers will know about you.
              </DialogContentText>
              <Box sx={{ minWidth: 120, my: 1 }}>
                <FormControl fullWidth> 
                  <TextField
                    label="About Me"
                    variant="outlined"
                    value={aboutMe}
                    onChange={handleAboutMeChange}
                    multiline
                    rows={2}
                    required
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
                      required
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
