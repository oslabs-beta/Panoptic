import styles from '../../styles/Home.module.scss';
import Link from 'next/link';
import InfoSect from './InfoSection';
import centerDash from '../../public/centerDash.png';
import Image from 'next/image';
import { FC } from 'react';
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image as ChakraImage,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
  Grid,
  Center,
  GridItem,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Intro: FC = (): JSX.Element => {
  const router = useRouter();
  const goToLogin = (e) => {
    e.preventDefault();
    router.push('/login');
  }
  const goToDocs = (e) => {
    e.preventDefault();
    router.push('/docs');
  }
  return (
     <Container maxW={'7L'}>
      <Stack
        mt={{base: 0, md: '8%'}}
        minH='95vh'
        align={'start'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 24, md: 20}}
        direction={{ base: 'column', lg: 'row' }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            textAlign={{base: 'center', md: 'left'}}
            lineHeight={1.2}
            fontWeight={800}
            fontSize={{ base: '5xl', sm: '5xl', lg: '6xl' }}>
            <Text
              as={'span'}
              position={'relative'}>
              Monitor Your Site
            </Text>
            <br />
            <Text as={'span'} color={'#266ef6'}>
              Metrics!
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Panoptic is an
            intuitive solution to keep track of key metrics for your web application, or website, over any given period of time
          </Text>
          <Stack
            justify={{base: 'center', md: 'left'}}
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}>
            <Button
              onClick={goToLogin}
              rounded={'full'}
              size={'lg'}
              fontWeight={'bold'}
              px={6}
              colorScheme={'red'}
              bg={'#266ef6'}
              _hover={{ bg: '#608fca' }}>
              Get started
            </Button>
            <Button
              onClick={goToDocs}
              rounded={'full'}
              size={'lg'}
              fontWeight={'bold'}
              px={6}
              leftIcon={<PlayIcon h={4} w={4} color={'gray.300'} />}>
              Learn More
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}>
          <Blob
            w={'150%'}
            h={'180%'}
            position={'absolute'}
            top={'-25%'}
            left={0}
            zIndex={1}
            opacity={1}
            color={'#266ef6'}
          />
          <Box
            textAlign={'center'}
            alignItems='center'
            position={'relative'}
            height={'auto'}
            rounded={'2xl'}
            boxShadow={'2xl'}
            width={'full'}
            zIndex={3}
            overflow={'hidden'}>
            <Image
            layout='responsive'
              alt={'Hero Image'}
              width={'3002px'}
              height={'1904px'}
              src={
                centerDash
              }
            />
          </Box>
        </Flex>
      </Stack>

      <InfoSect />
    </Container>
  );
}

const PlayIcon = createIcon({
  displayName: 'PlayIcon',
  viewBox: '0 0 58 58',
  d:
    'M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z',
});

export const Blob = (props: IconProps) => {
  return (
    <Icon
      width={'100%'}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};

  
  export default Intro;
  
  //   <Flex direction='column' m={5}>
  //     <Flex
  //       direction='column'
  //       align='center'
  //       borderRadius='25px'
  //       p={2}
  //       className={styles.introContainer}
  //     >
  //       <Heading size='2xl' mt={5} fontWeight='700' fontSize='4.4rem'>
  //         Panoptic
  //       </Heading>
  //       <Heading size='3xl' mt='1'>
  //         An innovative performance tracker
  //       </Heading>
  //       <Heading size='3xl' mt='2'>
  //         for Web Applications
  //       </Heading>
  //       <Text mt='4' fontSize='xl' fontWeight='bold'>
  //         An intuitive solution for monitoring key web application metrics over
  //         any given period of time
  //       </Text>

  //       {/* <Heading fontSize='xl' m={2}>
  //         An innovative process of tracking Your Web App Performance Metric
  //       </Heading> */}
  //     </Flex>
  //     {/* <Box className={styles.left}> */}
  //     <Flex direction='column' color={'black'} align='center' m={5}>
  //       <Heading size='3xl' m={5}>
  //         Empowering those that create to <br />
  //         <Center>Create more efficiently</Center>
  //       </Heading>
  //       <Box>
  //         <Link href='/docs'>
  //           <button id='docsBtn' className={styles.readDocs}>
  //             Learn More
  //           </button>
  //         </Link>
  //         <Link href='/demo'>
  //           <button id='demoBtn' className={styles.install}>
  //             Test our Demo
  //           </button>
  //         </Link>
  //       </Box>
  //     </Flex>
  //   </Flex>
  // );