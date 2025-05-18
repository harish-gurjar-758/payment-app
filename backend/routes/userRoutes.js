const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password, upiId } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ name, email, password: hashed, upiId });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: 'User already exists' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token, user });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

router.get('/me', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ error: 'No token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        res.json(user);
    } catch {
        res.status(403).json({ error: 'Invalid token' });
    }
});

module.exports = router;
