import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import './css/Expenses.css';

const Expenses = ({ expanded }) => {
    const initialExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const [expenses, setExpenses] = useState(initialExpenses);
    const [showAll, setShowAll] = useState(false);

    const [form, setForm] = useState({
        date: new Date().toISOString().slice(0, 10),
        category: 'Food',
        description: '',
        amount: ''
    });

    const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Other'];

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const addExpense = (e) => {
        e.preventDefault();
        if (!form.description || !form.amount) {
            alert("Please fill in all fields");
            return;
        }
        setExpenses([...expenses, { ...form, amount: parseFloat(form.amount).toFixed(2) }]);
        setForm({...form, description: '', amount: ''});
    };

    const deleteExpense = (index) => {
        const updatedExpenses = expenses.filter((_, idx) => idx !== index);
        setExpenses(updatedExpenses);
    };

    const calculateTotal = () => {
        return expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0).toFixed(2);
    };

    const calculateSavings = () => {
        return 1000.00; // Dummy value
    };

    return (
        <div className={`expenses-content ${expanded ? 'expanded' : 'collapsed'}`}>
            <h1>Expenses</h1>
            <hr />
            <div className="card-display">
                <div className="card">
                    <span className="material-icons card-icon">payments</span>
                    <h3>Total Expenses</h3>
                    <p>${calculateTotal()}</p>
                </div>
                <div className="card">
                    <span className="material-icons card-icon">savings</span>
                    <h3>Total Savings</h3>
                    <p>${calculateSavings().toFixed(2)}</p>
                </div>
            </div>
            <form onSubmit={addExpense} className="expense-form">
                <input type="date" name="date" value={form.date} onChange={handleInputChange} />
                <select name="category" value={form.category} onChange={handleInputChange}>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
                <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleInputChange} />
                <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleInputChange} />
                <button type="submit">
                    <span className="material-icons">add</span> Add Expense
                </button>
            </form>
            <br></br>
            <h2>Recent Expenses</h2>
            <div className="recent-expenses-container">
                {expenses.length > 0 ? (
                    <ul className='expenses-list'>
                        {expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, showAll ? expenses.length : 10).map((expense, index) => (
                            <li key={index} className="expense-item">
                                <span className="expense-desc">{expense.description}</span>
                                <span className="expense-cat">{expense.category}</span>
                                <span className="expense-amt">${expense.amount}</span>
                                <span className="expense-date">{format(parseISO(expense.date), 'MMMM dd, yyyy')}</span>
                                <div className="expense-icons">
                                    <span className="material-icons" onClick={() => editExpense(index)}>edit</span>
                                    <span className="material-icons" onClick={() => deleteExpense(index)}>delete</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="no-expenses-message">
                        <p>No expenses recorded yet.</p>
                    </div>
                )}
            </div>
            {!showAll && expenses.length > 10 && (
                <button onClick={() => setShowAll(true)} className="show-all-button">
                    Show All
                </button>
            )}
        </div>
    );
};

export default Expenses;
