// frontend/src/components/ShippingAddressForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './ShippingAddress.css';

const ShippingAddress = () => {
  const [flatNumber, setFlatNumber] = useState('');
  const [locality, setLocality] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { productId, designId } = useParams();
  const userId = JSON.parse(localStorage.getItem('user')).data._id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const shippingAddress = `${flatNumber}, ${locality}, ${landmark}, ${city}, ${pinCode}`;
    try {
      await axios.post('http://localhost:4000/orders', { userId, productId, designId, shippingAddress });
      alert('Order placed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Error placing order. Please try again.');
    }
  };

  return (
    <div className="shipping-form-container">
      <h2>Enter Shipping Address</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="shipping-form" onSubmit={handleSubmit}>
        <div>
          <label>Flat Number:</label>
          <input
            type="text"
            value={flatNumber}
            onChange={(e) => setFlatNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Locality or Colony:</label>
          <input
            type="text"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nearest Landmark:</label>
          <input
            type="text"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>PIN Code:</label>
          <input
            type="text"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default ShippingAddress;
