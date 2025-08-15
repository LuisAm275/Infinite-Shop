import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './OrderDetails.css';

function OrderDetails() {
  const { id } = useParams(); // get order ID from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`, config);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch order');
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!order) return null;

  return (
    <div>
        <div className="order-details-container">
      <h1>Order Confirmation</h1>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Placed by:</strong> {order.user.name} ({order.user.email})</p>
      <h3>Shipping Address</h3>
      <p>
        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
      </p>
      <h3>Payment Method</h3>
      <p>{order.paymentMethod}</p>
      <h3>Order Items</h3>
      <ul>
        {order.orderItems.map(item => (
          <li key={item._id}>
            {item.name} x {item.qty} = ${(item.price * item.qty).toFixed(2)}
          </li>
        ))}
      </ul>
      <h3>Price Summary</h3>
      <p>Tax: ${order.taxPrice.toFixed(2)}</p>
      <p>Shipping: ${order.shippingPrice.toFixed(2)}</p>
      <p><strong>Total: ${order.totalPrice.toFixed(2)}</strong></p>
      <p><strong>Paid:</strong> {order.isPaid ? `Yes (at ${new Date(order.paidAt).toLocaleString()})` : 'No'}</p>
      <p><strong>Delivered:</strong> {order.isDelivered ? `Yes (at ${new Date(order.deliveredAt).toLocaleString()})` : 'No'}</p>

      <Link to="/">Go back to Home</Link>
      </div>
    </div>
  );
}

export default OrderDetails;
