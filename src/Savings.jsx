import React, { useState, useEffect } from 'react';
import './css/Savings.css';

const Savings = ({ expanded }) => {
  const [savingsAmount, setSavingsAmount] = useState(0);
  const [totalSavings, setTotalSavings] = useState(() => {
    const savedTotalSavings = localStorage.getItem('totalSavings');
    return savedTotalSavings ? parseInt(savedTotalSavings, 10) : 0;
  });

  const [savingsHistory, setSavingsHistory] = useState(() => {
    const savedSavingsHistory = localStorage.getItem('savingsHistory');
    return savedSavingsHistory ? JSON.parse(savedSavingsHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem('totalSavings', totalSavings);
  }, [totalSavings]);

  useEffect(() => {
    localStorage.setItem('savingsHistory', JSON.stringify(savingsHistory));
  }, [savingsHistory]);

  const handleSavingsChange = (event) => {
    const newSavingsAmount = parseInt(event.target.value, 10) || 0;
    setSavingsAmount(newSavingsAmount);
  };

  const handleSaveSavings = () => {
    const newTotalSavings = totalSavings + savingsAmount;
    setTotalSavings(newTotalSavings);
    setSavingsAmount(0);
    setSavingsHistory([...savingsHistory, { amount: savingsAmount, timestamp: new Date() }]);
  };

  const handleDeleteSavings = () => {
    setTotalSavings(0);
    setSavingsHistory([]);
    localStorage.removeItem('totalSavings');
    localStorage.removeItem('savingsHistory');
  };

  const handleDeleteSavingsHistory = (index) => {
    const newSavingsHistory = [...savingsHistory];
    const deletedAmount = newSavingsHistory[index].amount;
    newSavingsHistory.splice(index, 1);
    setSavingsHistory(newSavingsHistory);
    setTotalSavings(totalSavings - deletedAmount);
  };

  const handleEditSavingsHistory = (index) => {
    const newSavingsHistory = [...savingsHistory];
    const editedSavings = prompt("Enter the new savings amount:");
    if (editedSavings !== null && editedSavings !== "") {
      const newAmount = parseInt(editedSavings, 10);
      const oldAmount = newSavingsHistory[index].amount;
      newSavingsHistory[index].amount = newAmount;
      setSavingsHistory(newSavingsHistory);
      setTotalSavings(totalSavings + newAmount - oldAmount);
    }
  };

  return (
    <div className={`savings-content ${expanded ? 'expanded' : 'collapsed'}`}>
      <h1>Welcome to the Savings Page</h1>
      <div className="card-display">
        <div className="card">
      <h2>Total Savings: ${totalSavings.toLocaleString()}</h2>
      </div>
      </div>
      <p>This page is dedicated to tracking and managing your savings.</p>
      <label htmlFor="savings-input">Enter your savings amount:</label>
      <input
        type="number"
        id="savings-input"
        value={savingsAmount}
        onChange={handleSavingsChange}
      />
      <button onClick={handleSaveSavings}>Add Savings</button>
      <button onClick={handleDeleteSavings}>Delete Total Savings</button>
      <h3>Savings History:</h3>
      <ul>
        {savingsHistory.map((savings, index) => (
          <li key={index}>
            ${savings.amount.toLocaleString()} saved at {new Date(savings.timestamp).toLocaleString()}
            <button onClick={() => handleEditSavingsHistory(index)}>Edit</button>
            <button onClick={() => handleDeleteSavingsHistory(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Savings;
