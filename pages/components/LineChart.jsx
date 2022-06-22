// https://www.chartjs.org/docs/latest/charts/line.html
import { v4 as uuidv4 } from 'uuid';
import style from '../../styles/Dashboard.module.scss';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
// New
import faker from 'faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, cx
} from 'chart.js';
import React, { useState, useEffect } from 'react';
import { userInfo } from 'os';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  borderWidth: 2,// Width of lines
  responsive: true,
  maintainAspectRatio: true,
  chart: {
    width: '100%',
    height: '100%'
  },
  plugins: {
    legend: {
      position: 'bottom',// Postion of datasets aka Performance, SEO etc
    },
    title: {
      // display: true,//
      text: 'Panoptic Line Chart',
    },
  },
  scales: {
    y: {
      type: 'linear',
      min: 0,
      max: 100,
    }
  }
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


const labels = ['', '', '', "Commits", '', '', "<3", "8", "9"];
const arrPerformance = [0];
const arrAccessibility = [0];
const arrBestPractice = [0];
const arrSEO = [0];
let callOnce = false;

const mainLineChart = (props) => {
  let arrOfEndPoints;
  const [endPoints, setEndPoints] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // state data
  const [performanceData, setPerformanceData] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const [bestPracticeData, setBestPracticeData] = useState(null)
  const [accessibilityData, setAccessibilityData] = useState(null)
  // CHART DATA
  const buildArrOfEndPoints = (userObj) => {// Build array of all user end points
    const output = [];

    for (const keys in userObj) {
      output.push(<option key={uuidv4()} value={keys}>{keys}</option>)
    }
    return output;
  }
  const data = {
    labels, // Array of label names
    datasets: [
      {
        label: 'Performance',
        data: (performanceData ? performanceData : arrPerformance),
        borderColor: 'rgb(213, 77, 224)',
        backgroundColor: 'rgb(223, 77, 224)',
        // showLine: false, // Removes line but leaves dots
        pointHoverBackgroundColor: 'black', // Hover DOT background color
        pointHoverBorderWidth: 10, // Hover DOT border size 
        pointHoverRadius: 7, // Hover DOT border size 
        fill: true,
      },
      {
        label: 'Accessibility',
        data: (accessibilityData ? accessibilityData : arrAccessibility),
        borderColor: 'rgb(4, 221, 205)',
        backgroundColor: 'rgb(4, 221, 205)',
        pointHoverBackgroundColor: 'black', // Hover DOT background color
        pointHoverBorderWidth: 10, // Hover DOT border size 
        pointHoverRadius: 7, // Hover DOT border size 
        fill: true,
      },
      {
        label: 'Best Practices',
        data: (bestPracticeData ? bestPracticeData : arrBestPractice),
        borderColor: 'rgb(12, 255, 12)',
        backgroundColor: 'rgb(12, 255, 12)',
        pointHoverBackgroundColor: 'black', // Hover DOT background color
        pointHoverBorderWidth: 10, // Hover DOT border size 
        pointHoverRadius: 7, // Hover DOT border size 
        fill: true,
      },
      {
        label: 'SEO',
        data: (seoData ? seoData : arrSEO),
        borderColor: 'rgb(250, 83, 128)',
        backgroundColor: 'rgb(250, 83, 128)',
        pointHoverBackgroundColor: 'black', // Hover DOT background color
        pointHoverBorderWidth: 10, // Hover DOT border size 
        pointHoverRadius: 7, // Hover DOT border size 
        fill: true,
      },
    ],
  };

  const performanceArray = [];
  for (const key in endPoints) {
    for (const date in endPoints[key]) {
      performanceArray.push(endPoints[key][date].metrics.performance);
    }
  }
  useEffect(() => {
    // const userObj = getUserData('sampledata'); // Get user data from user/[user] API
    const userObj = getUserData(props.username); // Get user data from user/[user] API
  }, []);

  const getUserData = async (user) => {// Grab api DATA of user
    setLoading(true)
    const config = {// Config for axios
      headers: {
        Accept: 'application/json',
      },
    }
    const myUrl = `http://localhost:3000/api/user/${user}`;
    if (callOnce) {// API called don't call again
      return;
    } else {// API not called yet
      callOnce = true;
      await axios.get(myUrl, config)
        .then((res => {
          setEndPoints(res.data);
          // getPerformanceData();
          console.log('perf data: ', performanceData);
          console.log('res data = ', endPoints);
          setLoading(false);
          return res;
        }));
    }
  }

  if (isLoading) return <p>Loading...</p>
  if (!endPoints) return <p>No profile data</p>
  console.log('res data = ', endPoints);
  arrOfEndPoints = buildArrOfEndPoints(endPoints);

  const loadEndPointDataToChart = (e) => {
    console.log('Clicked Dropdown');
    // performance
    const performanceArray = [];
    const seoArray = [];
    const accessibilityArray = [];
    const bestPracticeArray = [];
    for (const key in endPoints) {
      if (key === e.target.value) {
        for (const date in endPoints[key]) {
          performanceArray.push(endPoints[key][date].metrics.performance);
          seoArray.push(endPoints[key][date].metrics.seo);
          accessibilityArray.push(endPoints[key][date].metrics.accessibility);
          bestPracticeArray.push(endPoints[key][date].metrics.bestPractices);
        }
      }
    }
    setAccessibilityData([...accessibilityArray]);
    setSeoData([...seoArray]);
    setBestPracticeData([...bestPracticeArray]);
    setPerformanceData([...performanceArray]);
    console.log(performanceData);
  }

  return (<div>
    <h2>Choose an endpoint</h2>
    <select onChange={loadEndPointDataToChart} className={style.selectMe}>
      <option value="">---Please choose an end point---</option>
      {arrOfEndPoints}
    </select>
    <div>
      <Line className={props.className} options={options} data={data} />
    </div>
  </div>);
}


export default mainLineChart;

