import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Visualization = ({ predictions }) => {
  const data = {
    labels: predictions.map((p) => p.courseCode), 
    datasets: [
      {
        label: 'Predicted Enrollment',
        data: predictions.map((p) => p.predictedEnrollment), 
        backgroundColor: "blue",
      },
      {
        label: 'Predicted Sections',
        data: predictions.map((p) => p.predictedSections), 
        backgroundColor: "red",
      },
    ],
  };

  return <Bar data={data} />;
};

export default Visualization;
