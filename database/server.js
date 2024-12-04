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
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint to add a new product
app.post("/products", (req, res) => {
    const { name, description, price } = req.body;
    const query = "INSERT INTO products (name, description, price) VALUES (?, ?, ?)";
    db.query(query, [name, description, price], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, name, description, price });
    });
});

// Route to delete a specific product
app.post("/delete-product", (req, res) => {
    const productName = req.body.product_name;
    console.log(req.body); 
    if (!productName) {
        return res.status(400).send("Product name is required.");
    }

    const query = "DELETE FROM products WHERE name = ?";
    db.query(query, [productName], (err, results) => {
        if (err) {
            console.error("Error deleting product data:", err);
            return res.status(500).send("Error deleting data.");
        }

        if (results.affectedRows === 0) {
            return res.status(404).send("No product found with that name.");
        }

        res.send(`Product "${productName}" deleted successfully.`);
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});