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
    const [students]= await db.execute('SELECT * FROM students ORDER BY id DESC');
    return students;
  },
  
  getById: async ({ id }) => {
    const [students] = await db.execute('SELECT * FROM students WHERE id = ?', [id]);
    return students[0]; // Return a single student object
  },

  update: async ({ id, studentId, fullName, gender, dob, phone, email, address, status, enrolmentDate, widthrowelDate }) => {

    if (!widthrowelDate) {
        widthrowelDate = null; // optional fallback
    }

    const [result] = await db.execute(
        `UPDATE students 
         SET studentId = ?, fullName = ?, gender = ?, dob = ?, phone = ?, email = ?, address = ?, status = ?, enrolmentDate = ?, widthrowelDate = ?
         WHERE id = ?`,
        [studentId, fullName, gender, dob, phone, email, address, status, enrolmentDate, widthrowelDate, id]
    );

    return result;
},



  
};

module.exports = Student;


