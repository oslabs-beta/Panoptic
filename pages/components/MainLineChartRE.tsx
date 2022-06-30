// https://www.chartjs.org/docs/latest/charts/line.html
import { v4 as uuidv4 } from 'uuid';
import style from '../../styles/Dashboard.module.scss';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { MainLCOptions, ChartData } from '../../types';
import { useState, useEffect, useRef } from 'react';
import { Progress } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options:MainLCOptions = {
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

const MainLineChartRE = (props:any):JSX.Element => {
  const labels:String[] = props.labelTimes;
  const arrPerformance:Number[] = [0];
  const arrAccessibility:Number[] = [0];
  const arrBestPractice:Number[] = [0];
  const arrSEO:Number[] = [0];

  // CHART DATA
  const data:ChartData = {
    labels, // Array of label names
    datasets: [
      {
        label: 'Performance',
        data: props.performanceData 
          ? props.performanceData 
          : arrPerformance,
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
        data: props.accessibilityData
          ? props.accessibilityData
          : arrAccessibility,
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
        data: props.bestPracticeData 
          ? props.bestPracticeData 
          : arrBestPractice,
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
        data: props.seoData ? props.seoData : arrSEO,
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

  return (
    <div>
      <h2>{props.selectedEndpoint}</h2>
      <div>
        <Line className={props.className} options={options} data={data} />
      </div>
    </div>
  );
};

export default MainLineChartRE;
