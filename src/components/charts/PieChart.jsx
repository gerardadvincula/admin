import React from "react";
import useFetch from "../../contextApi/useFetch";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/productRating/customerRating`
  );

  // Calculate the remaining percentage for the negative scenario
  const negativePercent = 100 - data;

  // Define the chart data and options
  const chartData = {
    labels: ["Customer Satisfaction Rate"],
    datasets: [
      {
        data: [data, negativePercent],
        backgroundColor: ["#FF4169", "#BDBDBD"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    legend: {
      position: "right",
    },
  };

  const dataTextCenter = {
    id: "dataTextCenter",
    beforeDatasetsDraw(chart) {
      const { ctx, data } = chart;

      ctx.save();
      ctx.font = "bolder 50px sans-serif";
      ctx.fillStyle = "#FF4169";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${data.datasets[0].data[0]}%`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };

  return (
    <div style={{ width: "400px", marginTop: "5%" }}>
      <Doughnut
        data={chartData}
        options={chartOptions}
        plugins={[dataTextCenter]}
      ></Doughnut>
    </div>
  );
};

export default PieChart;
