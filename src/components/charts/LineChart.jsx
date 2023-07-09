import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useFetch from "../../contextApi/useFetch";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const LineChart = () => {
  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/order/list-sales`
  );

  console.log(data);

  const graph = {
    labels: data?.map((item) => item.date_now),
    datasets: [
      {
        label: "Sales",
        data: data?.map((item) => item.totalPrice),
        backgroundColor: "aqua",
        borderColor: "black",
        pointborderColor: "aqua",
        fill: true,
        tenssion: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    <div style={{ width: "75%", marginTop: "5%" }}>
      <Line data={graph} options={options} />
    </div>
  );
};

export default LineChart;
