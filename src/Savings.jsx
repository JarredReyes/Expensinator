import React from 'react';
import './css/Savings.css'; 

const Savings = ({ expanded }) => {
  return (
    <div className={`savings-content ${expanded ? 'expanded' : 'collapsed'}`}>
      <h2>Welcome to the Savings Page</h2>
      <p>This page is dedicated to tracking and managing your savings.</p>
    </div>
  );
};

export default Savings;
