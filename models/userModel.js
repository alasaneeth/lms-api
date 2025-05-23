const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  findByUserName: async (username) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  },
  create: async (username, password, userRole, studentId = null, tutorId = null) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO users (username, password, userRole, studentId, tutorId) VALUES (?, ?, ?, ?, ?)',
      [username, hashedPassword, userRole, studentId, tutorId]
    );
    return result.insertId;
  }
  
};

module.exports = User;

