import React from 'react';
import './css/Chart.css';
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Chart = ({ expanded }) => {
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const pieChartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100, 40, 120, 80],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className={`chart-content ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="chart-container">
        <div className="chart-item">
          <h2>Line Chart Example</h2>
          <div style={{ height: '400px', width: '600px' }}>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
        <div className="chart-item">
          <h2>Pie Chart Example</h2>
          <div style={{ height: '400px', width: '600px' }}>
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
