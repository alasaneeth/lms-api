const express = require('express');
const { register, login } = require('../controllers/authController');
const {studentRegister} = require('../controllers/studentController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/student-register',studentRegister)

// Protected route example
router.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;