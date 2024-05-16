import React, { useState, useEffect } from 'react';
import './css/Home.css';
import { FaHome, FaChartBar, FaDollarSign, FaAngleLeft, FaAngleRight, FaFilter, FaWallet, FaMoneyBillWave } from 'react-icons/fa';

const Home = ({ expanded }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [`/slide1.png`, `/slide2.png`, `/slide3.png`];
  const intervalDuration = 4000; // 4 seconds
  let intervalId; // Interval ID

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    resetInterval();
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    resetInterval();
  };

  const resetInterval = () => {
    clearInterval(intervalId);
    intervalId = setInterval(goToNextImage, intervalDuration);
  };

  useEffect(() => {
    intervalId = setInterval(goToNextImage, intervalDuration);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`home-content ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="welcome-section">
        <img src={images[currentImageIndex]} alt="Welcome" className="welcome-image" />
        <div className="slideshow-buttons">
          <button onClick={goToPreviousImage} className="slideshow-button">
            <FaAngleLeft />
          </button>
          <button onClick={goToNextImage} className="slideshow-button">
            <FaAngleRight />
          </button>
        </div>
        <h2>Welcome to Expensinator</h2>
        <p>Manage your finances effectively with our easy-to-use tools.</p>
        <div className="button-container">
          <button className="home-button" onClick={() => window.location.href = '/expenses'}>
            <FaDollarSign className="icon" /> Track Expenses
          </button>
          <button className="home-button" onClick={() => window.location.href = '/savings'}>
            <FaWallet className="icon" /> Manage Budget
          </button>
          <button className="home-button" onClick={() => window.location.href = '/category'}>
            <FaFilter className="icon" /> Check Categories
          </button>
          <button className="home-button" onClick={() => window.location.href = '/chart'}>
            <FaChartBar className="icon" /> View Charts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
