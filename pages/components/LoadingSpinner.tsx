import { Box } from '@chakra-ui/react';
import { RingLoader } from 'react-spinners';
import React, { FC } from 'react';

const LoadingSpinner:FC = (): JSX.Element => {
  return (
    <div className=''>
      <Box>
        <RingLoader size={160} color='green' />
      </Box>
    </div>
  );
};

export default LoadingSpinner;
