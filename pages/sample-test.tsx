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


  let scores;
  if (!lighthouseData.performance) {
    scores = <h1>Please Wait for Scores</h1>;
  } else if (lighthouseData.performance) {
    scores = (
      <div>
        <h1>Performance Score: {lighthouseData.performance}</h1>
        <h1>Accessibility Score: {lighthouseData.accessibility}</h1>
        <h1>Best Practice Score: {lighthouseData.bestPractices}</h1>
        <h1>SEO Score: {lighthouseData.seo}</h1>
      </div>
    );
  }

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
            {scores}
          </div>
          <div>
            <h1>Put dropdown here</h1>
          </div>
        </div>
        <div className={styles.containerMid}>mid</div>
        <div className={styles.containerRight}>right</div>
      </div>
    </div>
  );
};

export default DataTest;
