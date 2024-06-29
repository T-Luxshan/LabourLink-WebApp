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
import { editUserReport, reportUser } from '../Service/ReportService';


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

const Report = ({reportTo}) => {
  const [open, setOpen] = React.useState(false);
  const [issue, setIssue] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [error, setError] = React.useState('');
  const [reportId, setReportID] = React.useState(null);

  
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
      if(reportId){
        editUserReport(reportId, issue, description, reportTo)
          .then(res=>{
            setReportID(res.data.id);
            console.log(res);
          })
          .catch(err=>console.log(err));  
      setOpen(false);
      }else{
        reportUser(issue, description, reportTo)
          .then(res=>{
            setReportID(res.data.id);
            console.log(res);
          })
          .catch(err=>console.log(err));  
        setOpen(false);
      }
    }else{
      setError("Please mention the issue.")
    }  
  };

  return (
    <ThemeProvider theme={defaultTheme}> 
    <Grid container component="main" item xs={false} sm={4} md={6} >
    {issue ?
      (
      <Button variant="outlined" onClick={handleClickOpen} sx={{fontSize: '12px', textTransform: 'none', ml: 0}}>
        Edit Report
      </Button>
      )
      :
      ( <Button variant="outlined" onClick={handleClickOpen} sx={{fontSize: '12px', textTransform: 'none', ml: 0}}>
          Report
        </Button>
      )
      }
                                    {/* Need to check the styling when we merge  */}
      <Grid item xs={12} sm={8} md={5} elevation={2} sx={{ height: '0vh', mt: '0px',  }}> 
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCancel}
          aria-describedby="alert-dialog-slide-description"
          sx={{backgroundPosition: 'center',}}
        >
          <DialogTitle>Report user</DialogTitle>
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
