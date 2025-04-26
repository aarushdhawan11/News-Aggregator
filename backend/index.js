require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch'); 
const { body, validationResult } = require('express-validator');
const User = require('./Models/userModel');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes

// Home route
app.get('/', (req, res) => {
    res.send('Hello');
});

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ name: username });

        if (!user) return res.status(404).send({ msg: 'User does not exist' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send({ msg: 'Incorrect password' });

        res.status(200).send({ msg: 'Login successful' });

    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Internal server error' });
    }
});

// Signup
app.post('/signup', [
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ name: username }, { email: email }] });

        if (existingUser) {
            return res.status(409).send({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name: username,
            email: email,
            password: hashedPassword,
        });

        res.status(201).send({ msg: 'User created successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'Internal server error' });
    }
});

// NewsAPI Proxy Route
app.get('/news', async (req, res) => {
    const category = req.query.category?.toLowerCase();  // 🔥 FIX: force lowercase
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'News API key is missing' });
    }

    const url = category
        ? `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
        : `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            console.log('Error fetching news:', response.status, response.statusText);
            return res.status(response.status).json({ error: data.message });
        }

        if (!data.articles || data.articles.length === 0) {
            return res.status(404).json({ error: "No articles found" });
        }

        res.json({ articles: data.articles }); // send only articles
    } catch (err) {
        console.error('Error fetching news:', err);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// Server listen
const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
