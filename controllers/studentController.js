const Student = require('../models/studentModel');
const User = require('../models/userModel');
const { register } = require('./authController')
require('dotenv').config();


const studentRegister = async (req, res) => {
  const {
    fullName,
    gender,
    dob,
    phone,
    email,
    address,
    status,
    enrolmentDate,
    widthrowelDate,
    username,
    password,
    userRole
  } = req.body;

  //console.log('Request Body:', req.body);

  try {
    const student = await Student.create({
      fullName,
      gender,
      dob,
      phone,
      email,
      address,
      status,
      enrolmentDate,
      widthrowelDate
    });

    const userId = student.insertId;
    const user = await User.create(username, password ,userRole, userId);

    res.status(201).json({"userId": user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user', error });
  }
};




module.exports = { studentRegister };
