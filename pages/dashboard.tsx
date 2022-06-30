import Sidenav from './components/Sidenav';
import styles from '../styles/Dashboard.module.scss';
import LH_Gauge from './components/lhGauge';
import ControlPanel from './components/ControlPanel';
import WrightDetails from './components/wrightDetails';
import EndpointsList from './components/EndpointsList';
import { useState, useEffect, useRef } from 'react';
import { Flex, Box, VStack, Grid, GridItem, Heading } from '@chakra-ui/react';
import MainLineChartRE from './components/MainLineChartRE';
import { RingLoader } from 'react-spinners';
import axios from 'axios';
import type { NextPage } from 'next';
import { parseCookies } from '../lib/parseCookies';

const Dashboard: NextPage = ({ initialRememberValue }, props: any) => {
  // React Hooks
  const [currentUser, setCurrentUser] = useState({});
  const [lighthouseData, setLighthouseData] = useState({
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0,
  });

  const [selected, setSelected] = useState('Select An Endpoint');

  const [scores, setScores] = useState(
    <Box>
      <ControlPanel lhdata={lighthouseData} />
    </Box>
  );
  const [GaugeData, setGaugeData] = useState({});
  const didMount = useRef(false);

  // Get Current User
  const getUser = async () => {
    const result = await axios.get(`/api/user/${initialRememberValue}`);
    // console.log(result);
    setCurrentUser(result.data);
    // if (Object.keys(currentUser).length > 0) {
    if (Object.keys(result.data).length > 0) {
      let defaultKey = Object.keys(result.data)[0];
      // console.log(defaultKey);
      let defaultList = Object.keys(result.data[defaultKey]);
      // console.log(defaultList[defaultList.length - 1]);
      let tempLatestVAl = defaultList[defaultList.length - 1];
      // console.log(tempLatestVAl);
      // console.log(result.data[defaultKey][tempLatestVAl]);
      setLighthouseData(result.data[defaultKey][tempLatestVAl].metrics);
      loadEndPointDataToChart(result.data[defaultKey], defaultKey);
    }
    didMount.current = true;
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    // getUser();
    // console.log(currentUser);
    // console.log(Object.values(currentUser)[0]);
    // setGaugeData(Object.values(currentUser)[0]);
    if (didMount.current) {
      setScores(
        <div className={styles.containerGauge}>
          <ControlPanel lhdata={lighthouseData} />
        </div>
      );
    } else {
      // didMountv2.current = true;
    }
  }, [
    lighthouseData.performance,
    lighthouseData.accessibility,
    lighthouseData.bestPractices,
    lighthouseData.seo,
  ]);
  // const repoNames = [];
  const repoNames = {};
  for (const item in currentUser) {
    if (
      currentUser[item]['reponame'] &&
      Object.hasOwn(repoNames, currentUser[item]['reponame'])
    ) {
      repoNames[currentUser[item]['reponame']].push(item);
    } else if (
      currentUser[item]['reponame'] &&
      !Object.hasOwn(repoNames, currentUser[item]['reponame'])
    ) {
      repoNames[currentUser[item]['reponame']] = [item];
    }
  }

  // console.log(repoNames);
  // console.log(GaugeData);
  // if (GaugeData) {
  //   console.log(GaugeData[GaugeData.length - 2]);
  // }
  // console.log(lighthouseData);

  const [performanceData, setPerformanceData] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const [bestPracticeData, setBestPracticeData] = useState(null);
  const [accessibilityData, setAccessibilityData] = useState(null);
  const [times, setTimes] = useState([
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ]);

  const loadEndPointDataToChart = (e, defaultKey) => {
    // performance
    // console.log(e);
    const performanceArray = [];
    const seoArray = [];
    const accessibilityArray = [];
    const bestPracticeArray = [];
    let arrOfTime = [];
    let defaultList;
    let tempLatestVAl;

    if (currentUser[defaultKey]) {
      for (const date in currentUser[defaultKey]) {
        if (date !== 'reponame') {
          // console.log(currentUser[defaultKey][date].metrics.performance);

          performanceArray.push(
            currentUser[defaultKey][date].metrics.performance
          );
          seoArray.push(currentUser[defaultKey][date].metrics.seo);
          accessibilityArray.push(
            currentUser[defaultKey][date].metrics.accessibility
          );
          bestPracticeArray.push(
            currentUser[defaultKey][date].metrics.bestPractices
          );
        }
      }
      if (arrOfTime.length < 8)
        arrOfTime.push(Object.keys(currentUser[defaultKey]).map((el) => el));

      defaultList = Object.keys(currentUser[defaultKey]);
      tempLatestVAl = defaultList[defaultList.length - 1];
      // console.log(tempLatestVAl);
      // console.log(currentUser[defaultKey][tempLatestVAl]);
      setLighthouseData(currentUser[defaultKey][tempLatestVAl].metrics);
    }

    setAccessibilityData([...accessibilityArray]);
    setSeoData([...seoArray]);
    setBestPracticeData([...bestPracticeArray]);
    setPerformanceData([...performanceArray]);
    if (arrOfTime[0]) {
      arrOfTime[0].length === 1
        ? setTimes([...arrOfTime[0], ...arrOfTime[0]])
        : setTimes([...arrOfTime[0]]);
    }

    // console.log(defaultKey);
    // const tempData = {
    //   performance: 0,
    //   accessibility: 0,
    //   bestPractices: 0,
    //   seo: 0,
    // };
    // console.log(currentUser);
    // console.log(defaultKey);

    // setLighthouseData(result.data[defaultKey][tempLatestVAl].metrics);

    // setScores(
    //   <div className={styles.containerGauge}>
    //     <ControlPanel lhdata={lighthouseData} selected={selected} />
    //   </div>
    // );
  };

  // let lhData = '';

  // if (Object.keys(currentUser).length > 0) {
  //   console.log(currentUser);
  //   console.log(Object.values(currentUser)[0]);
  //   console.log(Object.keys(currentUser)[0]);

  //   let defaultKey = Object.keys(currentUser)[0];
  //   console.log(defaultKey);
  //   // console.log(Object.keys(currentUser[defaultKey]));
  //   // console.log(Object.keys(currentUser[defaultKey]));
  //   let defaultList = Object.keys(currentUser[defaultKey]);
  //   console.log(defaultList[defaultList.length - 1]);
  //   let tempLatestVAl = defaultList[defaultList.length - 1];
  //   console.log(tempLatestVAl);
  //   console.log(currentUser[defaultKey][tempLatestVAl]);
  //   // setLighthouseData(currentUser[defaultKey][tempLatestVAl].metrics);
  //   lhData = currentUser[defaultKey][tempLatestVAl];
  //   // console.log(Object.keys(Math.max(...currentUser[defaultKey])));
  //   // console.log(
  //   //   Object.keys(currentUser[defaultKey]).map((e, idx) => {
  //   //     console.log(e.split('@')[0]);
  //   //     return new Date(e.split('@')[0]);
  //   //   })
  //   // );
  //   // console.log(
  //   //   new Date(
  //   //     Math.max(
  //   //       ...Object.keys(currentUser[defaultKey]).map((e, idx) => new Date(idx))
  //   //     )
  //   //   )
  //   // );

  //   // console.log(new Date(Math.max(...Object.keys(currentUser[defaultKey]).map((e, idx )=> new Date(idx))));
  //   // )
  // }
  // console.log(scores);
  return (
    // className={styles.Dashboard}
    <Grid bg='#0B1337' templateColumns={'.8fr 2.8fr 1.4fr'} w='100%' h='100vh'>
      {/* <Sidenav /> */}
      <GridItem>
        Left
        <Box className={styles.metricsContainer}>
          <Heading textAlign={'center'} className={styles.enterUrl}>
            Enter New Endpoint Below
          </Heading>
          <input
            id='urlData'
            type='text'
            required
            placeholder='ex: https://YouTube.com/'
            className={styles.endpointInput}
          />
          <button type='button' id={styles.endpointBtn} onClick=''>
            Run Tests
          </button>
          <EndpointsList
            reponames={repoNames}
            // func={loadData}
            func={loadEndPointDataToChart}
            selected={selected}
            setSelected={setSelected}
            endPts={currentUser}
            // setLoaded={setLoaded}
          />
        </Box>
      </GridItem>

      <GridItem>
        Mid
        <VStack>
          <Box>{scores}</Box>
          <Box w={'75%'}>
            <MainLineChartRE
              labelTimes={times}
              performanceData={performanceData}
              bestPracticeData={bestPracticeData}
              seoData={seoData}
              accessibilityData={accessibilityData}
            />
          </Box>
          <Box>Second</Box>
        </VStack>
      </GridItem>
      <GridItem bg='green'>
        Right
        <WrightDetails />
      </GridItem>
    </Grid>
  );
};

Dashboard.getInitialProps = async ({ req }) => {
  // Parseing cookie with our own function so we can read it
  const cookies = parseCookies(req);
  // Return our cookie and grab name from cookie
  return {
    initialRememberValue: cookies.userId,
  };
};

export default Dashboard;
