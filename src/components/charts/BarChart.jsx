import React from "react";
import useFetch from "../../contextApi/useFetch";
import {
  Chart as ChartJs,
  BarElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";

ChartJs.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip);

const BarChart = () => {
  const [chartData, setChartData] = useState([]);

  // const { data } = useFetch(
  //   `${import.meta.env.VITE_APP_API_URL}/api/order/listByPrice`
  // );

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/product/best-sellers-true`
  );

  useEffect(() => {
    setChartData(data);
  }, [data]);

  const graph = {
    labels: chartData?.map((item) => item.name),
    datasets: [
      {
        label: "Best Sellers",
        data: chartData?.map((item) => item.sold),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
  };

  return (
    <div style={{ width: "500px", marginTop: "5%" }}>
      <Bar data={graph} options={barOptions} />
    </div>
  );
};

export default BarChart;
