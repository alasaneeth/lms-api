const express = require('express');
const { register, login } = require('../controllers/authController');
const {studentRegister,getAllStudents,getStudentById} = require('../controllers/studentController');
const {tutorRegister} = require("../controllers/tutorController")

const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/students/:id', getStudentById);

//------------------Authorised Routes
router.post('/student-register', authenticateToken, studentRegister);
router.get('/get-all-students',authenticateToken,getAllStudents) 
router.post('/tutor-register',authenticateToken,tutorRegister)

//------------------End of authorised routes -------------------



// Protected route example
// router.get('/protected', authenticateToken, (req, res) => {
//   res.status(200).json({ message: 'This is a protected route', user: req.user });
// });



module.exports = router;