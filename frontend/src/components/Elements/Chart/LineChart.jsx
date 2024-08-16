import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = () => {
  const dataFromDb = [
    { type: "Ramu", total: 100 },
    { type: "Rakit", total: 120 },
    { type: "Terap", total: 110 },
  ];

  const data = {
    labels: dataFromDb.map((item) => item.type),
    datasets: [
      {
        data: dataFromDb.map((item) => item.total),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      },
    }
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
