const Student = require('../models/studentModel');
const User = require('../models/userModel');
const { register } = require('./authController')
require('dotenv').config();


const studentRegister = async (req, res) => {
  const {
    studentId,
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

  try {
    const student = await Student.create({
      studentId,
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
    console.log('Inserted Student ID:', userId);

    const user = await User.create(username, password, userRole, userId, null); // studentId is populated, tutorId is null
    console.log('Created User:', user);

    res.status(201).json({ userId: user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error });
  }
};


const getAllStudents = async (req, res) => {
  try {
    const students = await Student.getAll();

    const formattedStudents = students.map(student => ({
      ...student,
      enrolmentDate: student.enrolmentDate 
        ? new Date(student.enrolmentDate).toISOString().split('T')[0] 
        : null,
      widthrowelDate: student.widthrowelDate 
        ? new Date(student.widthrowelDate).toISOString().split('T')[0] 
        : null,
      dob: student.dob 
        ? new Date(student.dob).toISOString().split('T')[0] 
        : null
    }));

    res.status(200).json(formattedStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching students" });
  }

  
};


const getStudentById = async (req, res) => {
    const { id } = req.params;

    try {
      const student = await Student.getById({ id });

      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      const formattedStudent = {
        ...student,
        enrolmentDate: student.enrolmentDate 
          ? new Date(student.enrolmentDate).toISOString().split('T')[0] 
          : null,
        widthrowelDate: student.widthrowelDate 
          ? new Date(student.widthrowelDate).toISOString().split('T')[0] 
          : null,
        dob: student.dob 
          ? new Date(student.dob).toISOString().split('T')[0] 
          : null
      };
  

      res.status(200).json({ student: formattedStudent });
    } catch (error) {
      console.error('Error fetching student by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const updateStudent = async (req, res) => {
    const { id } = req.params; // student ID from URL
  
    const {
      studentId,
      fullName,
      gender,
      dob,
      phone,
      email,
      address,
      status,
      enrolmentDate,
      widthrowelDate
    } = req.body;
  
    try {
      // Check if student exists
      const existingStudent = await Student.getById({ id });
  
      if (!existingStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      // Update student
      const updatedStudent = await Student.update({
        id,
        studentId,
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
  
      res.status(200).json({ message: 'Student updated successfully', updatedStudent });
    } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).json({ message: 'Internal server error', error });
    }

  };
  const searchStudents = async (req, res) => {
    try {
      const query = req.params.key; 
      const students = await Student.search(query);
      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

module.exports = { studentRegister,getAllStudents,getStudentById,updateStudent,searchStudents };
