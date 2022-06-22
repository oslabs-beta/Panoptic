// import Chart from 'react-apexcharts';
// import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import stylesApex from '../styles/Apex.module.css';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function ChartApp(): JSX.Element {
  const stateObj = {
    options: {
      chart: {
        id: 'apexchart-example',
        background: 'red',
        height: 100,
        width: 100,
        type: 'line',
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 'ABCD'],
      },
      // theme: { mode: 'dark' },
      color: ['#6ab04c', '#2980b9'],
    },
    series: [
      {
        name: 'series-1',
        data: [300, 40, 35, 50, 49, 60, 70, 91, 125],
        color: '#FFD300',
      },
    ],
  };

  const optionsLine = {
    theme: { mode: 'dark' },
    chart: {
      // height: 328,
      type: 'line',
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 1,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    //colors: ["#3F51B5", '#2196F3'],
    series: [
      {
        name: 'Performance',
        data: [1, 15, 26, 20, 33, 27],
        color: '#39FF14',
      },
      {
        name: 'Best Practices',
        data: [3, 33, 21, 42, 19, 32],
        color: '#D22730',
      },
      {
        name: 'SEO',
        data: [0, 39, 52, 11, 29, 43],
        color: '#4D4DFF',
      },
    ],
    title: {
      text: 'Media',
      align: 'left',
      offsetY: 25,
      offsetX: 20,
    },
    subtitle: {
      text: 'Statistics',
      offsetY: 55,
      offsetX: 20,
    },
    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        size: 9,
      },
    },
    grid: {
      show: true,
      padding: {
        bottom: 0,
      },
    },
    labels: [
      '01/15/2002',
      '01/16/2002',
      '01/17/2002',
      '01/18/2002',
      '01/19/2002',
      '01/20/2002',
    ],
    xaxis: {
      tooltip: {
        enabled: false,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -20,
    },
  };

  const radialBarOptions = {
    series: [75],
    chart: {
      background: 'gray',
      height: 350,
      type: 'radialBar',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },

        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '17px',
          },
          value: {
            formatter: function (val) {
              return parseInt(val);
            },
            color: '#111',
            fontSize: '36px',
            show: true,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        // shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          {
            offset: 0,
            color: '#C60404',
            opacity: 1,
          },
          {
            offset: 20,
            color: '#C60404',
            opacity: 1,
          },
          {
            offset: 60,
            color: '#35B535',
            opacity: 1,
          },
          {
            offset: 100,
            color: '#35B535',
            opacity: 1,
          },
        ],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: ['Percent'],
    theme: { mode: 'dark' },
  };

  const [data, setData] = useState(stateObj);
  // const [renderChart, setChart] = useState({});

  // useEffect(() => {}), [data];
  console.log(data);
  return (
    <div className={`${stylesApex.container} ${stylesApex.body}`}>
      <div className={`${stylesApex.chartContainer} `}>
        {
          <Chart
            options={data.options}
            series={data.series}
            // type='line'
            // width={500}
            // height={320}
          />
        }
      </div>
      <div className={`${stylesApex.chartContainer} `}>
        {
          <Chart
            options={optionsLine}
            series={optionsLine.series}
            type='line'
            width={800}
            height={400}
          />
        }
      </div>
      <div className={`${stylesApex.container} `}>
        {
          <Chart
            options={radialBarOptions}
            series={radialBarOptions.series}
            type='radialBar'
            width={250}
            height={300}
          />
        }
      </div>
    </div>
  );
}

export default ChartApp;
