const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register User
const register = async (req, res) => {
       const { email, password } = req.body;

       if (!email || !password) {
              return res.status(400).json({ message: 'Email and password are required' });
       }
       try {
              let user = await User.findOne({ email });
              if (user) {
                     console.log('User already exists');
                     return res.status(400).json({ message: 'User already exists' });
              }

              user = new User({
                     email,
                     password
              });

              // Log the email and password before saving
              console.log('Saving user with email:', email);
              console.log('Saving user with password:', password);

              await user.save();  // This line might be throwing an error

              console.log('User saved successfully');

              // Generate JWT token
              const payload = {
                     user: {
                            id: user.id,
                     }
              };

              const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
              res.status(201).json({ token: token });
       } catch (error) {
              console.error('Error during registration:', error);  // Log the detailed error
              res.status(500).json({ message: 'Server error' });
       }
};

// Login user
const login = async (req, res) => {
       const { email, password } = req.body;

       try {
              let user = await User.findOne({ email });
              if (!user) {
                     return res.status(400).json({ message: 'Invalid credentials' });
              }

              const isMatch = await bcrypt.compare(password, user.password);
              if (!isMatch) {
                     return res.status(400).json({ message: 'Invalid credentials' });
              }

              const payload = {
                     user: {
                            id: user.id,
                     }
              };

              const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
              res.status(200).json({ token: token });
       } catch (error) {
              res.status(500).json({ message: 'Server Error' });
       }
};

module.exports = { register, login };


