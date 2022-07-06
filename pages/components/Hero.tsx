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
} from '@chakra-ui/react';

const Hero: FC = (): JSX.Element => {
  return (
    <Flex className={styles.hero}>
      <div className={styles.right}></div>
      <Box className={styles.left}>
        <h1 className={styles.leftTitle}>
          Track Your Web Performance
          <span className={styles.panopticWord}> Metrics</span> Per Commit
        </h1>
        {/* <p className={styles.subText}>Refer to the docs for more information</p> */}
        <Box className={styles.heroBtnContainer}>
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
      </Box>
      {/* <div className={styles.right}></div> */}
    </Flex>
  );
};

export default Hero;
