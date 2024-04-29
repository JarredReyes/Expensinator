import React from 'react';
import './css/Chart.css';

const Chart = ({ expanded }) => {
  return (
    <div className={`chart-content ${expanded ? 'expanded' : 'collapsed'}`}>
      <h2>Welcome to Chart Page</h2>
      <p>This is the content of the Chart page.</p>
    </div>
  );
};

export default Chart;
