import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import './css/Expenses.css';

const Expenses = ({ expanded, deleteAndSyncExpense }) => {
    const initialExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const [expenses, setExpenses] = useState(initialExpenses);
    const [showAll, setShowAll] = useState(false);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editedExpense, setEditedExpense] = useState(null);

    const [form, setForm] = useState({
        date: new Date().toISOString().slice(0, 10),
        category: 'Food',
        description: '',
        amount: ''
    });
    const [totalSavings, setTotalSavings] = useState(() => {
        const savedTotalSavings = localStorage.getItem('totalSavings');
        return savedTotalSavings ? parseFloat(savedTotalSavings).toFixed(2) : '0.00';
    });
    const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Other'];

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    useEffect(() => {
        const savedTotalSavings = localStorage.getItem('totalSavings');
        setTotalSavings(savedTotalSavings ? parseFloat(savedTotalSavings).toFixed(2) : '0.00');
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingIndex !== -1) {
            setEditedExpense(prev => ({ ...prev, [name]: value }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const addExpense = (e) => {
        e.preventDefault();
        if (!form.description || !form.amount) {
            alert("Please fill in all fields");
            return;
        }
        const newExpense = { ...form, amount: parseFloat(form.amount).toFixed(2) };
        setExpenses([...expenses, newExpense]);
        setForm({ ...form, description: '', amount: '' });

        const updatedTotalSavings = (parseFloat(totalSavings) - parseFloat(newExpense.amount)).toFixed(2);
        setTotalSavings(updatedTotalSavings);
        localStorage.setItem('totalSavings', updatedTotalSavings);

        window.location.reload();
    };

    const handleDeleteExpense = (index) => {
        const updatedExpenses = [...expenses];
        const deletedExpense = updatedExpenses.splice(index, 1)[0];
        setExpenses(updatedExpenses);
        deleteAndSyncExpense(index);


        const updatedTotalSavings = (parseFloat(totalSavings) + parseFloat(deletedExpense.amount)).toFixed(2);
        setTotalSavings(updatedTotalSavings);
        localStorage.setItem('totalSavings', updatedTotalSavings);
    };

    const editExpense = (index) => {
        setEditingIndex(index);
        setEditedExpense(expenses[index]);
    };

    const saveEditedExpense = () => {
        const updatedExpenses = [...expenses];
        const oldAmount = parseFloat(updatedExpenses[editingIndex].amount);
        updatedExpenses[editingIndex] = { ...editedExpense, amount: parseFloat(editedExpense.amount).toFixed(2) };
        setExpenses(updatedExpenses);
        setEditingIndex(-1);
        setEditedExpense(null);


        const updatedTotalSavings = (parseFloat(totalSavings) + oldAmount - parseFloat(editedExpense.amount)).toFixed(2);
        setTotalSavings(updatedTotalSavings);
        localStorage.setItem('totalSavings', updatedTotalSavings);

        window.location.reload();
    };

    const calculateTotal = () => {
        return expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0).toFixed(2);
    };

    return (
        <div className={`expenses-content ${expanded ? 'expanded' : 'collapsed'}`}>
            <h1>Expenses</h1>
            <hr />
            <div className="card-display">
                <div className="card">
                    <span className="material-icons card-icon">payments</span>
                    <h3>Total Expenses</h3>
                    <p>₱{parseFloat(calculateTotal()).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div className="card2">
                    <span className="material-icons card-icon">wallet</span>
                    <h3>Total Budget</h3>
                    <p style={{ color: totalSavings < 0 ? 'red' : 'inherit' }}>
                        ₱{parseFloat(totalSavings).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>
            </div>
            <form onSubmit={addExpense} className="expense-form">
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleInputChange}
                    disabled={editingIndex !== -1}
                />
                <select
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                    disabled={editingIndex !== -1}
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleInputChange}
                    disabled={editingIndex !== -1}
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleInputChange}
                    disabled={editingIndex !== -1}
                />
                <button type="submit" disabled={editingIndex !== -1}>
                    <span className="material-icons">add</span> Add Expense
                </button>
            </form>
            <br />
            <h2>Recent Expenses</h2>
            <div className="recent-expenses-container">
                {expenses.length === 0 ? (
                    <div className="no-expenses-message">
                        <p>No expenses recorded yet.</p>
                    </div>
                ) : (
                    <ul className='expenses-list'>
                        {expenses.slice(0, showAll ? expenses.length : 15).map((expense, index) => (
                            <li key={index} className={`expense-item ${editingIndex === index ? 'editing' : ''}`}>
                                {editingIndex === index ? (
                                    <>
                                        <input type="text" name="description" value={editedExpense.description} onChange={handleInputChange} />
                                        <select name="category" value={editedExpense.category} onChange={handleInputChange}>
                                            {categories.map((category, index) => (
                                                <option key={index} value={category}>{category}</option>
                                            ))}
                                        </select>
                                        <input type="number" name="amount" value={editedExpense.amount} onChange={handleInputChange} />
                                        <button onClick={saveEditedExpense}><span className="material-icons">save</span>Save Changes</button>
                                    </>
                                ) : (
                                    <>
                                        <span className="expense-desc">{expense.description}</span>
                                        <span className="expense-cat">{expense.category}</span>
                                        <span className="expense-amt">₱ {parseFloat(expense.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                        <span className="expense-date">{format(parseISO(expense.date), 'MMMM dd, yyyy')}</span>
                                        <div className="expense-icons">
                                            <span className="material-icons" onClick={() => editExpense(index)}>edit</span>
                                            <span className="material-icons" onClick={() => handleDeleteExpense(index)}>delete</span>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {!showAll && expenses.length > 15 && (
                <center>
                    <button onClick={() => setShowAll(true)} className="show-all-button">
                        <span className="material-icons">expand_more</span> Show All
                    </button>
                </center>
            )}
        </div>
    );
};

export default Expenses;
