import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidenav from './Sidenav';
import Savings from './Savings'
import Home from './Home';
import Expenses from './Expenses';
import Chart from './Chart';
import CategoryExpenses from './CategoryExpenses';
import Category from './Category';
import './css/App.css';


const App = () => {
    const [expanded, setExpanded] = useState(false);
    const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expenses')) || []);

    const toggleSidenav = () => setExpanded(!expanded);

    return (
        <BrowserRouter>
            <div className={`app-container ${expanded ? 'expanded' : 'collapsed'}`}>
                <Sidenav expanded={expanded} toggleSidenav={toggleSidenav} />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home expanded={expanded} />} />
                        <Route path="/expenses" element={<Expenses expenses={expenses} setExpenses={setExpenses} expanded={expanded} />} />
                        <Route path="/savings" element={<Savings expanded={expanded} />} />
                        <Route path="/category" element={<Category expenses={expenses} expanded={expanded} />} />
                        <Route path="/chart" element={<Chart expanded={expanded} />} />
                        <Route path="/category-expenses/:category" element={<CategoryExpenses expenses={expenses} expanded={expanded} />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;