"use strict"

const repl = require('repl');
const replServer = repl.start('>> ')
const sqlite = require('sqlite3').verbose();
let file = 'student.db'
let db = new sqlite.Database(file)

// write your code here
class Student {
  constructor() {
    
  }
  
  addStudent(first_name,last_name,gender,birthdate,email,phone) {
    let query = `insert into students (first_name,last_name,gender,birthdate,email,phone) VALUES ('${first_name}','${last_name}','${gender}','${birthdate}','${email}','${phone}');`
    db.run(query, err => {
      if (!err) console.log('data successful added');
      else {console.log(err);}
    })
  }
  updateStudentById(id,attribute,value) {
    let query = `UPDATE students set ${attribute}='${value}' where id=${+id};`
    db.run(query, err => {
      if (!err) console.log(`student with ${id} has been updated`);
      else {console.log(err);}
    })
  }
  removeStudentById(id) {
    let query = `DELETE from students where id=?;`
    db.run(query, [+id], err => {
      if (!err) console.log(`student with id ${id} has been deleted`);
      else {console.log(err);}
    })
  }
  viewStudents() {
    let query = `SELECT * FROM students`
    db.all(query, (err,students) => {
      this.showInfo(students)
    })
  }
  viewStudentByName(name) {
    let query = `SELECT * from students where first_name=?`
    db.get(query, [`${name}`], (err, students) => {
      this.showInfo(students);
    })
  }
  viewStudentByAttribute(attribute,value) {
    let query = `SELECT * from students where ${attribute}=${value}`
    if(attribute == 'id') {
      query = `SELECT * from students where ${attribute}=${+value}`
    } else {
      query = `SELECT * from students where ${attribute}='${value}'`
    }
    db.all(query, (err, students) => {
      if (!err) {
        this.showInfo(students)
      } else {console.log(err);}
    })
  }
  showBirthdayThisMonth() {
    let query = `select *,strftime('%m',birthdate) as birth_month,strftime('%m','now') as now from students where birth_month=now;`
    db.all(query, (err,students) => {
        this.showInfo(students)
    })
  }
  showStudentsBirthDay() {
    let query = `select *,strftime('%m-%d',birthdate) as new_birthday from students order by new_birthday;`
    db.all(query, (err, students) => {
      this.showInfo(students)
    })
  }
  help() {}
  showInfo(students) {
    students.forEach(student => {
      console.log(`id : ${student.id}`);
      console.log(`first Name : ${student.first_name}`);
      console.log(`last Name : ${student.last_name}`);
      console.log(`gender : ${student.gender}`);
      console.log(`birthdate : ${student.birthdate}`);
      console.log(`email : ${student.email}`);
      console.log(`phone : ${student.phone}\n`);
    })
  }
}

let student = new Student()
// student.viewStudents()
// console.log(student);
replServer.context.student = student
