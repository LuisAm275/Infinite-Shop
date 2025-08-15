import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    countInStock: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/products", formData);
    alert("Product added!");
  };

  return (
  <div className="form-container">
    <h2>Add New Product</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          name="price"
          placeholder="Price"
          type="number"
          onChange={handleChange}
          required
          step="0.01"
        />
      </div>
      <div className="form-group">
        <input
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          name="countInStock"
          placeholder="Stock"
          type="number"
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        Add Product
      </button>
    </form>
  </div>
);

}

export default AddProduct;

