import { chartColors, months } from '../../util/data';

export const makeChartTitle = ({ year }) => `${year} 年盈收概览`;

export const makeChartConfig = ({ onlineData, offlineData, year }) => ({
  type: 'bar',
  data: {
    labels: months,
    datasets: [
      {
        label: '线上',
        backgroundColor: chartColors.green,
        borderColor: chartColors.green,
        data: onlineData,
        fill: false,
      },
      {
        label: '线下',
        backgroundColor: chartColors.blue,
        borderColor: chartColors.blue,
        data: offlineData,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: makeChartTitle({ year }),
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      displayColors: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          display: true,
          gridLines: {
            display: false,
          },
          scaleLabel: {
            display: true,
            labelString: '月',
          },
        },
      ],
      yAxes: [
        {
          stacked: true,
          display: true,
          gridLines: {
            display: false,
          },
          scaleLabel: {
            display: true,
            labelString: '元',
          },
        },
      ],
    },
  },
});
