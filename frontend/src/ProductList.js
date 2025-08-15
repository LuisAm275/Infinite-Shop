import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";
import "./Nav.css";
import { useCart } from "./CartContext";

function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart, cartItems } = useCart();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    console.log("Attempting to delete product:", productId);
    console.log("Token being sent:", userInfo?.token);
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      fetchProducts(); // Refresh product list after deletion
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div>
      <div className="product-grid">
        {products.map((product) => {
          const productInCart = cartItems.find(item => item._id === product._id);
          const quantityInCart = productInCart?.quantity || 0;
          const isOutOfStock = quantityInCart >= Number(product.countInStock);

          return (
            <div key={product._id} className="product-card">
              {userInfo?.isAdmin && (
                <button
                  className="delete-button"
                  onClick={() => handleDelete(product._id)}
                  title="Delete Product"
                >
                  ❌
                </button>
              )}
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <div className="product-details">
                <div className="product-name">{product.name}</div>
                <div className="product-description">{product.description}</div>
                <div className="product-price">${product.price}</div>

                {isOutOfStock ? (
                  <button className="out-of-stock-btn" disabled>
                    Out of Stock
                  </button>
                ) : (
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;
