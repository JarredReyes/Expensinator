// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CategoryProvider } from './contexts/CategoryContext';
import Sidenav from './Sidenav';
import Home from './Home';
import Profile from './Profile';
import Category from './Category';
import Chart from './Chart';
import CategoryDetails from './CategoryDetails';

const App = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleSidenav = () => setExpanded(!expanded);

    return (
        <BrowserRouter>
            <CategoryProvider> 
                <div className={`app-container ${expanded ? 'expanded' : 'collapsed'}`}>
                    <Sidenav expanded={expanded} toggleSidenav={toggleSidenav} />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Home expanded={expanded} />} />
                            <Route path="/profile" element={<Profile expanded={expanded} />} />
                            <Route path="/category" element={<Category expanded={expanded} />} />
                            <Route path="/category/:categoryName" element={<CategoryDetails />} />
                            <Route path="/chart" element={<Chart expanded={expanded} />} />
                        </Routes>
                    </div>
                </div>
            </CategoryProvider>
        </BrowserRouter>
    );
};

export default App;
