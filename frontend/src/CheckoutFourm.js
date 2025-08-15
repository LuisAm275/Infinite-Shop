import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CheckoutFourm.css';

function CheckoutFourm({ cartItems = [], onOrderSuccess }) {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod] = useState('Mock Payment');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [isCardValid, setIsCardValid] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  const shippingPrice = 5.00;
  const taxPrice = (totalPrice * 0.1).toFixed(2);
  const finalPrice = (Number(totalPrice) + Number(taxPrice) + shippingPrice).toFixed(2);

  useEffect(() => {
    const isValidCard = /^\d{16}$/.test(cardNumber.trim());
    const isValidExp = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiration.trim());
    const isValidCVV = /^\d{3}$/.test(cvv.trim());
    setIsCardValid(isValidCard && isValidExp && isValidCVV);
  }, [cardNumber, expiration, cvv]);

  const handleExpirationChange = (e) => {
    let val = e.target.value.replace(/[^\d]/g, '').slice(0, 4); // allow max 4 digits MMYY
    if (val.length >= 3) {
      val = val.slice(0, 2) + '/' + val.slice(2);
    }
    setExpiration(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const orderData = {
      orderItems: cartItems.map(item => ({
        name: item.name,
        qty: item.quantity,
        imageUrl: item.imageUrl,
        price: item.price,
        product: item._id,
      })),
      shippingAddress: { address, city, postalCode, country },
      paymentMethod,
      taxPrice: Number(taxPrice),
      shippingPrice,
      totalPrice: Number(finalPrice),
    };

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.post('http://localhost:5000/api/orders', orderData, config);

      if (response && response.data && response.data._id) {
        alert('Order placed successfully!');
        setOrderPlaced(true);
        onOrderSuccess(response.data);
        return;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to place order');
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return <p>No order items. Please add products to your cart before checking out.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Shipping Address</h2>
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={e => setCity(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Postal Code"
        value={postalCode}
        onChange={e => setPostalCode(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={e => setCountry(e.target.value)}
        required
      />

      <h2>Payment Information</h2>
      <div className="payment-section">
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            placeholder="1234567812345678"
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label>Expiration (MM/YY)</label>
            <input
              type="text"
              placeholder="08/25"
              value={expiration}
              onChange={handleExpirationChange}
              required
            />
          </div>

          <div className="form-group half">
            <label>CVV</label>
            <input
              type="text"
              placeholder="123"
              value={cvv}
              onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
              required
            />
          </div>
        </div>
      </div>

      <h2>Order Summary</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item._id}>
            {item.name} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Tax: ${taxPrice}</p>
      <p>Shipping: ${shippingPrice.toFixed(2)}</p>
      <h3>Total: ${finalPrice}</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={loading || orderPlaced || !isCardValid}>
        {loading ? 'Placing order...' : orderPlaced ? 'Order Placed' : 'Place Order'}
      </button>
    </form>
  );
}

export default CheckoutFourm;
