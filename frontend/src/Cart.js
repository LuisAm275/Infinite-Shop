import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate
import "./Cart.css";

function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate(); // <-- initialize navigate

  // Calculate total based on quantity
  const total = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    navigate("/checkout");  // navigate to checkout page
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} />
                <div>
                  <p><strong>{item.name}</strong></p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price per unit: ${item.price}</p>
                  <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item._id)}>Remove One</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: ${total}</h3>
            <button className="checkout-button" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

