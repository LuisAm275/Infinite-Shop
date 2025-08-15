import mongoose from "mongoose";
import dotenv from "dotenv";
import products from "./models/Product.js";

dotenv.config();
const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        // To clear all existing products
        await products.deleteMany();

        const sampleProducts = [
            {
                name: "Wireless Headphones",
                description: "High-quality wireless headphones with noise cancellation.",
                price: 99.99,
                imageUrl: "https://via.placeholder.com/200x200?text=Headphones",
                countInStock: 15,
            },
            {
                name: "Smart Watch",
                description: "Feature-packed smart watch with fitness tracking.",
                price: 149.99,
                imageUrl: "https://via.placeholder.com/200x200?text=Smart+Watch",
                countInStock: 10,
            },
            {
                name: "Bluetooth Speaker",
                description: "Portable Bluetooth speaker with deep bass.",
                price: 49.99,
                imageUrl: "https://via.placeholder.com/200x200?text=Speaker",
                countInStock: 20,
            },
        ];

        await products.insertMany(sampleProducts);
        console.log("Sample products inserted");
        process.exit();
    } catch (error) {
        console.error("Error seeding products:", error);
        process.exit(1);
    }
};

seedProducts();