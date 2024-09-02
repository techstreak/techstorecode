// ecommercetracker-frontend/src/components/AppNavbar.js

import React from "react";
import { Navbar } from "flowbite-react";
import "../css/AppNavbar.css"; // Import the new CSS file
import logo from "../images/logo.png"; // Import the logo image

const AppNavBar = () => {
  return (
    <Navbar fluid className="app-navbar">
      <Navbar.Brand href="#" className="navbar-brand">
        <a href="/" className="site-logo">
          <img src={logo} alt="Site Logo" className="logo-image" /> {/* Add the logo image here */}
        </a>
        <span className="navbar-title">TechStore</span>
      </Navbar.Brand>
      <Navbar.Collapse className="navbar-collapse">
        <Navbar.Link href="/" className="navbar-link">
          Home
        </Navbar.Link>
        <Navbar.Link href="/products" className="navbar-link">
          Products
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavBar;
