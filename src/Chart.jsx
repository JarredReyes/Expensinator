import React, { useEffect, useState } from 'react';
import './css/Chart.css';
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Chart = ({ expanded }) => {
  const [pieChartData, setPieChartData] = useState({
    labels: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Other'],
    datasets: [
      {
        label: 'Total Expenses by Category',
        data: [0, 0, 0, 0, 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const categoryTotals = expenses.reduce((totals, expense) => {
      if (totals[expense.category]) {
        totals[expense.category] += parseFloat(expense.amount);
      } else {
        totals[expense.category] = parseFloat(expense.amount);
      }
      return totals;
    }, {});

    setPieChartData(prevData => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: [
            categoryTotals['Food'] || 0,
            categoryTotals['Transport'] || 0,
            categoryTotals['Utilities'] || 0,
            categoryTotals['Entertainment'] || 0,
            categoryTotals['Other'] || 0,
          ],
        },
      ],
    }));
  }, []);

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
          <h2>Total Expenses Chart</h2>
          <div style={{ height: '400px', width: '600px' }}>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
        <div className="chart-item">
          <h2>Expenses by Category</h2>
          <div style={{ height: '400px', width: '600px' }}>
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
