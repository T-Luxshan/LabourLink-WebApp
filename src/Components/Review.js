import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

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
  return <Slide direction="left" ref={ref} {...props} />;
});

const Review = () => {
  const [open, setOpen] = React.useState(false);
  const [jobRole, setJobRole] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [rating, setRating] = React.useState(2.5);
  const [error, setError] = React.useState('');

  const availableJobRoles = ["CARPENTER", "ELECTRICIAN", "PLUMBER", "PAINTER", "MASON", "WELDER", "DRIVER"];
  const labour = {
            "name":"Luxshan",
            "email": "lucky@gmail.com"
          }
  const handleChange = (event) => {
    setJobRole(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleClickOpen = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const handleSave = () => {
    if(jobRole){
      setError('');  
      console.log(jobRole, description, rating );
      setOpen(false);
    }else{
      setError("Please select the job role.")
    }
    
  };

  return (
    <ThemeProvider theme={defaultTheme}> 
    <Grid container component="main" item xs={false} sm={4} md={6} >
    {jobRole ?
      (
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Review
      </Button>
      )
      :
      ( <Button variant="outlined" onClick={handleClickOpen}>
          Add Review
        </Button>
      )
      }
                                    {/* Need to check the styling when we merge  */}
      <Grid item xs={12} sm={8} md={5} elevation={2} sx={{ height: '5vh', mt: '150px',  }}> 
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCancel}
          aria-describedby="alert-dialog-slide-description"
          sx={{backgroundPosition: 'center',}}
        >
          <DialogTitle>Add Your Review for {labour.name}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            Select the job role you hired for...
            </DialogContentText>
            <Box sx={{ minWidth: 120, my:1}}>
              <FormControl fullWidth>
                <InputLabel id="job-category-label">Job Category</InputLabel>
                <Select
                  labelId="job-category-label"
                  id="job-category-select"
                  value={jobRole}
                  label="Job Category"
                  onChange={handleChange}
                >
                  {availableJobRoles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
                {error &&
                  <Typography component="legend" 
                  sx={{color:'red'}}
                  >
                  {error}
                  </Typography>
                }
                <Box
                  sx={{
                    // '& > legend': {display:'flex',  mt: 2 },
                    justifyContent: 'center',  mt: 2 , width:350
                  }}
                >
                  <Typography component="legend" 
                        sx={{textAlign: 'center'}}
                  >
                    Rate {labour.name}'s perfomance
                  </Typography>
                  <Rating
                    name="half-rating"
                    value={rating}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                    sx={{ml:15}}
                  />
                </Box>
                <TextField
                  label="Review"
                  variant="outlined"
                  value={description}
                  onChange={handleDescriptionChange}
                  multiline
                  rows={2}
                  placeholder="Say something about his/her work"
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

export default Review;
