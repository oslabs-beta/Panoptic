// https://www.chartjs.org/docs/latest/charts/line.html
import { v4 as uuidv4 } from 'uuid';
import style from '../../styles/Dashboard.module.scss';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
// New
// import faker from 'faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  cx,
} from 'chart.js';
import { useState, useEffect, useRef } from 'react';
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
import { Progress } from '@chakra-ui/react';

// const totalDuration = 1000;
// const delayBetweenPoints = totalDuration / 10;
// const previousY = (ctx) =>
//   ctx.index === 0
//     ? ctx.chart.scales.y.getPixelForValue(100)
//     : ctx.chart
//         .getDatasetMeta(ctx.datasetIndex)
//         .data[ctx.index - 1].getProps(['y'], true).y;
// const animation = {
//   x: {
//     type: 'number',
//     easing: 'linear',
//     duration: delayBetweenPoints,
//     from: NaN, // the point is initially skipped
//     delay(ctx) {
//       if (ctx.type !== 'data' || ctx.xStarted) {
//         return 0;
//       }
//       ctx.xStarted = true;
//       return ctx.index * delayBetweenPoints;
//     },
//   },
//   y: {
//     type: 'number',
//     easing: 'linear',
//     duration: delayBetweenPoints,
//     from: previousY,
//     delay(ctx) {
//       if (ctx.type !== 'data' || ctx.yStarted) {
//         return 0;
//       }
//       ctx.yStarted = true;
//       return ctx.index * delayBetweenPoints;
//     },
//   },
// };

export const options = {
  // animation,
  borderWidth: 2, // Width of lines
  responsive: true,
  maintainAspectRatio: true,
  chart: {
    width: '100%',
    height: '100%',
  },
  plugins: {
    legend: {
      position: 'bottom', // Postion of datasets aka Performance, SEO etc
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
    },
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // // build array of time endpoint was checked
  // const arrOfTime = [];
  // for (const keys in endPoints) {
  //   const test = Object.keys(endPoints[keys]).map(el => el);
  //   arrOfTime.push(test);
  // }  

  
  const mainLineChart = (props) => {
      // build array of time endpoint was checked
  const [times, setTimes] = useState(['0', '1', '2', '3', '4', '5', '6', '7']);
  // for (const keys in props.user) {
  //   const test = Object.keys(props.user[keys]).map(el => el);
  //   arrOfTime.push(test);
  // }  
  const labels = times;
  const arrPerformance = [0];
  const arrAccessibility = [0];
  const arrBestPractice = [0];
  const arrSEO = [0];
  let callOnce = false;

  let arrOfEndPoints;
  const [endPoints, setEndPoints] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // state data
  const [performanceData, setPerformanceData] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const [bestPracticeData, setBestPracticeData] = useState(null);
  const [accessibilityData, setAccessibilityData] = useState(null);
  // CHART DATA
  const buildArrOfEndPoints = (userObj) => {
    // Build array of all user end points
    const output = [];
    for (const keys in userObj) {
      output.push(
        <option key={uuidv4()} value={keys}>
          {keys}
        </option>
      );
    }
    return output;
  };
  const data = {
    labels, // Array of label names
    datasets: [
      {
        label: 'Performance',
        data: performanceData ? performanceData : arrPerformance,
        borderColor: 'rgb(213, 77, 224)',
        backgroundColor: 'rgb(223, 77, 224)',
        // showLine: false, // Removes line but leaves dots
        pointHoverBackgroundColor: 'black', // Hover DOT background color
        pointHoverBorderWidth: 10, // Hover DOT border size
        pointHoverRadius: 7, // Hover DOT border size
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Accessibility',
        data: accessibilityData ? accessibilityData : arrAccessibility,
        borderColor: 'rgb(4, 221, 205)',
        backgroundColor: 'rgb(4, 221, 205)',
        pointHoverBackgroundColor: 'black', // Hover DOT background color
        pointHoverBorderWidth: 10, // Hover DOT border size
        pointHoverRadius: 7, // Hover DOT border size
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Best Practices',
        data: bestPracticeData ? bestPracticeData : arrBestPractice,
        borderColor: 'rgb(12, 255, 12)',
        backgroundColor: 'rgb(12, 255, 12)',
        pointHoverBackgroundColor: 'black', // Hover DOT background color
        pointHoverBorderWidth: 10, // Hover DOT border size
        pointHoverRadius: 7, // Hover DOT border size
        fill: true,
        tension: 0.4,
      },
      {
        label: 'SEO',
        data: seoData ? seoData : arrSEO,
        borderColor: 'rgb(250, 83, 128)',
        backgroundColor: 'rgb(250, 83, 128)',
        pointHoverBackgroundColor: 'black', // Hover DOT background color
        pointHoverBorderWidth: 10, // Hover DOT border size
        pointHoverRadius: 7, // Hover DOT border size
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const performanceArray = [];
  for (const key in endPoints) {
    for (const date in endPoints[key]) {
      performanceArray.push(endPoints[key][date].metrics.performance);
    }
  }
  // const loadEndPointDataToChart = async () => {
  //   // performance
  //   const performanceArray = [];
  //   const seoArray = [];
  //   const accessibilityArray = [];
  //   const bestPracticeArray = [];
  //   const arrOfTime = []

  //   // for (const key in endPoints) {
  //   for (const key in props.user[props.selectedEndpoint]) {
  //     console.log(key)
  //     if (key.toString() == props.selectedEndpoint) {
  //       if (arrOfTime.length < 8) arrOfTime.push(Object.keys(endPoints[key]).map(el => el));
        
  //       for (const date in endPoints[key]) {
  //         performanceArray.push(endPoints[key][date].metrics.performance);
  //         seoArray.push(endPoints[key][date].metrics.seo);
  //         accessibilityArray.push(endPoints[key][date].metrics.accessibility);
  //         bestPracticeArray.push(endPoints[key][date].metrics.bestPractices);
  //       }
  //     }
  //   }
  //   await setAccessibilityData([...accessibilityArray]);
  //   await setSeoData([...seoArray]);
  //   await setBestPracticeData([...bestPracticeArray]);
  //   await setPerformanceData([...performanceArray]);
  //   arrOfTime[0].length == 1 ? await setTimes([...arrOfTime[0], ...arrOfTime[0]]) :
  //   await setTimes([...arrOfTime]);
  // }

  const didUpdate = useRef(false);
  let currentlySelected = props.selectedEndpoint;
  if (props.selectedEndpoint !== currentlySelected) {
    didUpdate.current = true;
    currentlySelected = props.selectedEndpoint;
  }
  useEffect(() => {
    // const userObj = getUserData('sampledata'); // Get user data from user/[user] API
    getUserData(props.cookie); // Get user data from user/[user] API
    // if(props.isLoaded)    props.setLoad(loadEndPointDataToChart);
  }, []);

  // useEffect(() => {
  //   if (didUpdate.current) loadEndPointDataToChart();
  // }, []);
  const getUserData = async (user) => {
    // Grab api DATA of user
    setLoading(true);
    const config = {
      // Config for axios
      headers: {
        Accept: 'application/json',
      },
    };
    const myUrl = `http://localhost:3000/api/user/${user}`;
    if (callOnce) {
      // API called don't call again
      return;
    } else {
      // API not called yet
      callOnce = true;
      await axios.get(myUrl, config).then((res) => {
        setEndPoints(res.data);
        // getPerformanceData();

        console.log('res data = ', endPoints);
        setLoading(false);
        return res;
      });
    }
  };

  if (isLoading)
    return (
      <div>
        <Progress size='xs' isIndeterminate />
      </div>
    );
  if (!endPoints) return <p>No profile data</p>;
  arrOfEndPoints = buildArrOfEndPoints(props.user);

  const loadEndPointDataToChart = (e) => {
    // performance
    const performanceArray = [];
    const seoArray = [];
    const accessibilityArray = [];
    const bestPracticeArray = [];
    const arrOfTime = []


    for (const key in endPoints) {
      if (key === e.target.value) {
        if (arrOfTime.length < 8) arrOfTime.push(Object.keys(endPoints[key]).map(el => el));
        
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
    arrOfTime[0].length === 1 ? setTimes([...arrOfTime[0], ...arrOfTime[0]]) :
    setTimes([...arrOfTime[0]]);
  }
      // console.log('line303',props.user[props])
      // console.log('line303',props.user[props.selectedEndpoint])
  return (
    <div>
      {/* <h2>{props.selectedEndpoint}</h2> */}
      <h2>Select An Endpoint</h2>
      <select onChange={loadEndPointDataToChart} className={style.selectMe}>
        <option value=''>---Please choose an end point---</option>
        {arrOfEndPoints}
      </select>
      <div>
        <Line className={props.className} options={options} data={data}  />
      </div>
    </div>
  )
}

export default mainLineChart;
