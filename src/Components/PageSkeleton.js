import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";

const PageSkeleton = () => {
  return (
      <Box sx={{m:12}}>
    <Stack spacing={1}>

    {/* For variant="text", adjust the height via font-size */}
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="rectangular" width={910} height={100} />
          <Skeleton variant="circular" width={150} height={150} />
          <Skeleton variant="rectangular" width={910} height={210} />
          <Skeleton variant="rounded" width={210} height={60} />
          <Skeleton variant="rectangular" width={910} height={210} />
    </Stack>
      </Box>
      
  );
}

export default PageSkeleton;
