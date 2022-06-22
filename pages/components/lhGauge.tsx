import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
ChartJs.register(Tooltip, Title, ArcElement, Legend);

function lhGauge(props: any): JSX.Element {
  console.log(props.title, props.score);
  const [data2, setData] = useState(null);
  const numberScore = props.score;
  //   const [plugins2, setPlugins] = useState(null);
  //   const [options2, setoptions] = useState(null);
  //   const [state, setState] = useState(false);

  //   if (props.score) {
  //     setState(true);
  //   }

  const data: any = {
    labels: ['%', '-'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [props.score, 100 - props.score],
        backgroundColor: ['rgb(213, 77, 224)', 'white'],

        borderAlign: 'center',
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: props.title,
        font: { size: 18 },
        color: 'white',
        padding: {
          top: 5,
          bottom: 5,
        },
      },
    },
  };

  const plugins: any = [
    {
      beforeDraw: function (chart: any) {
        //   beforeRender: function (chart) {
        let width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        let fontSize = (height / 160).toFixed(2);
        ctx.font = fontSize + 'em sans-serif';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // let text = props.score + '%',
        let text = chart.data.datasets[0].data[0] + '%',
          textX = (chart.chartArea.left + chart.chartArea.right) / 2,
          textY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        ctx.fillText(text, textX, textY);
        // console.log(chart.data.datasets[0].data[0], props.score);
        ctx.save();
        // ctx.update(); ///
      },
      //   afterDatasetUpdate: function (chart: any) {
      //     //   beforeRender: function (chart) {
      //     let width = chart.width,
      //       height = chart.height,
      //       ctx = chart.ctx;
      //     // ctx.restore();
      //     let fontSize = (height / 160).toFixed(2);
      //     ctx.font = fontSize + 'em sans-serif';
      //     ctx.fillStyle = 'white';
      //     ctx.textAlign = 'center';
      //     ctx.textBaseline = 'middle';
      //     let text = props.score + '%',
      //       textX = (chart.chartArea.left + chart.chartArea.right) / 2,
      //       textY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      //     ctx.fillText(text, textX, textY);
      //     // chart.update(); ///
      //     ctx.save();
      //   },
    },
  ];
  //   console.log(props);
  //   console.log(props.data.performance);
  //   data.datasets = [props.data.performance, 100 - props.data.performance];
  //   console.log(data.datasets);

  //   useEffect(() => {
  //     console.log({ UseEffect: data });
  //     setData(data);
  // setPlugins(plugins);
  // setoptions(options);
  //   }, []);

  console.log({ data });
  console.log({ data2 });
  return (

      <div className="">
        <Doughnut className={props.className} data={data} plugins={plugins} options={options} />

      </div>

  );
}

export default lhGauge;
