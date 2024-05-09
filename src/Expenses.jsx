import React, { useState, useEffect } from 'react';
import './css/Expenses.css';

const Expenses = ({ expanded }) => {
    const initialExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const [expenses, setExpenses] = useState(initialExpenses);

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
        setExpenses([...expenses, form]);
        setForm({...form, description: '', amount: ''});
    };

    const calculateTotal = () => {
        return expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0).toFixed(2);
    };

    return (
        <div className={`expenses-content ${expanded ? 'expanded' : 'collapsed'}`}>
            <h2>Expenses</h2>
            <hr></hr>
            <form onSubmit={addExpense}>
                <input type="date" name="date" value={form.date} onChange={handleInputChange} />
                <select name="category" value={form.category} onChange={handleInputChange}>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
                <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleInputChange} />
                <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleInputChange} />
                <button type="submit">Add Expense</button>
            </form>
            <h3>Total: ${calculateTotal()}</h3>
            <table className='expenses-list'>
                <tbody>
                    {expenses.map((expense, index) => (
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

export default Expenses;
