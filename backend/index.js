


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Models/userModel');
const app = express();
const bcrypt = require("bcrypt");

const { body, validationResult } = require('express-validator');

mongoose.connect('mongodb+srv://aarushdhawan25:^vvrulc2q@cluster0.qkesk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ name: username });

    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.status(200).send({ msg: 'User exists and password is correct' });
        } else {
            res.status(401).send({ msg: 'User exists but password is incorrect' });
        }
    } else {
        res.status(404).send({ msg: 'User does not exist' });
    }
});

app.post('/signup', [
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ name: username }, { email: email }] });
        if (user) {
            return res.status(409).send({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name: username,
            email: email,
            password: hashedPassword,
        });

        res.status(201).send({ msg: 'User created' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'Internal server error' });
    }
});

app.get('/', (req, res) => {
    res.send('hello');
});

app.listen(4003, () => {
    console.log('server started on port 4003');
});