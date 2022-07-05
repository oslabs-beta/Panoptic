import type { NextPage } from 'next';
import { useState, useEffect, useRef } from 'react';
import Nav from './components/Nav';
import LH_Gauge from './components/lhGauge';
import ControlPanelDemo from './components/ControlPanelDemo';
import WrightDetailsDemo from './components/wrightDetailsDemo';
import styles from '../styles/Demo.module.scss';
import Sidenav from './components/Sidenav';
import axios from 'axios';
import { parseCookies } from '../lib/parseCookies';
import EndpointsList from './components/EndpointsList';
import {
  Flex,
  Box,
  VStack,
  Center,
  Heading,
  HStack,
  Progress,
} from '@chakra-ui/react';
import { RingLoader } from 'react-spinners';
import { any } from 'webidl-conversions';
import { ClassNames } from '@emotion/react';

const DataTest:NextPage = ({ initialRememberValue }, props: any):JSX.Element => {
  const [lighthouseData, setLighthouseData] = useState({
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0,
  });
  const [scores, setScores] = useState(
    <Box>
      <VStack spacing={0}>
        <Heading>Waiting For Tests...</Heading>
      </VStack>
    </Box>
  );
  // selected metric type state
  const [selectedMetric, setSelectedMetric] = useState('performanceMetrics');
  const didMount = useRef(false);

  const helperFunc = async ():Promise<void> => {
    const urlData:any = document.querySelector('#urlData');
    setScores(
      <Box>
        <VStack spacing={0}>
          <Heading className={styles.dataLoading}>Data Loading</Heading>
          <Center>
            <RingLoader size={120} color='white' />
          </Center>
        </VStack>
      </Box>
    );
    // get data from lighthouse api
    await fetch(`http://localhost:3000/api/lighthousedemo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(urlData.value),
    })
      .then((res) => res.json())
      .then((data) => {
        didMount.current = true;
        setLighthouseData(data);
      });
    // clear input value after clicking
    urlData.value = '';
  };

  useEffect(():void => {
    if (didMount.current) {
      setScores(
        <div id='controlGauges' className={styles.containerGauge}>
          <ControlPanelDemo
            lhdata={lighthouseData}
            selectedMetric={selectedMetric}
            setSelectedMetric={setSelectedMetric}
          />
        </div>
      );
    };
  }, [
    lighthouseData.performance,
    lighthouseData.accessibility,
    lighthouseData.bestPractices,
    lighthouseData.seo,
  ]);

  const [loadData, setLoadData] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  const [performanceData, setPerformanceData] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const [bestPracticeData, setBestPracticeData] = useState(null);
  const [accessibilityData, setAccessibilityData] = useState(null);

  return (
    <div className={styles.threeParts}>
      <div className={styles.containerLeft}>
        <div className={styles.metricsContainer}>
          <h1 className={styles.enterUrl}>Enter New Endpoint Below</h1>
          <input
            id='urlData'
            type='text'
            required
            placeholder='ex: https://YouTube.com/'
            className={styles.endpointInput}
          />
          <button
            type='button'
            id='runDemoBtn'
            className={styles.endpointBtn}
            onClick={helperFunc}
          >
            Run Tests
          </button>
        </div>
      </div>

      <div className={styles.containerMid}>
        <div className={styles.controlPanel}>{scores}</div>
        <div className={styles.detailsList}>
          <h2 id='metricTitle' className={styles.detailsHeader}>
            {selectedMetric !== 'seoMetrics' &&
            selectedMetric !== 'bestPracticesMetrics'
              ? selectedMetric[0].toUpperCase() +
                (selectedMetric.substring(1, selectedMetric.length - 7) +
                  ' Metrics')
              : selectedMetric === 'seoMetrics'
              ? 'SEO Metrics'
              : 'Best Practices Metrics'}
          </h2>
          <WrightDetailsDemo
            selectedMetric={selectedMetric}
            data={lighthouseData}
          />
        </div>
      </div>
    </div>
  );
};
DataTest.getInitialProps = async ({ req }):Promise<{ initialRememberValue: string }> => {
  // Parseing cookie with our own function so we can read it
  const cookies = parseCookies(req);
  // Return our cookie and grab name from cookie
  return {
    initialRememberValue: cookies.userId,
  };
};
export default DataTest;
