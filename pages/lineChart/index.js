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
      text: 'M.D.E.A.K Line Chart',
    },
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const labels = [1, 2, 3, 4, 5, 6, 7];
let callOnce = false;
export const data = {
  labels,
  datasets: [
    {
      label: 'Performance',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(188, 19, 254)',
      backgroundColor: 'rgb(188, 19, 254)',
      // showLine: false, // Removes line but leaves dots
      pointHoverBackgroundColr: 'black', // Hover DOT background color
      pointHoverBorderWidth: 25, // Hover DOT border size 
      pointHoverRadius: 25, // Hover DOT border size 
    },
    {
      label: 'Accessibility',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(4, 217, 255)',
      backgroundColor: 'rgb(4, 217, 255)',
    },
    {
      label: 'Best Practices',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(12, 255, 12)',
      backgroundColor: 'rgb(12, 255, 12)',
    },
    {
      label: 'SEO',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 153, 51)',
      backgroundColor: 'rgb(255, 153, 51)',
    },
  ],
};
const buildArrOfEndPoints = (userObj) => {// Build array of all user end points
  const output = [];
  for (const keys in userObj) {
    output.push(<option key={uuidv4()} value="">{keys}</option>)
  }
  return output;
}
const austinChart = () => {
  let arrOfEndPoints;
  const [endPoints, setEndPoints] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const userObj = getUserData('sampledata');// Get user data from user/[user] API
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
  // console.log('arrOfEndPoints', arrOfEndPoints);
  return (<>
    <div>Hello Please choose an end point from your database</div>
    <select onChange={loadEndPointDataToChart} name="homes" id="pet-select" className="userDropdown">
      <option value="">---Please choose an end point---</option>
      {arrOfEndPoints}
    </select>
    <div className='AChart'>
      <Line options={options} data={data} />
    </div>
  </>);
}
const loadEndPointDataToChart = () => {
  console.log('Clicked Dropdown');
}
export default austinChart;

