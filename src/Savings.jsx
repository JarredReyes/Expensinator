// Import React and necessary hooks
import React, { useState, useEffect } from 'react';
// Import your Savings component's CSS file
import './css/Savings.css';

// Define your Savings component
const Savings = ({ expanded }) => {
  // State variables
  const [savingsAmount, setSavingsAmount] = useState('');
  const [totalSavings, setTotalSavings] = useState(() => {
    const savedTotalSavings = localStorage.getItem('totalSavings');
    return savedTotalSavings ? parseInt(savedTotalSavings, 10) : 0;
  });
  const [savingsHistory, setSavingsHistory] = useState(() => {
    const savedSavingsHistory = localStorage.getItem('savingsHistory');
    return savedSavingsHistory ? JSON.parse(savedSavingsHistory) : [];
  });

  // useEffect hooks to update local storage
  useEffect(() => {
    localStorage.setItem('totalSavings', totalSavings);
  }, [totalSavings]);

  useEffect(() => {
    localStorage.setItem('savingsHistory', JSON.stringify(savingsHistory));
  }, [savingsHistory]);

  // Event handlers
  const handleSavingsChange = (event) => {
    const newSavingsAmount = event.target.value;
    setSavingsAmount(newSavingsAmount);
  };

  const handleSaveSavings = () => {
    const amountToAdd = parseInt(savingsAmount, 10);
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

  // Return JSX
  return (
    <div className={`savings-content ${expanded ? 'expanded' : 'collapsed'}center-align`}>
      <h1>Budget</h1>
      <hr></hr>
      <div className="card-display">
        <div className="card">
          {/* Add id to h2 element */}
          <h2 id="total-budget-heading">Total Budget:<p className={totalSavings < 0 ? 'red-text' : ''}>₱{totalSavings.toLocaleString()}</p></h2>
        </div>
      </div>
      <label htmlFor="savings-input" id="budgetlabel">Enter your budget amount: </label>
      <input
        type="number"
        id="savings-input"
        value={savingsAmount}
        onChange={handleSavingsChange}
        placeholder="Enter amount"
      />
      <button onClick={handleSaveSavings} id="savingsbutton">Add Budget</button>
      <button onClick={handleDeleteSavings} id="savingsbutton">Delete Total Budget</button>
      <h3>Savings History:</h3>
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
              <td>${savings.amount.toLocaleString()}</td>
              <td>{new Date(savings.timestamp).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEditSavingsHistory(index)} id="savingstablebutton">Edit</button>
                <button onClick={() => handleDeleteSavingsHistory(index)} id="savingstablebutton">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export the Savings component
export default Savings;
