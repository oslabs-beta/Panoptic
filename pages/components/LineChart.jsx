// https://www.chartjs.org/docs/latest/charts/line.html
import { v4 as uuidv4 } from 'uuid';

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
  plugins: {
    legend: {
      position: 'bottom',// Postion of datasets aka Performance, SEO etc
    },
    title: {
      // display: true,//
      text: 'Penoptic Line Chart',
    },
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


const labels = ['', '', '', "Commits", '', '', "<3"];
const arrPerformance = [1, 2, 3, 2, 5, 6, 1];
const arrAccessibility = [1, 2, 3, 2, 5, 6, 1];
const arrBestPractice = [1, 2, 3, 2, 5, 6, 1];
const arrSEO = [1, 2, 3, 2, 5, 6, 1];
let callOnce = false;

// export const data = {
//   labels, // Array of label names
//   datasets: [
//     {
//       label: 'Performance',
//       data: arrPerformance,
//       borderColor: 'rgb(188, 19, 254)',
//       backgroundColor: 'rgb(188, 19, 254)',
//       // showLine: false, // Removes line but leaves dots
//       pointHoverBackgroundColr: 'black', // Hover DOT background color
//       pointHoverBorderWidth: 25, // Hover DOT border size 
//       pointHoverRadius: 25, // Hover DOT border size 
//     },
//     {
//       label: 'Accessibility',
//       data: arrAccessibility,
//       borderColor: 'rgb(4, 217, 255)',
//       backgroundColor: 'rgb(4, 217, 255)',
//     },
//     {
//       label: 'Best Practices',
//       data: arrBestPractice,
//       borderColor: 'rgb(12, 255, 12)',
//       backgroundColor: 'rgb(12, 255, 12)',
//     },
//     {
//       label: 'SEO',
//       data: arrSEO,
//       borderColor: 'rgb(255, 153, 51)',
//       backgroundColor: 'rgb(255, 153, 51)',
//     },
//   ],
// };
const mainLineChart = () => {
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
        borderColor: 'rgb(188, 19, 254)',
        backgroundColor: 'rgb(188, 19, 254)',
        // showLine: false, // Removes line but leaves dots
        pointHoverBackgroundColor: 'black', // Hover DOT background color
        pointHoverBorderWidth: 25, // Hover DOT border size 
        pointHoverRadius: 25, // Hover DOT border size 
        fill: true,
      },
      {
        label: 'Accessibility',
        data: (accessibilityData ? accessibilityData : arrAccessibility),
        borderColor: 'rgb(4, 217, 255)',
        backgroundColor: 'rgb(4, 217, 255)',
        pointHoverBackgroundColor: 'black', // Hover DOT background color
        pointHoverBorderWidth: 25, // Hover DOT border size 
        pointHoverRadius: 25, // Hover DOT border size 
        fill: true,
      },
      {
        label: 'Best Practices',
        data: (bestPracticeData ? bestPracticeData : arrBestPractice),
        borderColor: 'rgb(12, 255, 12)',
        backgroundColor: 'rgb(12, 255, 12)',
        pointHoverBackgroundColor: 'black', // Hover DOT background color
        pointHoverBorderWidth: 25, // Hover DOT border size 
        pointHoverRadius: 25, // Hover DOT border size 
        fill: true,
      },
      {
        label: 'SEO',
        data: (seoData ? seoData : arrSEO),
        borderColor: 'rgb(255, 153, 51)',
        backgroundColor: 'rgb(255, 153, 51)',
        pointHoverBackgroundColor: 'black', // Hover DOT background color
        pointHoverBorderWidth: 25, // Hover DOT border size 
        pointHoverRadius: 25, // Hover DOT border size 
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
    const userObj = getUserData('sampledata'); // Get user data from user/[user] API
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

  return (<div className='lineChartMain'>
    <div>Hello Please choose an end point from your database</div>
    <select onChange={loadEndPointDataToChart} className="userDropdown">
      <option value="">---Please choose an end point---</option>
      {arrOfEndPoints}
    </select>
    <div className='AChart'>
      <Line options={options} data={data} />
    </div>
  </div>);
}


export default mainLineChart;

