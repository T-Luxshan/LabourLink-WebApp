import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import {getLabourJobRoles} from '../Service/AuthService';
import Chip from '@mui/material/Chip';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#EC9851',
    },
    secondary: {
      main: '#00204A',
    },
    custom: {
      main: '#00204A',
    },
  },
});

const JobRole = ({onJobListChange}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [jobList, setJoblist] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);

  useEffect(() => {
    getLabourJobRoles()
      .then(response => {
      setJoblist(response.data);
    })
    .catch(error => {
      console.log('Error fetching job roles:');
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log(selectedJobs);
    onJobListChange(selectedJobs);
    setOpen(false);
  };

  const handleChipClick = (job) => {
    setSelectedJobs((prevSelectedJobs) => {
      if (prevSelectedJobs.includes(job)) {
        return prevSelectedJobs.filter((selectedJob) => selectedJob !== job);
      } else {
        return [...prevSelectedJobs, job];
      }
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Please select the job/jobs you prefer
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle>
          Please select the job/jobs you prefer
        </DialogTitle>
        <DialogContent>
          {jobList.map((job) => (
            <Chip
              key={job}
              label={job}
              variant={selectedJobs.includes(job) ? 'default' : 'outlined'}
              onClick={() => handleChipClick(job)}
              style={{
                borderColor: defaultTheme.palette.custom.main,
                color: selectedJobs.includes(job) ? 'white' : defaultTheme.palette.custom.main,
                backgroundColor: selectedJobs.includes(job) ? defaultTheme.palette.custom.main : 'transparent',
                margin: '5px'
              }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default JobRole;
