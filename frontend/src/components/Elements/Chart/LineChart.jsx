import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
const LineChart = () => {
  const dataFromDb = [
    { period: "Ramu", price_so: 100, price_po: 110 },
    { period: "Rakit", price_so: 120, price_po: 120 },
    { period: "Terap", price_so: 110, price_po: 109 },
    { period: "Purwa", price_so: 90, price_po: 100 },
    { period: "Madya", price_so: 105, price_po: 115 },
    { period: "Utama", price_so: 105, price_po: 115 },
  ];
  const data = {
    labels: dataFromDb.map((item) => item.period),
    datasets: [
      {
        data: dataFromDb,
        backgroundColor: "#1e3363",
        borderColor: "#1e3363",
        label: "Data Ramu",
        parsing: { xAxisKey: "period", yAxisKey: "price_so" },
      },
    ],
  };

  const options = {
    animation: true,
    // maintainAspectRatio: false,
    elements: { line: { tension: 0.4 } },
    scales: {
      x: {
        grid: { display: false },
        offset: true,
        ticks: {
          color: "#06163a",
        },
      },
      y: {
        // title: { text: 'amount', display: true },
        grid: { display: false },
        ticks: {
          color: '#06163a'
        }
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
