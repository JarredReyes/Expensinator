import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaChartBar, FaDollarSign, FaAngleLeft, FaAngleRight, FaFilter} from 'react-icons/fa';
import './css/Sidenav.css';

const Sidenav = ({ expanded, toggleSidenav }) => {
  return (
    <div className={`sidenav ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <FaDollarSign className="header-icon" />
        {expanded && <span className="header-title">Expensinator</span>}
      </div>
      <hr />
      <ul>
        <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>
          <li data-title="Home">
            <FaHome className="icon" />
            {expanded && <span className="title">Home</span>}
          </li>
        </NavLink>
        <NavLink to="/expenses" className={({ isActive }) => isActive ? 'active-link' : ''}>
          <li data-title="Expenses">
            <FaDollarSign className="icon" />
            {expanded && <span className="title">Expenses</span>}
          </li>
        </NavLink>
        <NavLink to="/category" className={({ isActive }) => isActive ? 'active-link' : ''}>
          <li data-title="Categories">
              <FaFilter className="icon" /> 
              {expanded && <span className="title">Categories</span>}
          </li>
        </NavLink>
        <NavLink to="/chart" className={({ isActive }) => isActive ? 'active-link' : ''}>
          <li data-title="Chart">
            <FaChartBar className="icon" />
            {expanded && <span className="title">Chart</span>}
          </li>
        </NavLink>
        
      </ul>
      <hr />
      <div className="toggle-button-wrapper">
        <button className="toggle-button" onClick={toggleSidenav} data-title={expanded ? "Collapse" : "Expand"}>
          {expanded ? <FaAngleLeft /> : <FaAngleRight />}
        </button>
      </div>
    </div>
  );
};

export default Sidenav;
