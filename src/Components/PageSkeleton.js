import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme for duller and darker Skeleton
const theme = createTheme({
  components: {
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.25)', 
          animationDuration: '0.6s', 
        },
      },
    },
  },
});

const PageSkeleton = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ m: 12 }}>
        <Stack spacing={1}>
          <Skeleton variant="rectangular" width={910} height={100} />
          <Skeleton variant="circular" width={150} height={150} />
          <Skeleton variant="rectangular" width={910} height={210} />
          <Skeleton variant="rounded" width={210} height={60} />
          <Skeleton variant="rectangular" width={910} height={210} />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default PageSkeleton;
