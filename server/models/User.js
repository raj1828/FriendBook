// /models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define user schema
const userSchema = new mongoose.Schema({
       email: {
              type: String,
              required: [true, 'Email is required'],
              unique: true,
              trim: true
       },
       password: {
              type: String,
              required: [true, 'Password is required']
       }
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
       if (!this.isModified('password')) return next();

       const salt = await bcrypt.genSalt(10);
       this.password = await bcrypt.hash(this.password, salt);
       next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
