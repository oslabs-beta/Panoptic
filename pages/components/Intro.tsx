import styles from '../../styles/Home.module.scss';
import Link from 'next/link';
import React, { FC } from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  useMediaQuery,
  Heading,
  Center,
  Divider,
} from '@chakra-ui/react';

const Intro: FC = (): JSX.Element => {
  return (
    <Flex direction='column' m={5}>
      <Flex
        direction='column'
        align='center'
        bg='#266DF5'
        borderRadius='25px'
        // m={5}
        w={'100%'}
        h={'300'}
        p={2}
      >
        <Heading size='2xl' color={'white'} mt={5} fontFamily={'Chalkboard SE'}>
          Panoptic
        </Heading>
        <Heading size='3xl' color={'white'} fontFamily={'Chalkboard SE'} mt='1'>
          An innovative performance tracker
        </Heading>
        <Heading size='3xl' color={'white'} fontFamily={'Chalkboard SE'} mt='2'>
          for Web Applications
        </Heading>
        <Text mt='4' fontSize='xl' fontWeight='bold'>
          A cloud based solution for montiering web application over any given
          period of time.
        </Text>

        {/* <Heading fontSize='xl' m={2}>
          An innovative process of tracking Your Web App Performance Metric
        </Heading> */}
      </Flex>
      {/* <Box className={styles.left}> */}
      <Flex direction='column' color={'black'} align='center' m={5}>
        <Heading size='3xl' m={5}>
          Empowering those that create to <br />
          <Center>Create more efficiently</Center>
        </Heading>
        <Box>
          <Link href='/docs'>
            <button id='docsBtn' className={styles.readDocs}>
              Learn More
            </button>
          </Link>
          <Link href='/demo'>
            <button id='demoBtn' className={styles.install}>
              Test our Demo
            </button>
          </Link>
        </Box>
      </Flex>
      {/* </Box> */}
      {/* <div className={styles.right}></div> */}
    </Flex>
  );
};

export default Intro;
