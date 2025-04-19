const db = require('../config/db');

const Tutor = {
    
  create: async ({ tutorId,fullName, gender, dob, phone, email, address, status, joinDate, resignationDate }) => {

    const [result] = await db.execute('INSERT INTO tutors (tutorId,fullName, gender, dob, phone, email, address, status, joinDate, resignationDate ) VALUES (?,?,?,?,?,?,?,?,?,?)', 
                    [tutorId,fullName, gender, dob, phone, email, address, status, joinDate, resignationDate ]);
                    
                    return result;
  },
};

module.exports = Tutor;

