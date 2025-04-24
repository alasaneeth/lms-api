const db = require('../config/db');

const Student = {
    
  create: async ({ studentId,fullName, gender, dob, phone, email, address, status, enrolmentDate, widthrowelDate }) => {

       // Validate widthrowelDate
       if (!widthrowelDate) {
        widthrowelDate = null; // or set a default date if needed
    }

    const [result] = await db.execute('INSERT INTO students (studentId,fullName, gender,dob,phone,email,address,status,enrolmentDate,widthrowelDate) VALUES (?,?,?,?,?,?,?,?,?,?)', 
                    [studentId,fullName, gender,dob,phone,email,address,status,enrolmentDate,widthrowelDate]);
                    
                    return result;
  },
  getAll : async()=> {
    const [students]= await db.execute('SELECT * FROM students');
    return students;
  }
};

module.exports = Student;


