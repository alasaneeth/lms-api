const Student = require('../models/studentModel');
const User = require('../models/userModel');
require('dotenv').config();

const studentRegister = async (req, res) => {
    const {fullName, gender,dob,phone,email,address,status,enrolmentDate,widthrowelDate, username, password ,userRole} = req.body;
    console.log('Request Body:', req.body);
    try {
      const sutudent = await Student.create(fullName, gender,dob,phone,email,address,status,enrolmentDate,widthrowelDate); 
      const userId = sutudent.id;

      const user = await User.create();
      //const userId = await User.create(username, password ,userRole);
      res.status(201).json({ message: 'User created successfully', sutudent});
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  };

  module.exports = {studentRegister};