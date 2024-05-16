import React, { useState, useEffect } from 'react';
import './css/Savings.css';

const Savings = ({ expanded }) => {
  const [savingsAmount, setSavingsAmount] = useState('');
  const [totalSavings, setTotalSavings] = useState(() => {
    const savedTotalSavings = localStorage.getItem('totalSavings');
    return savedTotalSavings ? parseFloat(savedTotalSavings) : 0.00;
  });
  const [savingsHistory, setSavingsHistory] = useState(() => {
    const savedSavingsHistory = localStorage.getItem('savingsHistory');
    return savedSavingsHistory ? JSON.parse(savedSavingsHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem('totalSavings', totalSavings.toFixed(2));
  }, [totalSavings]);

  useEffect(() => {
    localStorage.setItem('savingsHistory', JSON.stringify(savingsHistory));
  }, [savingsHistory]);

  const handleSavingsChange = (event) => {
    const newSavingsAmount = event.target.value;
    setSavingsAmount(newSavingsAmount);
  };

  const handleSaveSavings = () => {
    const amountToAdd = parseFloat(savingsAmount);
    if (!isNaN(amountToAdd) && amountToAdd > 0) {
      const newTotalSavings = totalSavings + amountToAdd;
      setTotalSavings(newTotalSavings);
      setSavingsAmount('');
      setSavingsHistory([...savingsHistory, { amount: amountToAdd, timestamp: new Date() }]);
    } else {
      alert("Please enter a valid amount.");
    }
  };

  const handleDeleteSavings = () => {
    setTotalSavings(0.00);
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
      const newAmount = parseFloat(editedSavings);
      if (!isNaN(newAmount)) {
        const oldAmount = newSavingsHistory[index].amount;
        newSavingsHistory[index].amount = newAmount;
        setSavingsHistory(newSavingsHistory);
        setTotalSavings(totalSavings + newAmount - oldAmount);
      } else {
        alert("Please enter a valid amount.");
      }
    }
  };

  return (
    <div className={`savings-content ${expanded ? 'expanded' : 'collapsed'} center-align`}>
      <h1>Budget</h1>
      <hr />
      <div className="card-display">
        <div className="card">
          <span className="material-icons card-icon">wallet</span>
          <h3>Total Budget</h3>
          <p style={{ color: totalSavings < 0 ? 'red' : 'inherit' }}>
            ₱{parseFloat(totalSavings).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
      <label htmlFor="savings-input" id="budgetlabel">Enter your budget amount: </label>
      <input
        type="number"
        id="savings-input"
        value={savingsAmount}
        onChange={handleSavingsChange}
        placeholder="Enter amount"
        step="0.01"
      />
      <button onClick={handleSaveSavings} id="savingsbutton">Add Budget</button>
      <button onClick={handleDeleteSavings} id="savingsbutton">Reset</button>
      <h3>Budget History:</h3>
      <br />
      <table className="savings-table">
        <thead>
          <tr>
            <th>Amount Saved</th>
            <th>Date Saved</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {savingsHistory.map((savings, index) => (
            <tr key={index}>
              <td>₱ {savings.amount.toFixed(2).toLocaleString()}</td>
              <td>{new Date(savings.timestamp).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEditSavingsHistory(index)} id="savingstablebutton">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Savings;
