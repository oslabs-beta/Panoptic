import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:8080/api/hello`);
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
    const urlData = document.querySelector('#urlData');
    // console.log(urlData.value);
    // get data from lighthouse api
    await fetch(`http://localhost:8080/api/lighthouse`, {
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
    <div className={styles.container}>
      <h1>Enter Url Below</h1>
      <input
        id='urlData'
        type='text'
        required
        placeholder='ex: https://YouTube.com/'
      />
      <button type='button' onClick={helperFunc}>
        Click Me!
      </button>
      {scores}
    </div>
  );
};

export default DataTest;
