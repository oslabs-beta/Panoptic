import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.scss';
import Nav from './components/Nav';

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/hello`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

const DataTest: NextPage = (props: any) => {
  //   console.log(props['data'].name);
  const [lighthouseData, setLighthouseData] = useState({
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0,
  });

  const helperFunc = async () => {
    const urlData: any = document.querySelector('#urlData');
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
      .then((data) => setLighthouseData(data));
    // clear input value after clicking
    urlData.value = '';
  };

  return (
    <div>
      <Nav />
      <div className={styles.threeParts}>
        <div className={styles.containerLeft}>
          <div className={styles.metricsContainer}>
            <h1 className={styles.enterUrl}>Enter url below</h1>
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
            <h1>Put dropdown here</h1>
          </div>
        </div>
        <div className={styles.containerMid}>
          <div className={styles.controlPanel}>
            <h1>Control Panel</h1>
          </div>
          <div className={styles.lineChart}>
            <h1>Line Chart</h1>
          </div>
        </div>
        <div className={styles.containerRight}>
          <div className={styles.detailsList}>
            <h1>Put details list here</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTest;
