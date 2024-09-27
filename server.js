const express = require('express');
const app = express()
const dotenv = require('dotenv');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors')
const bcrypt = require('bcrypt');


app.use(express.json());
// Parse JSON bodies
app.use(bodyParser.json());
// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();


// Create a connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

// Connect to the database
db.connect((err) => {
    if (err) {
        return console.log('Error connecting to MySQL:', err.message);
    }
    console.log('Connected to MySQL as id:', db.threadId);

    // Create database if it does not exist
    db.query(`CREATE DATABASE IF NOT EXISTS expense_tracker`, (err, result) => {
        if (err) throw err;
        console.log('Database expense_tracker checked/created');

        // Switch to the expense_tracker database
        db.changeUser({ database: 'expense_tracker' }, (err) => {
            if (err) throw err;
            console.log('Switched to expense_tracker database');

            // Create users table if it does not exist
            const createUsersTable = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    username VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL
                )
            `;
            //Checks if the users table is successfully created
            db.query(createUsersTable, (err, result) => {
                if (err) throw err;
                console.log('Users table checked/created');
            });


            // Create transactions table if it does not exist
            const createTransactionsTable = `
               CREATE TABLE IF NOT EXISTS transactions (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    amount DECIMAL(10, 2) NOT NULL,
                    date DATE NOT NULL,
                    type ENUM('income', 'expense') NOT NULL
                )
            `;
            db.query(createTransactionsTable, (err, result) => {
                if (err) throw err;
                console.log('Transactions table checked/created');
            });
        });
    });
});


// Registration route
app.post('/register', (req, res) => {
    const { email, username, password } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password' });
        }

        // Insert user into the database
        const query = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
        db.query(query, [email, username, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Registration failed' });
            }
            res.status(200).json({ message: 'Registration successful' });
        });
    });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.log('Database query error:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.log('Password comparison error:', err);
                return res.status(500).json({ message: 'Server error' });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            res.status(200).json({ message: 'Login successful' });
        });
    });
});


// Get all transactions
app.get('/index', (req, res) => {
    const query = 'SELECT * FROM transactions';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching transactions' });
        }
        res.status(200).json(results);
    });
});

// Add a new transaction
app.post('/index', (req, res) => {
    const { name, amount, date, type } = req.body;
    const query = 'INSERT INTO transactions (name, amount, date, type) VALUES (?, ?, ?, ?)';
    db.query(query, [name, amount, date, type], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding transaction' });
        }
        res.status(200).json({ id: result.insertId, name, amount, date, type });
    });
});



const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
})

