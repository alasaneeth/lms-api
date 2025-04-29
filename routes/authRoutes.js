const express = require('express');
const { register, login } = require('../controllers/authController');
const {studentRegister,getAllStudents,getStudentById,updateStudent,searchStudents} = require('../controllers/studentController');
const {tutorRegister} = require("../controllers/tutorController")

const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);




//------------------Authorised Routes
router.post('/student-register', authenticateToken, studentRegister);
router.get('/get-all-students',authenticateToken,getAllStudents) 
router.post('/tutor-register',authenticateToken,tutorRegister)
router.get('/students/:id',authenticateToken, getStudentById);
router.put('/students/:id',authenticateToken, updateStudent);
router.get('/students-search/:key',authenticateToken, searchStudents);

//router.get('/students-search',authenticateToken, updateStudent);

//------------------End of authorised routes -------------------



// Protected route example
// router.get('/protected', authenticateToken, (req, res) => {
//   res.status(200).json({ message: 'This is a protected route', user: req.user });
// });



module.exports = router;