import { Spinner, Button, Box } from '@chakra-ui/react';
import { BeatLoader, PacmanLoader, RingLoader } from 'react-spinners';

const LoadingSpinner = (): JSX.Element => {
  return (
    <div className=''>
      {/* <Spinner /> */}
      {/* <Button
        isLoading
        colorScheme='blue'
        // spinner={<PacmanLoader size={25} color='red' />}
      >
        Click me
      </Button> */}
      {/* <Box>
        <PacmanLoader size={25} color='green' />
      </Box> */}
      <Box>
        <RingLoader size={160} color='green' />
      </Box>
    </div>
  );
};

export default LoadingSpinner;
