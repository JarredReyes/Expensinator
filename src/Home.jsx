import React from 'react';
import './css/Home.css';

const Home = ({ expanded }) => {
  return (
    <div className={`home-content ${expanded ? 'expanded' : 'collapsed'}`}>
      <h2>Welcome to Home Page</h2>
      <p>This is the content of the Home page.</p>
    </div>
  );
};

export default Home;
