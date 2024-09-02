// src/pages/OrderNow.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Details.css';

function OrderNow() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    contact_number: "",
    house_number: "",
    road_name: "",
    pincode: "",
    city: "",
    state: "",
    nearby_place: "",
    delivery_location_url: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://loving-luckily-pug.ngrok-free.app/api/products/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true', // Add this header
          },
        });

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setProducts(data);
          } else {
            console.error('Expected an array but got:', typeof data, data);
            setProducts([]);
          }
        } else {
          const text = await response.text(); // Read the response as text
          console.error('Unexpected content type:', contentType);
          console.error('Response text:', text);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const handleProductChange = (e) => {
    const productId = e.target.value;
    const product = products.find(p => p.id === parseInt(productId));
    setSelectedProduct(product);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      ...formData,
      product: selectedProduct.id,
      quantity,
    };

    try {
      const response = await fetch('https://loving-luckily-pug.ngrok-free.app/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const totalPrice = (selectedProduct.price * quantity).toFixed(2);
        navigate(`/payment?totalPrice=${totalPrice}`);
      } else {
        console.error('Failed to submit order:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  const totalPrice = selectedProduct ? (selectedProduct.price * quantity).toFixed(2) : 0;

  return (
    <div className="ordernow-container">
      <h1>Order Now</h1>
      <div className="product-summary">
        <label htmlFor="product">Select Product:</label>
        <select id="product" onChange={handleProductChange} required>
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        {selectedProduct && (
          <>
            <img src={selectedProduct.image_url} alt={selectedProduct.name} className="product-image" />
            <p>Product: {selectedProduct.name}</p>
            <p>Quantity: 
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </p>
            <p>Price: ₹{selectedProduct.price}</p>
            <p>Total Price: ₹{totalPrice}</p>
          </>
        )}
      </div>

      <div className="min-h-screen flex items-center justify-center bg-green-400">
        <div className="bg-white p-4 rounded shadow-md max-w-sm w-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2 text-green-900">CONTACT US</h1>
          </div>
          
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="w-full p-2 border border-gray-300 rounded mb-2" />
            <input type="tel" name="contact_number" value={formData.contact_number} onChange={handleChange} placeholder="Contact Number" required className="w-full p-2 border border-gray-300 rounded mb-2" />
            <input type="text" name="house_number" value={formData.house_number} onChange={handleChange} placeholder="House Number" required className="w-full p-2 border border-gray-300 rounded mb-2" />
            <input type="text" name="road_name" value={formData.road_name} onChange={handleChange} placeholder="Road Name" required className="w-full p-2 border border-gray-300 rounded mb-2" />
            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" required className="w-full p-2 border border-gray-300 rounded mb-2" />
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="w-full p-2 border border-gray-300 rounded mb-2" />
            <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" required className="w-full p-2 border border-gray-300 rounded mb-2" />
            <input type="text" name="nearby_place" value={formData.nearby_place} onChange={handleChange} placeholder="Nearby Place" className="w-full p-2 border border-gray-300 rounded mb-2" />
            <input type="url" name="delivery_location_url" value={formData.delivery_location_url} onChange={handleChange} placeholder="Delivery Location URL" className="w-full p-2 border border-gray-300 rounded mb-2" />
            <button type="submit" className="bg-green-400 text-white p-2 rounded-2xl w-full">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrderNow;