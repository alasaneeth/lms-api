const express = require('express');
const { register, login } = require('../controllers/authController');
const {studentRegister} = require('../controllers/studentController');
const {tutorRegister} = require("../controllers/tutorController")

const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/student-register', authenticateToken, studentRegister);
router.post('/tutor-register',authenticateToken,tutorRegister)



// Protected route example
// router.get('/protected', authenticateToken, (req, res) => {
//   res.status(200).json({ message: 'This is a protected route', user: req.user });
// });



module.exports = router;