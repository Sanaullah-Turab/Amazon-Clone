const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static front-end files
app.use(express.static(path.join(__dirname, "public")));

// MySQL Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Replace with your MySQL username
    password: "5IctMySQL981@3", // Replace with your MySQL password
    database: "webstore",
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL!");
});

// Endpoint to fetch products
app.get("/products", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) {
            console.error("Error fetching products:", err);
            return res.status(500).send("Error fetching products.");
        }
        res.json(results);
    });
});


// Endpoint to add a new product
app.post("/products", (req, res) => {
    const { name, description, price } = req.body;
    const query = "INSERT INTO products (name, description, price) VALUES (?, ?, ?)";
    db.query(query, [name, description, price], (err, result) => {
        if (err) {
            console.error("Error adding product:", err);
            return res.status(500).send("Error adding product.");
        }
        res.json({ id: result.insertId, name, description, price });
    });
});

// Endpoint to update a specific product by id
// filepath: database/server.js
app.put("/update-product/:id", (req, res) => {
    const productId = req.params.id;
    const { name, description, price } = req.body;
    const query = "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?";
    db.query(query, [name, description, price, productId], (err, results) => {
        if (err) {
            console.error("Error updating product:", err);
            return res.status(500).send("Error updating product.");
        }
        if (results.affectedRows === 0) {
            return res.status(404).send(`No product found with id "${productId}".`);
        }
        res.send(`Product with id "${productId}" updated successfully.`);
    });
});

// Endpoint to delete a specific product by id
app.delete("/delete-product/:id", (req, res) => {
    const productId = req.params.id;
    console.log(productId);
    const query = "DELETE FROM products WHERE id = ?";
    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error("Error deleting product:", err);
            return res.status(500).send("Error deleting product.");
        }
        if (results.affectedRows === 0) {
            return res.status(404).send(`No product found with id "${productId}".`);
        }
        res.send(`Product with id "${productId}" deleted successfully.`);
    });
});

// Endpoint to update a specific product by id
app.put("/products/:id", (req, res) => {
    const productId = req.params.id;
    const { name, description, price } = req.body;
    const query = "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?";
    db.query(query, [name, description, price, productId], (err, results) => {
        if (err) {
            console.error("Error updating product:", err);
            return res.status(500).send("Error updating product.");
        }
        if (results.affectedRows === 0) {
            return res.status(404).send(`No product found with id "${productId}".`);
        }
        res.send(`Product with id "${productId}" updated successfully.`);
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
