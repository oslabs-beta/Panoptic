import { useEffect, useState } from 'react';
// import './App.css';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJs.register(Tooltip, Title, ArcElement, Legend);

const data = {
  datasets: [
    {
      data: [10, 20, 30],
      backgroundColor: ['red', 'blue', 'yellow'],
    },
  ],
  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: ['Red', 'Yellow', 'Blue'],
};

const data2 = {
  labels: ['Red', 'Blue'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [70, 30],
      backgroundColor: ['#39ff14', 'white'],

      borderAlign: 'center',
    },
  ],
};
const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};
const plugins = [
  {
    beforeDraw: function (chart) {
      let width = chart.width,
        height = chart.height,
        ctx = chart.ctx;
      ctx.restore();
      let fontSize = (height / 160).toFixed(2);
      ctx.font = fontSize + 'em sans-serif';
      ctx.fillStyle = 'white';
      ctx.textBaseline = 'middle';
      let text = data2.datasets[0].data[0] + '%',
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  },
];
function Chartie2App(): JSX.Element {
  // const [data, setData] = useState({
  //   datasets: [
  //     {
  //       data: [10, 20, 30],
  //       backgroundColor: ['red', 'blue', 'yellow'],
  //     },
  //   ],
  //   labels: ['Red', 'Yellow', 'Blue'],
  // });
  // useEffect(() => {
  //   const fetchData = () => {
  //     fetch('https://jsonplaceholder.typicode.com/users')
  //       .then((data) => {
  //         const res = data.json();
  //         return res;
  //       })
  //       .then((res) => {
  //         console.log('resss', res);
  //         const label = [];
  //         const data = [];
  //         for (var i of res) {
  //           label.push(i.name);
  //           data.push(i.id);
  //         }
  //         setData({
  //           datasets: [
  //             {
  //               data: data,
  //               backgroundColor: ['red', 'blue', 'yellow'],
  //             },
  //           ],
  //           labels: label,
  //         });
  //       })
  //       .catch((e) => {
  //         console.log('error', e);
  //       });
  //   };
  //   fetchData();
  // }, []);
  return (
    <div className='bodyCH'>
      <div className='chartContainer'>
        <Doughnut data={data2} plugins={plugins} options={options} />
      </div>
    </div>
  );
}

export default Chartie2App;
