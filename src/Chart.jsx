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

  const [lineChartData, setLineChartData] = useState({
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Total Expenses per Month',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        data: new Array(12).fill(0),
      },
    ],
  });

  useEffect(() => {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Calculate category totals for pie chart
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

    // Calculate monthly totals for line chart
    const monthlyTotals = expenses.reduce((totals, expense) => {
      const month = new Date(expense.date).getMonth();
      totals[month] += parseFloat(expense.amount);
      return totals;
    }, new Array(12).fill(0));

    setLineChartData(prevData => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: monthlyTotals,
        },
      ],
    }));
  }, []);

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
      <h1>Chart</h1>
      <hr></hr>
      <div className="chart-container">
        <div className="chart-item">
          <h2>Total Expenses per Month</h2>
          <div>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
        <div className="chart-item">
          <h2>Expenses by Category</h2>
          <div>
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
