import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidenav from './Sidenav';
import Home from './Home'; 
import Profile from './Profile';
import Category from './Category';
import Chart from './Chart';

const App = () => {
  const [expanded, setExpanded] = useState(true);
  const toggleSidenav = () => setExpanded(!expanded);

  return (
    <BrowserRouter>
      <div className={`app-container ${expanded ? 'expanded' : 'collapsed'}`}>
        <Sidenav expanded={expanded} toggleSidenav={toggleSidenav} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home expanded={expanded} />} />
          </Routes>
          <Routes>
            <Route path="/profile" element={<Profile expanded={expanded} />} />
          </Routes>
          <Routes>
            <Route path="/category" element={<Category expanded={expanded} />} />
          </Routes>
          <Routes>
            <Route path="/chart" element={<Chart expanded={expanded} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
