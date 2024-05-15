import React, { useState, useEffect } from 'react';
import './css/Home.css';
import { FaHome, FaChartBar, FaDollarSign, FaAngleLeft, FaAngleRight, FaFilter, FaWallet, FaMoneyBillWave } from 'react-icons/fa';

const Home = ({ expanded }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [`public/slide1.png`, `public/slide2.png`, `public/slide3.png`];
  const intervalDuration = 4000; // 3 seconds
  let intervalId; // Interval ID

  // Function to go to the previous image
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    resetInterval();
  };

  // Function to go to the next image
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    resetInterval();
  };

  // Function to reset the interval timer
  const resetInterval = () => {
    clearInterval(intervalId); // Clear the previous interval
    intervalId = setInterval(goToNextImage, intervalDuration); // Start a new interval
  };

  // Effect to start the slideshow interval when the component mounts
  useEffect(() => {
    intervalId = setInterval(goToNextImage, intervalDuration); // Start the interval
    return () => clearInterval(intervalId); // Cleanup: clear interval when component unmounts
  }, []); // Only run once on component mount

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
