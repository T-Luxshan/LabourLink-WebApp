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
import { addReview, editReview } from '../Service/ReviewService';
import { getLabourJobRoles } from '../Service/AuthService';
import { getBooingDetailsById } from '../Service/HiringService';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#EC9851', 
    },
    secondary: {
      main: '#1976D2', 
    }, 
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Review = ({bookingId}) => {
  const [open, setOpen] = React.useState(false);
  const [jobRole, setJobRole] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [rating, setRating] = React.useState(2.5);
  const [error, setError] = React.useState('');
  const [reviewId, setReviewID] = React.useState(null);
  const [availableJobRoles, setAvailableJobRoles] = React.useState([]);
  const [labour, setLabour] = React.useState('');


  React.useEffect(()=>{
    fetchJobRoles();
    fetchReviewRequirments(bookingId);
  }, [bookingId])

  const fetchJobRoles = () => {
    getLabourJobRoles()
      .then(res=>setAvailableJobRoles(res.data))
      .catch(err=>console.log("Error fetching Job roles"));
  }

  const fetchReviewRequirments = (id) => {
    getBooingDetailsById(id)
      .then(res=>{
        setLabour(res.data);
        console.log(res.data);
      })
      .catch(err=>console.log("Failed to fetch labour."));
  }

  const handleChange = (event) => {
    setJobRole(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true)
  };
  const handleCancel = () => setOpen(false);

  const handleSave = () => {
    if(jobRole){
      setError('');  
      console.log(jobRole, description, rating );
      if(reviewId){
        editReview(reviewId, jobRole, description, rating, labour.labourId)
          .then(res=>{
            console.log(res);
            setReviewID(res.data.id);
          })
        .catch(err=>console.log(err))
        setOpen(false);
      }else{
      addReview(jobRole, description, rating, labour.labourId)
        .then(res=>{
          console.log(res);
          setReviewID(res.data.id);
        })
        .catch(err=>console.log(err))

      setOpen(false);
    }
    }else{
      setError("Please select the job role.")
    }
    
  };

  return (
    <ThemeProvider theme={defaultTheme}> 
    <Grid container component="main" item xs={false} sm={4} md={10} >
    {jobRole ?
      (
      <Button variant="contained"
      color="secondary" onClick={handleClickOpen}>
        Edit Review
      </Button>
      )
      :
      ( <Button variant="contained"
      color="secondary" onClick={handleClickOpen}>
          Add Review
        </Button>
      )
      }
                                    {/* Need to check the styling when we merge  */}
      <Grid item xs={12} sm={8} md={5} elevation={2} sx={{ height: '0vh',  }}> 
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCancel}
          aria-describedby="alert-dialog-slide-description"
          sx={{backgroundPosition: 'center',}}
        >
          <DialogTitle>Add Your Review for {labour.labourName}</DialogTitle>
          <DialogContent>
          <Box
              sx={{
                // '& > legend': {display:'flex',  mt: 2 },
                justifyContent: 'center',  mb: 1 , width:350
              }}
            >
              <DialogContentText>
              {/* <Typography component="legend" 
                    sx={{textAlign: 'center'}}
              > */}
              What is your rate for {labour.name}'s perfomance?
              {/* </Typography> */}
              </DialogContentText>
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
               
                <TextField
                  label="Your Review"
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
