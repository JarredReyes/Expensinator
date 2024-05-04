import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUserAlt, FaChartBar, FaList, FaDollarSign, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
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
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'active-link' : ''}>
          <li data-title="Profile">
            <FaUserAlt className="icon" />
            {expanded && <span className="title">Profile</span>}
          </li>
        </NavLink>
        <NavLink to="/category" className={({ isActive }) => isActive ? 'active-link' : ''}>
          <li data-title="Category">
            <FaList className="icon" />
            {expanded && <span className="title">Category</span>}
          </li>
        </NavLink>
        <NavLink to="/chart" className={({ isActive }) => isActive ? 'active-link' : ''}>
          <li data-title="Chart">
            <FaChartBar className="icon" />
            {expanded && <span className="title">Analysis</span>}
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
