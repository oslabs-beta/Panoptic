import { Doughnut } from 'react-chartjs-2';
import stylesApex from '../styles/Apex.module.css';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  defaults,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
// defaults.global = false;

const chartData = [70, 30];
const showData = chartData[0] + '%';
const data1 = {
  labels: ['Red', 'Green'],
  datasets: [
    {
      data: chartData,
      backgroundColor: ['#B8D803', '#707070'],
    },
  ],
  responsive: true,
  animation: {
    animateScale: true,
  },
};

const plugins = [
  {
    beforeDraw: function (chart) {
      var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;
      ctx.restore();
      var fontSize = (height / 160).toFixed(2);
      ctx.font = fontSize + 'em sans-serif';
      ctx.textBaseline = 'middle';
      var text = showData,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  },
];

// var originalDoughnutDraw = ChartJS.controllers.doughnut.prototype.draw;
// ChartJS.helpers.extend(ChartJS.controllers.doughnut.prototype, {
//   draw: function () {
//     originalDoughnutDraw.apply(this, arguments);
//     var chart = this.chart;
//     var width = chart.chart.width,
//       height = chart.chart.height,
//       ctx = chart.chart.ctx;
//     var fontSize = (height / 114).toFixed(2);
//     ctx.font = fontSize + 'em sans-serif';
//     ctx.fillStyle = '#6D7278';
//     ctx.textBaseline = 'middle';
//     var text = chart.config.data.text,
//       textX = Math.round((width - ctx.measureText(text).width) / 2),
//       textY = height / 2;
//     ctx.fillText(text, textX, textY);
//   },
// });

// const options1 = {
//   responsive: true,
//   animation: {
//     animateScale: true,
//     animateRotate: true,
//   },
//   responsive: true,
//   legend: {
//     display: false,
//     position: 'bottom',
//     labels: {
//       fontSize: 18,
//       fontColor: '#6D7278',
//       fontFamily: 'kanit light',
//     },
//   },
// };
// export default function Chart_Donught() {
//   return (
//     <div>
//       <Doughnut
//         data={data1}
//         options={options1}
//         height={250}
//         plugins={plugins}
//       />
//     </div>
//   );
// }

function ChartieApp(): JSX.Element {
  const data = {
    labels: ['Red', 'Blue'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [70, 30],
        backgroundColor: ['#39ff14', 'white'],
        // hoverOffset: 10,
      },
    ],
  };
  const ring1 = (
    <div>
      <Doughnut data={data} />
    </div>
  );
  return (
    <div className={`${stylesApex.container} ${stylesApex.body}`}>
      <h1 className={`${stylesApex.container} ${stylesApex.body}`}>Chart JS</h1>
      {ring1}
    </div>
  );
}

export default ChartieApp;
