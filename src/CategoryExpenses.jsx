import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryExpenses = ({ expenses, expanded }) => {
    const { category } = useParams(); 
    const filteredExpenses = expenses.filter(expense => expense.category === category);

    const calculateTotal = () => {
        return filteredExpenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0).toFixed(2);
    };

    return (
        <div className={`category-page ${expanded ? 'expanded' : 'collapsed'}`}>
            <h2>{category} Expenses</h2>
            <h3>Total: ${calculateTotal()}</h3>
            <table className='expenses-list'>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredExpenses.map((expense, index) => (
                        <tr key={index}>
                            <td>{expense.description}</td>
                            <td>{expense.category}</td>
                            <td>{expense.date}</td>
                            <td>${expense.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryExpenses;
