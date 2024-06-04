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

const Report = () => {
  const [open, setOpen] = React.useState(false);
  const [issue, setIssue] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [error, setError] = React.useState('');
  const [reviewId, setReviewID] = React.useState(null);

  
  const labour = {
            "name":"Luxshan",
            "email": "lucky@gmail.com"
          }
  const handleIssueChange = (event) => {
    setIssue(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleClickOpen = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const handleSave = () => {
    if(issue){
      setError('');  
      console.log(issue, description );
      // if(reviewId){
      //   editReview(reviewId, jobRole, description, rating, labour.email)
      //     .then(res=>{
      //       console.log(res);
      //       setReviewID(res.data.id);
      //     })
      //   .catch(err=>console.log(err))
      //   setOpen(false);
      // }else{
      // addReview(jobRole, description, rating, labour.email)
      //   .then(res=>{
      //     console.log(res);
      //     setReviewID(res.data.id);
      //   })
      //   .catch(err=>console.log(err))

      setOpen(false);
    
    }else{
      setError("Please select the job role.")
    }
    
  };

  return (
    <ThemeProvider theme={defaultTheme}> 
    <Grid container component="main" item xs={false} sm={4} md={6} >
    {issue ?
      (
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Report
      </Button>
      )
      :
      ( <Button variant="outlined" onClick={handleClickOpen}>
          Add Report
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
          <DialogTitle>Report {labour.name}</DialogTitle>
          <DialogContent>
          
            <DialogContentText id="alert-dialog-slide-description">
            Please mention the the issue and and describe the issue, so we can take action against that person.
            </DialogContentText>
            <Box sx={{ minWidth: 120, my:1}}>
              <FormControl fullWidth>
              <TextField
                  label="Your issue"
                  variant="outlined"
                  value={issue}
                  onChange={handleIssueChange}  
                  sx={{ mt: 2 }}
                />
                {error &&
                  <Typography component="legend" 
                  sx={{color:'red'}}
                  >
                  {error}
                  </Typography>
                }
               
                <TextField
                  label="Describe the issue"
                  variant="outlined"
                  value={description}
                  onChange={handleDescriptionChange}
                  multiline
                  rows={2}
                  placeholder="Say something briefly about the problem"
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

export default Report;
