import { chartColors, months } from '../../util/data';

const defaultChartData = '.'
  .repeat(12)
  .split('')
  .map(() => 0);

export const makeChartTitle = ({ year, total }) =>
  `${year}年筹集善款  ¥${total || 0}`;

export const makeChartConfig = ({ chartData, year, total }) => ({
  type: 'line',
  data: {
    labels: months,
    datasets: [
      {
        label: '筹集善款',
        backgroundColor: chartColors.green,
        borderColor: chartColors.green,
        data: chartData && chartData.length ? chartData : defaultChartData,
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
