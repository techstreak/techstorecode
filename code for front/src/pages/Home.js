// pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css'; // Import the CSS file

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoToProducts = () => {
    navigate('/products'); // Navigate to the products page
  };

  return (
    <div className="home-container">
      <h2 className="welcome-message">Welcome to TechStore!</h2>
      <h2 className="welcome-message">TEST</h2>
    <h2 className="welcome-message">Test 3</h2>
      <p className="info-text">Explore our wide range of products tailored to your needs.</p>
      <button className="product-button" onClick={handleGoToProducts}>Go to Products</button>
    </div>
  );
};

export default Home;
