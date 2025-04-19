const db = require('../config/db');

const Student = {
    
  create: async ({ fullName, gender, dob, phone, email, address, status, enrolmentDate, widthrowelDate }) => {

    const [result] = await db.execute('INSERT INTO students (fullName, gender,dob,phone,email,address,status,enrolmentDate,widthrowelDate) VALUES (?,?,?,?,?,?,?,?,?)', 
                    [fullName, gender,dob,phone,email,address,status,enrolmentDate,widthrowelDate]);
                    
                    return result;
  },
};

module.exports = Student;


