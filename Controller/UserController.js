const User=require("../Model/UserModel")
 const bcrypt = require('bcrypt');
 const { validationResult } = require("express-validator");
// const jwt = require('jsonwebtoken');



// User registration
exports.registerUser = async (req, res) => {
    try {
        const { username, phonenumber,gender,city, email, password  } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, phonenumber,gender,city, email, password : hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

// User login with JWT token generation
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'my-secret-key', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

