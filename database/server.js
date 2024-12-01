const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Create Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images'))); // Serve static images

// MySQL Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '5IctMySQL981@3', // Replace with your MySQL password
    database: 'webStore'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// API to fetch all products
app.get('/api/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// API to add a product
app.post('/api/products', (req, res) => {
    const { name, description, price, image_path } = req.body;
    const sql = 'INSERT INTO products (name, description, price, image_path) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, description, price, image_path || null], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, name, description, price, image_path });
    });
});

// API to update a product
app.put('/api/products', (req, res) => {
    const { id, name, description, price, image_path } = req.body;
    const sql = 'UPDATE products SET name = ?, description = ?, price = ?, image_path = ? WHERE id = ?';
    db.query(sql, [name, description, price, image_path || null, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Product updated successfully' });
    });
});

// API to delete a product
app.delete('/api/products', (req, res) => {
    const { id } = req.body;
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Product deleted successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

