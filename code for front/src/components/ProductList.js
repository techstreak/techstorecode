import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://loving-luckily-pug.ngrok-free.app/api/products/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true' // Add this header
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
  

  const handleBuyNow = (productId) => {
    navigate(`/details`); // Navigate to OrderNow page
  };

  return (
    <div className="product-list">
      <h2>Products</h2>
      <ul>
        {Array.isArray(products) && products.length > 0 ? (
          products.map(product => (
            <li key={product.id} className="product-item">
              <h2>{product.name}</h2>
              {product.image && <img src={product.image} alt={product.name} className="product-image" />}
              {product.image_url && <img src={product.image_url} alt={product.name} className="product-image" />}
              <p>{product.description}</p>
              <p className="product-price">₹{product.price}</p>
              <button onClick={() => handleBuyNow(product.id)}>Buy Now</button>
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>
    </div>
  );
};

export default ProductList;