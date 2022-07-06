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
        borderRadius='25px'
        p={2}
        className={styles.introContainer}
      >
        <Heading size='2xl' mt={5} fontWeight='700' fontSize='4.4rem'>
          Panoptic
        </Heading>
        <Heading size='3xl' mt='1'>
          An innovative performance tracker
        </Heading>
        <Heading size='3xl' mt='2'>
          for Web Applications
        </Heading>
        <Text mt='4' fontSize='xl' fontWeight='bold'>
          An intuitive solution for monitoring key web application metrics over any given
          period of time
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
    </Flex>
  );
};

export default Intro;
