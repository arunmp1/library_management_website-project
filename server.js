const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch'); // Add this line for fetch

// Import the User model
const User = require('./models/user'); // Make sure to use the correct path

const app = express();
const PORT = 3000; 

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('library-management - Copy')); 

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/elibrary', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Sign Up and Sign In Routes
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'Email already in use.' });
    }
    
    // Create new user without hashing the password
    const newUser = new User({ name, email, password }); // Store plain-text password
    console.log("Plain-text password during signup:", password); // Log plain-text password

    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user.' });
    }
});

// Sign In Route
// Sign In Route
// Sign In Route (in server.js or your backend code)
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log(`User not found for email: ${email}`);
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const isMatch = password.trim() === user.password; // Direct comparison
        if (!isMatch) {
            console.log("Password mismatch for user:", email);
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Return user email in response
        res.json({ message: 'Login successful', email: user.email }); // Include email in the response
    } catch (error) {
        console.error("Error during authentication:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Function to authenticate user (example)
async function authenticateUser(email, password) {
    const response = await fetch('http://localhost:3000/signin', { // Full URL to backend
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log(data);
}

// Call the function with example credentials
authenticateUser('arunmp192000@gmail.com', 'Arun2000'); // Replace with actual user input

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
