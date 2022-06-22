import type { NextPage } from 'next';
import { useState, useEffect, useRef } from 'react';
import Nav from './components/Nav';
import LH_Gauge from './components/lhGauge';
import Chart from './components/LineChart.jsx';
import styles from '../styles/Dashboard.module.scss'
import Sidenav from './components/Sidenav';
import axios from 'axios';
import { useSession, getSession } from 'next-auth/react';
import { parseCookies } from '../lib/parseCookies';
import EndpointsList from './components/EndpointsList';
// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`http://localhost:3000/api/hello`);
//   const data = await res.json();

//   // Pass data to the page via props
//   return { props: { data } };
// }

const DataTest: NextPage = ({ initialRememberValue },props: any) => {
  const { data: session, status } = useSession();
  //   console.log(props['data'].name);
  const [lighthouseData, setLighthouseData] = useState({
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0,
  });
  const [scores, setScores] = useState(<h1>Please Wait for Scores</h1>);

  const [currentUser, setCurrentUser] = useState({});

  // Get Current User
  const getUser = async () => {
    const result = await axios.get(`/api/user/${initialRememberValue}`)
    console.log(result);
    return setCurrentUser(result.data);
  }
  const didMount = useRef(false);
  // const didMountv2 = useRef(false);

  const helperFunc = async () => {
    const urlData: any = document.querySelector('#urlData');
    setScores(<h1>Data Loading</h1>)
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

  console.log(didMount);

  useEffect(() => {
    getUser();
    if (didMount.current) {
      setScores(
 
          <div className={styles.containerGauge}>
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
            <LH_Gauge className={styles.gauge} score={lighthouseData.seo} title={'SEO Score:'} />
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
              <EndpointsList endPts={currentUser}/>
            </div>
          </div>

          <div className={styles.containerMid}>
            <div className={styles.controlPanel}>
              {scores}
            </div>
            <div className={styles.lineChart}>
              <Chart user={currentUser} cookie={initialRememberValue} className={styles.chartMaybe}/>
            </div>
          </div>

          <div className={styles.containerRight}>
            <div className={styles.detailsList}>
              <h1>Put details list here</h1>
            </div>
          </div>
      </div>

  );
};
DataTest.getInitialProps = async ({ req }) => {
  // Parseing cookie with our own function so we can read it
  const cookies = parseCookies(req);
  // Return our cookie and grab name from cookie
  return {
    initialRememberValue: cookies.userId
  };
}
export default DataTest;
