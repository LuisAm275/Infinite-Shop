import React from 'react';
import CheckoutForm from './CheckoutFourm';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

    console.log('CheckoutPage cartItems:', cartItems);

    const handleOrderSuccess = (order) => {
    // Clear cart after successful order
    setCartItems([]);
    // Redirect to order confirmation or home
    navigate(`/order/${order._id}`);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <CheckoutForm cartItems={cartItems} onOrderSuccess={handleOrderSuccess} />
    </div>
  );
}

export default CheckoutPage;
