const Tutor = require('../models/tuterModel');
const User = require('../models/userModel');
const { register } = require('./authController')
require('dotenv').config();

const tutorRegister = async (req, res) => {
  const {
      tutorId,
      fullName,
      gender,
      dob,
      phone,
      email,
      address,
      status,
      joinDate,
      resignationDate,
      username,
      password,
      userRole
  } = req.body;

  console.log('Request Body:', req.body);

  try {
    const tutor = await Tutor.create({
        tutorId,
        fullName,
        gender,
        dob,
        phone,
        email,
        address,
        status,
        joinDate,
        resignationDate,
    });

    const userId = tutor.insertId;
    const user = await User.create(username, password ,userRole, userId);

    res.status(201).json({"userId": user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user', error });
  }
};




module.exports = { tutorRegister };
