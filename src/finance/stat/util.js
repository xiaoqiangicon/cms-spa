import { chartColors, months } from '../../util/data';

export const makeChartTitle = ({ year, total }) =>
  `${year}年筹集善款  ¥${total}`;

export const makeChartConfig = ({ chartData, year, total }) => ({
  type: 'line',
  data: {
    labels: months,
    datasets: [
      {
        label: '筹集善款',
        backgroundColor: chartColors.green,
        borderColor: chartColors.green,
        data: chartData,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: makeChartTitle({ year, total }),
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
