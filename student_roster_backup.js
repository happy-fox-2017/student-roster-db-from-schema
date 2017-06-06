"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db = new sqlite.Database(file);
var r = repl.start('> ');
// write your code here

//cli-Table2
// let table = require ('cli-table2');
// let tableStudent = new Table({
//   head: ['ID', 'First Name', 'Last Name', 'Gender', 'Birthday', 'Email', 'Phone']
// });
// 
// let tableSearch = new Table({
//   head: ['First Name', 'Last Name']
// });

class Student {
  constructor() {}

  addStudent(first, last, gender, birthday, email, phone) {
    let query = `INSERT INTO student (first_name, last_name, gender, birthday, email, phone) VALUES ('${first}', '${last}', '${gender}', '${birthday}', '${email}', '${phone}');`;
    // this.run(query);
    db.serialize(function() {
      db.run(query, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('query SUCCESSFULLY PROCESSED!');
        }
      });
    });
  }

  updateStudent(id, changedFirst, changedLast, changedGender, changedBirthday, changedEmail, changedPhone) {
    let query = `UPDATE student SET first_name = '${changedFirst}', last_name = '${changedLast}', gender = '${changedGender}', birthday = '${changedBirthday}', email = '${changedEmail}', phone = '${changedPhone}' WHERE id = '${id}';`;
    
    // this.run(query);
    db.serialize(function() {
      db.run(query, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('query SUCCESSFULLY PROCESSED!');
        }
      });
    });
  }

  removeStudent(id) {
    let query = `DELETE FROM student WHERE id = '${id}';`;
    // this.run(query);
    db.serialize(function() {
      db.run(query, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('query SUCCESSFULLY PROCESSED!');
        }
      });
    });
  }

  studentList() {
    let query = `SELECT * FROM student;`;
    // this.all(query);
    db.serialize(function() {
      db.all(query, function(err, data) {
        if (!err) {
          console.log(data);
        } else {
          console.log(err);
        }
      });
    });
  }

  showStudent(name) {
    let query = `SELECT * FROM student WHERE first_name LIKE '%${name}' OR last_name LIKE '%${name}';`;
    // this.all(query);
    db.serialize(function() {
      db.all(query, function(err, data) {
        if (!err) {
          console.log(data);
        } else {
          console.log(err);
        }
      });
    });
  }
  
  findStudent(attribute, value) {
    let query = `SELECT * FROM student WHERE ${attribute} = '${value}';`;
    // this.all(query);
    db.serialize(function() {
      db.all(query, function(err, data) {
        if (!err) {
          console.log(data);
        } else {
          console.log(err);
        }
      });
    });
  }
  
  birthdayBoy() {
    let date = new Date();
    let thisMonth = date.getMonth()+1;
    
    if (thisMonth < 10) {
      thisMonth = '0' + thisMonth;
    } else {
      thisMonth = thisMonth;
    }
    let query =  `SELECT * FROM student WHERE strftime('%m', birthday) = '${thisMonth}';`;
    // this.all(query);
    db.serialize(function() {
      db.all(query, function(err, data) {
        if (!err) {
          console.log(data);
        } else {
          console.log(err);
        }
      });
    });
  }
  
  birthdays() {
    let date = new Date();
    let thisMonth = date.getMonth()+1;
    
    if (thisMonth < 10) {
      thisMonth = '0' + thisMonth;
    } else {
      thisMonth = thisMonth;
    }
    let query = `SELECT id, first_name, last_name, gender, email, phone, strftime('%d', birthday) AS Date, strftime('%m', birthday) AS Month FROM student ORDER BY Month ASC;`;
    // this.all(query);
    db.serialize(function() {
      db.all(query, function(err, data) {
        if (!err) {
          console.log(data);
        } else {
          console.log(err);
        }
      });
    });
  }
} //class Student

let student = new Student();

r.context.addStudent = student.addStudent
r.context.updateStudent = student.updateStudent
r.context.removeStudent = student.removeStudent
r.context.studentList = student.studentList
r.context.showStudent = student.showStudent
r.context.findStudent = student.findStudent
r.context.birthdayBoy = student.birthdayBoy
r.context.birthdays = student.birthdays

function help() {
  console.log('================= GUIDE =================');
  console.log('==== Do not forget semicolon; ===========');
  console.log("1. To add student data, please type:\n>>addStudent('first_name', 'last_name', 'gender', 'birthday', 'email', 'phone');<<");
  console.log("2. To update existing student data, please type:\n>>updateStudent('id', 'first_name', 'last_name', 'gender', 'birthday', 'email', 'phone');<<");
}

r.context.help = help
