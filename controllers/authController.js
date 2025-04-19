const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
require('dotenv').config();


const register = async (req, res) => {
  const { username, password ,userRole,userId} = req.body;
  console.log('Request Body:', req.body);
  try {
    const user = await User.create(username, password ,userRole, userId);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByUserName(username);
    console.log(user)
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = { register, login };
