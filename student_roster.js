"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = "student.db";
let db = new sqlite.Database(file);

let replServer = repl.start({
  prompt: ">> ",
  input: process.stdin,
  output: process.stdout
})

class Student {
  
  addStudent(first_name, last_name, gender, birthday, email, phone){
    let add = `INSERT INTO students(first_name, last_name, gender, birthday, email, phone)
               VALUES('${first_name}', '${last_name}', '${gender}', '${birthday}', '${email}', '${phone}')`;
      db.run(add, function(err){
        if(err){
          console.log(err);
        }else {
          console.log('data already added ');
        }
      })
  }
  
  updateStudent(id, first_name, last_name, gender, birthday,email, phone){
    let update = `UPDATE students SET first_name = '${first_name}', last_name = '${last_name}', gender = '${gender}', birthday = '${birthday}', email = '${email}', phone = '${phone}'
                  WHERE id = '${id}'`;
      db.run(update,function(err){
        if(err){
          console.log(err);
        }else {
          console.log('data already updated');
        }
      });
  }
  
  deleteStudent(id){
    let deleteData = `DELETE FROM students WHERE students.id = '${id}'`
    db.run(deleteData, function(err){
      if (err) {
        console.log(err);
      }else {
        console.log('data already deleted');
      }
    });
  }
  
  showAll(){
    let showData = `SELECT * FROM students`;
    db.all(showData, function(err,rows){
      if(err){
        console.log(err);
      }else {
        console.log(rows);
      }
    });
  }
  
  showByName(name){
    let showByName = `SELECT * FROM students
                      WHERE first_name LIKE '%${name}%' OR last_name LIKE '%${name}%'`;
    db.all(showByName,function(err, rows){
      if (err) {
        console.log(err);
      }else {
        console.log(rows);
      }
    });
  }
  
  showByAttribute(attribute, value){
    let showByAttribute = `SELECT * FROM students WHERE ${attribute} = '${value}'`;
    db.all(showByAttribute, function(err,rows){
      if (err) {
        console.log(err);
      }else {
        console.log(rows);
      }
    })
  }
  
  showByBirthDayInThisMonth(){
    let showByBirthDayInThisMonth = `SELECT * FROM students WHERE strftime('%m', birthday) = strftime('%m', 'now')`;
    db.all(showByBirthDayInThisMonth, function(err, rows){
      if(err){
        console.log(err);
      }else {
        console.log(rows);
      }
    })
  }
  
  // showBirthDay(){
  //   let showBirthDay = `SELECT * FROM students ORDER BY strftime('%m%d', birthday) ASC`;
  //   db.all(showBirthDay ,function(err,rows){
  //     if(err){
  //       console.log(err);
  //     }else {
  //       console.log(rows);
  //     }
  //   })
  // }
  
  help(){
    let show = `addStudent(first_name, last_name, gender, birthday, email, phone)\n updateStudent(id,first_name, last_name, gender, birthday, email, phone)\n deleteStudent(id)\n showData()\n showByName(name)\n showByAttribute(attribute, value)\n showByBirthDayInThisMonth()\n showBirthDay()`;
    console.log(show);
  }
  
}

let student = new Student();
replServer.context.addStudent = student.addStudent;
replServer.context.updateStudent = student.updateStudent;
replServer.context.deleteStudent = student.deleteStudent;
replServer.context.showAll = student.showAll;
replServer.context.showByName = student.showByName;
replServer.context.showByAttribute = student.showByAttribute;
replServer.context.showByBirthDayInThisMonth = student.showByBirthDayInThisMonth;
replServer.context.showBirthDay = student.showBirthDay;
replServer.context.help = student.help;