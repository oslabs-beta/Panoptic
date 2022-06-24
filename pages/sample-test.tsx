import type { NextPage } from 'next';
import { useState, useEffect, useRef } from 'react';
import Nav from './components/Nav';
import LH_Gauge from './components/lhGauge';
import WrightDetails from './components/wrightDetails';
import Chart from './components/LineChart.jsx';
import styles from '../styles/Dashboard.module.scss';
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
import { RingLoader, PacmanLoader } from 'react-spinners';

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`http://localhost:3000/api/hello`);
//   const data = await res.json();

//   // Pass data to the page via props
//   return { props: { data } };
// }

const DataTest: NextPage = ({ initialRememberValue }, props: any) => {
  //   console.log(props['data'].name);
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
        <Center>
          <PacmanLoader size={24} color='Yellow' />
        </Center>
      </VStack>
    </Box>
  );

  const [currentUser, setCurrentUser] = useState({});

  // Get Current User
  const getUser = async () => {
    const result = await axios.get(`/api/user/${initialRememberValue}`)
    return setCurrentUser(result.data);
  }
  const didMount = useRef(false);
  // const didMountv2 = useRef(false);

  const helperFunc = async () => {
    const urlData: any = document.querySelector('#urlData');
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
    // console.log(urlData.value);
    // get data from lighthouse api
    await fetch(`http://localhost:3000/api/lighthouse`, {
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


  useEffect(() => {
    getUser();
    if (didMount.current) {
      setScores(
        <div className={styles.containerGauge}>
          <HStack spacing='0px' borderRadius='full' bg='#111c44' m={4} h={180}>
            <LH_Gauge
              className={styles.gauge}
              score={lighthouseData.performance}
              title={'Performance Score:'}
            />
            <LH_Gauge
              className={styles.gauge}
              score={lighthouseData.accessibility}
              title={'Accessibility Score:'}
            />
            <LH_Gauge
              className={styles.gauge}
              score={lighthouseData.bestPractices}
              title={'Best Practice Score:'}
            />
            <LH_Gauge
              className={styles.gauge}
              score={lighthouseData.seo}
              title={'SEO Score:'}
            />
          </HStack>
        </div>
        // </div>
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

  // if (lighthouseData.performance) {
  //   setScores(
  //     <div>
  //       <h1>Performance Score: {lighthouseData.performance}</h1>
  //       <h1>Accessibility Score: {lighthouseData.accessibility}</h1>
  //       <h1>Best Practice Score: {lighthouseData.bestPractices}</h1>
  //       <h1>SEO Score: {lighthouseData.seo}</h1>
  //       <div className='containerGauge'>
  //         <LH_Gauge
  //           score={lighthouseData.performance}
  //           title={'Performance Score:'}
  //         />
  //         <LH_Gauge
  //           score={lighthouseData.accessibility}
  //           title={'Accessibility Score:'}
  //         />
  //         <LH_Gauge
  //           score={lighthouseData.bestPractices}
  //           title={'Best Practice Score:'}
  //         />
  //         <LH_Gauge score={lighthouseData.seo} title={'SEO Score:'} />
  //       </div>
  //     </div>
  //   );
  // }

  const [ selected, setSelected ] = useState('Select An Endpoint');
  const [ loadData, setLoadData ] = useState();
  const [ isLoaded, setLoaded ] = useState(false);


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
          <button type='button' id={styles.endpointBtn} onClick={helperFunc}>
            Run Tests
          </button>
        </div>
        <div className={styles.dropdownMenu}>
          <EndpointsList func={loadData} selected={selected} setSelected={setSelected} endPts={currentUser} setLoaded={setLoaded} />
        </div>
      </div>

      <div className={styles.containerMid}>
        <div className={styles.controlPanel}>
          {scores}
        </div>
        <div className={styles.lineChart}>
          <Chart setLoad={setLoadData} user={currentUser} selectedEndpoint={selected} cookie={initialRememberValue} className={styles.chartMaybe} isLoaded={isLoaded}  />
        </div>
      </div>

      <div className={styles.containerRight}>
        <div className={styles.detailsList}>
          <h1>Put details list here</h1>
          <WrightDetails />
        </div>
      </div>
    </div>

    // <div className={styles.threeParts}>
    //   {/* <Sidenav /> */}
    //   <div className={styles.containerLeft}>
    //     <div className={styles.metricsContainer}>
    //       <h1 className={styles.enterUrl}>Enter url below</h1>
    //       <input
    //         id='urlData'
    //         type='text'
    //         required
    //         placeholder='ex: https://YouTube.com/'
    //         className={styles.endpointInput}
    //       />
    //       <button type='button' id={styles.endpointBtn} onClick={helperFunc}>
    //         Run Tests
    //       </button>
    //     </div>
    //     <div className={styles.dropdownMenu}>
    //       <h1>Put dropdown here</h1>
    //       <EndpointsList />
    //       {/* <LoadSpinner /> */}
    //     </div>
    //   </div>

    //   <div className={styles.containerMid}>
    //     <div className={styles.controlPanel}>{scores}</div>
    //     <div className={styles.lineChart}>
    //       <Box borderRadius='lg' bg='#111c44'>
    //         <Chart
    //           username={initialRememberValue}
    //           className={styles.chartMaybe}
    //         />
    //       </Box>
    //     </div>
    //   </div>

    //   <div className={styles.containerRight}>
    //     <div className={styles.detailsList}>
    //       <h1>Put details list here</h1>
    //     </div>
    //   </div>
    // </div>
  );
};
DataTest.getInitialProps = async ({ req }) => {
  // Parseing cookie with our own function so we can read it
  const cookies = parseCookies(req);
  // Return our cookie and grab name from cookie
  return {
    initialRememberValue: cookies.userId,
  };
};
export default DataTest;
