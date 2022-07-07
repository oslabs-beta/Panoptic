import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';
import { ChartData, LHGaugeOptions } from '../../types';

ChartJs.register(Tooltip, Title, ArcElement, Legend);

function lhGauge(props: any): JSX.Element {
  const data: any = {
    labels: ['%', '-'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [props.score, 100 - props.score],
        backgroundColor: ['#266ef6', 'white'],

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
        let text = chart.data.datasets[0].data[0] + '%',
          textX = (chart.chartArea.left + chart.chartArea.right) / 2,
          textY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  return (
    <Box id={`${props.title}Box`}>
      <Doughnut
        className={props.className}
        data={data}
        plugins={plugins}
        options={options}
      />
    </Box>
  );
};

export default lhGauge;
