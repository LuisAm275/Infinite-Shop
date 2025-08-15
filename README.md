Infinity Shop
Project Overview

Infinity Shop is a full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js). This project allows users to browse products, add items to a cart, and complete a checkout process with a mock payment form.

Features

Product Management
View products with descriptions, images, and prices.
Admin users can add new products.

User Authentication
Users can register, login, and logout.
JWT-based authentication secures protected routes.

Shopping Cart
Add, update, and remove products from the cart.
Displays total quantity and price.

Checkout
Collects shipping address and payment information.
Payment form validates card number, expiration, and CVV.
Order summary displays tax, shipping, and total price.

Order Confirmation
Displays order details, shipping info, and payment status.

Technologies Used

Frontend: React, React Router, CSS

Backend: Node.js, Express

Database: MongoDB

Authentication: JWT

HTTP Client: Axios

Installation

Clone the repository:
git clone https://github.com/LuisAm275/Infinite-Shop.git

Navigate to the project folder:
cd Infinite-Shop

Install backend dependencies:
npm install

Install frontend dependencies (if the frontend is in a separate folder, e.g., client):
cd client
npm install

Start the development server:
npm run dev # backend with nodemon
npm start # frontend

Open your browser at http://localhost:3000 to view the app.

Usage

Register or login as a user.

Browse products and add them to your cart.

Complete the checkout form with shipping and mock payment info.

Place your order and view the order confirmation.

License

This project is for educational purposes.
