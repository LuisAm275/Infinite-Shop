import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import Cart from './Cart';
import Login from './Login';
import Register from './Register';
import AdminRoute from "./components/AdminRoute";
import { useCart, CartProvider } from "./CartContext";
import CheckoutPage from "./CheckoutPage";   // ✅ FIXED: Use CheckoutPage
import OrderDetails from "./OrderDetails";

// Navbar component
function Navbar() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-title">Infinity Shop</div>

      <div className="nav-links">
        <Link to="/" className="add-button">Home</Link>
        {userInfo?.isAdmin && (
          <Link to="/add-product" className="add-button">Add Product</Link>
        )}

        {userInfo ? (
          <>
            <Link className="add-button">Welcome, {userInfo.name}</Link>
            <Link onClick={handleLogout} className="add-button logout-button">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="add-button">Login</Link>
            <Link to="/register" className="add-button">Register</Link>
          </>
        )}

        <Link to="/cart" className="add-button">View Cart ({totalQuantity})</Link>
      </div>
    </nav>
  );
}

// Main App
function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route
              path="/add-product"
              element={
                <AdminRoute>
                  <AddProduct />
                </AdminRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} /> {/* ✅ FIXED */}
            <Route path="/order/:id" element={<OrderDetails />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
