import React from 'react';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import './css/Expenses.css';

const CategoryExpenses = ({ expenses, expanded, deleteAndSyncExpense }) => {
    const { category } = useParams();
    const filteredExpenses = expenses.filter(expense => expense.category === category);

    const calculateTotal = () => {
        return filteredExpenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0).toFixed(2);
    };

    const handleDeleteExpense = (expenseIndex) => {
        const index = expenses.findIndex(expense => expense === filteredExpenses[expenseIndex]);
        deleteAndSyncExpense(index);
    };

    return (
        <div className={`category-page ${expanded ? 'expanded' : 'collapsed'}`}>
            <h1>{category} Expenses</h1>
            <hr />
            <div className="card-display">
                <div className="card">
                    <span className="material-icons card-icon">payments</span>
                    <h3 style={{ color: '#333' }}>Total {category} Expenses</h3>
                    <p>₱{parseFloat(calculateTotal()).toLocaleString()}</p>
                </div>
            </div>
            <h2>{category} Expenses</h2>
            <div className="recent-expenses-container">
                {filteredExpenses.length > 0 ? (
                    <ul className="expenses-list">
                        {filteredExpenses.map((expense, index) => (
                            <li key={index} className="expense-item">
                                <span className="expense-desc">{expense.description}</span>
                                <span className="expense-cat">{expense.category}</span>
                                <span className="expense-amt">₱{parseFloat(expense.amount).toLocaleString()}</span>
                                <span className="expense-date">{format(parseISO(expense.date), 'MMMM dd, yyyy')}</span>
                                <div className="expense-icons">
                                    <span className="material-icons" onClick={() => handleDeleteExpense(index)}>delete</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="no-expenses-message">
                        <p>No expenses recorded for {category} yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryExpenses;
