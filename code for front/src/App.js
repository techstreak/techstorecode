// ecommercetracker-frontend/src/App.js
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";

import Details from "./pages/Details";
import ProductList from './components/ProductList';


import Payment from "./pages/Payment"; // Import Payment component
const App = () => {
  return (
    <div className="md:h-screen bg-purple-100">
      <Router> {/* Changed from BrowserRouter to HashRouter */}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/techstore" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/details" element={<Details />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
