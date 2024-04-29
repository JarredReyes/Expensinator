import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/" className=''>
          <li data-title="Home">
            <FaHome className="icon" />
            {expanded && <span className="title">Home</span>}
          </li>
        </Link>
        <Link to="/profile">
          <li data-title="Profile">
            <FaUserAlt className="icon" />
            {expanded && <span className="title">Profile</span>}
          </li>
        </Link>
        <Link to="/category">
          <li data-title="Category">
            <FaList className="icon" />
            {expanded && <span className="title">Category</span>}
          </li>
        </Link>
        <Link to="/chart">
          <li data-title="Chart">
            <FaChartBar className="icon" />
            {expanded && <span className="title">Chart</span>}
          </li>
        </Link>
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
