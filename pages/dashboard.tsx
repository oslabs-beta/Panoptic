import styles from '../styles/Dashboard.module.scss';
import ControlPanel from './components/ControlPanel';
import WrightDetails from './components/wrightDetails';
import EndpointsList from './components/EndpointsList';
import { useState, useEffect, useRef } from 'react';
import { Box, VStack, Grid, GridItem, Heading } from '@chakra-ui/react';
import MainLineChartRE from './components/MainLineChartRE';
import { RingLoader } from 'react-spinners';
import axios from 'axios';
import type { NextPage } from 'next';
import { parseCookies } from '../lib/parseCookies';
import { Octokit } from 'octokit';
import Sidenav from './components/Sidenav';

const Dashboard: NextPage = ({ initialRememberValue }) => {
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
  const getUser = async ():Promise<any> => {

    const result:any = await axios.get(`/api/user/${initialRememberValue}`);
    setCurrentUser(result.data);
  
    if (Object.keys(result.data).length > 0) {

      let defaultKey:any = Object.keys(result.data)[0];
      let defaultList:any = Object.keys(result.data[defaultKey]);
      let tempLatestVAl:any = defaultList[defaultList.length - 1];

      setLighthouseData(result.data[defaultKey][tempLatestVAl].metrics);
      loadEndPointDataToChart(result.data[defaultKey], defaultKey);
    }
    didMount.current = true;
  };

  useEffect(():void => {
    getUser();
  }, []);
  
  useEffect(():void => {
    if (didMount.current) {
      setScores(
        <div className={styles.containerGauge}>
          <ControlPanel lhdata={lighthouseData} selectedMetric={selectedMetric} setSelectedMetric={setSelectedMetric}/>
        </div>
      );
    }
  },[
    lighthouseData,
    lighthouseData.performance,
    lighthouseData.accessibility,
    lighthouseData.bestPractices,
    lighthouseData.seo
  ]);
  
  const repoNames:{} = {};
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


  const [selectedMetric, setSelectedMetric] = useState('seoMetrics');
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

  const loadEndPointDataToChart = (e, defaultKey):void => {
    
    const performanceArray:number[] = [];
    const seoArray:number[] = [];
    const accessibilityArray:number[] = [];
    const bestPracticeArray:number[] = [];
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
      
      setLighthouseData(currentUser[defaultKey][tempLatestVAl].metrics);
    };

    setAccessibilityData([...accessibilityArray]);
    setSeoData([...seoArray]);
    setBestPracticeData([...bestPracticeArray]);
    setPerformanceData([...performanceArray]);
    if (arrOfTime[0]) {
      arrOfTime[0].length === 1
        ? setTimes([...arrOfTime[0], ...arrOfTime[0]])
        : setTimes([...arrOfTime[0]]);
    };
  };

  return (
    // className={styles.Dashboard}
    <div className='DashBoard'>
      <Sidenav />
      <Grid className={styles.Grid} templateColumns={'1fr 3fr 1fr'} gap={5} w='100vw' h='100vh'>
        {/* <Sidenav /> */}
        <GridItem>
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
          <VStack>
            <Box w={'100%'}>{scores}</Box>
            <Box w={'90%'}>
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

        <GridItem>
    
          <h2 className={styles.detailsHeader}>
            {selected} | {selectedMetric}
          </h2>
          <WrightDetails
            selectedEndpoint={selected}
            user={currentUser}
            selectedMetric={selectedMetric}
            />

        </GridItem>

      </Grid>
    </div>
  );
};

Dashboard.getInitialProps = async ({ req }):Promise<{ initialRememberValue: string }> => {
  // Parseing cookie with our own function so we can read it
  const cookies = parseCookies(req);
  // Return our cookie and grab name from cookie
  return {
    initialRememberValue: cookies.userId,
  };
};

export default Dashboard;
