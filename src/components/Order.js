import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = JSON.parse(localStorage.getItem('user')).data._id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/orders/user/${userId}`);
        console.log('Fetched Orders:', response.data);  // Log the fetched orders
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Error fetching orders. Please check the console for more details.');
      } finally {
        setLoading(false);
      }
    }; 

    fetchOrders();
  }, [userId]);

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.patch(`http://localhost:4000/orders/cancel/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error cancelling order:', error);
      setError('Error cancelling order. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const activeOrders = orders.filter(order => order.status !== 'Cancelled');

  return (
    <div>
      <h2>My Orders</h2>
      <div>
        {activeOrders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul>
            {activeOrders.map((order) => (
              <li key={order._id}>
                <h3>Product ID: {order.productDetails._id}</h3>
                <p>Status: {order.status}</p>
                <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <img 
                  src={order.designId ? order.productDetails.customizedImage : order.productDetails.imageUrl} 
                  alt="Product" 
                />
                <button onClick={() => handleCancelOrder(order._id)}>Cancel Order</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Orders;
