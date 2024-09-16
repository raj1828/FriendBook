const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

// connection to the mOngo DB
connectDB();

const app = express();
app.use(express.json());

// Defining Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
       console.log(`Server is listening on ${PORT}`);
});


