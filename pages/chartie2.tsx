import { useEffect, useState } from 'react';
// import './App.css';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJs.register(Tooltip, Title, ArcElement, Legend);

interface Datasets {
  label?: String;
  data: Number[];
  backgroundColor: String[];
  borderAlign?: String;
};

interface Data {
  datasets: Datasets[];
  labels: String[];
};

interface Options {
  plugins: {
    legend: {
      display: Boolean;
    };
  };
};

const data:Data = {
  datasets: [
    {
      data: [10, 20, 30],
      backgroundColor: ['red', 'blue', 'yellow'],
    },
  ],
  labels: ['Red', 'Yellow', 'Blue'],
};

const data2:Data = {
  datasets: [
    {
      label: 'My First Dataset',
      data: [70, 30],
      backgroundColor: ['#39ff14', 'white'],
      borderAlign: 'center',
    },
  ],
  labels: ['Red', 'Blue'],
};

const options:Options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

const plugins = [
  {
    beforeDraw: function (chart) {
      const width:number = chart.width,
        height:number = chart.height,
        ctx = chart.ctx;
      ctx.restore();
      const fontSize = (height / 160).toFixed(2);
      ctx.font = fontSize + 'em sans-serif';
      ctx.fillStyle = 'white';
      ctx.textBaseline = 'middle';
      const text:String = data2.datasets[0].data[0] + '%',
        textX:Number = Math.round((width - ctx.measureText(text).width) / 2),
        textY:Number = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  },
];
function Chartie2App(): JSX.Element {
  return (
    <div className='bodyCH'>
      <div className='chartContainer'>
        <Doughnut data={data2} plugins={plugins} options={options} />
      </div>
    </div>
  );
}

export default Chartie2App;
