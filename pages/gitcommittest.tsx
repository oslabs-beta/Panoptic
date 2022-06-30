import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.scss';
import { Octokit, App } from "octokit";

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`http://localhost:3000/api/hello`);
//   const data = await res.json();

//   // Pass data to the page via props
//   return { props: { data } };
// }

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
    const data: any = await axios.post('/api/lighthouse', {
      url: urlData.value,
    });
    await setLighthouseData(data);
    // clear input value after clicking
    urlData.value = '';
  };

  // getting commit history for a specific repo
  const printInfo = async () => {
    // get user access token (getting mine (marc's))
    const result = await axios.get('/api/all');
    console.log(result);
    // store the github access token in a variable
    const token = await result.data[8].github.token;
    // octokit (just cuz github used examples with this and it seemed simpler)
    const octokit = new Octokit({ auth: `${token}`}); // give auth the token as a string
    // store commit history result in variable
    const test = await octokit.request('GET /repos/CodedMarc/Beats-Clone/commits', {
      owner: 'CodedMarc',
      repo: 'Beats-Clone'
    });
    // see it here (in browser)
    console.log(test);
  }

    // getting commit history for a specific repo
    const repoInfo = async () => {
      // get user access token (getting mine (marc's))
      const result = await axios.get('/api/all');
      // store the github access token in a variable
      const token = await result.data[8].github.token;
      // octokit (just cuz github used examples with this and it seemed simpler)
      const octokit = new Octokit({ auth: `${token}`}); // give auth the token as a string
      // store commit history result in variable
      const test = await octokit.request('GET /user/repos');
      // see it here (in browser)
      console.log(test);
    }

  let scores;
  if (!lighthouseData.performance) {
    scores = <h1>Please Wait for Scores</h1>;
  } else if (lighthouseData.performance) {
    scores = 
      <div>
        <h1>Performance Score: {lighthouseData.performance}</h1>
        <h1>Accessibility Score: {lighthouseData.accessibility}</h1>
        <h1>Best Practice Score: {lighthouseData.bestPractices}</h1>
        <h1>SEO Score: {lighthouseData.seo}</h1>
      </div>
    ;
  }

  return (
    <div className={styles.container}>
      <h1>dont enter anything lol, just click the button and check console for commit history on "Beats-Clone"</h1>
      <input
        id='urlData'
        type='text'
        required
        placeholder='ex: https://YouTube.com/'
      />
      <button type='button' onClick={printInfo}>
        if it doesnt work, my token probably expired
      </button>
      <button type='button' onClick={repoInfo}>
        click for repo maybe
      </button>
      {scores}
    </div>
  );
};

export default DataTest;
