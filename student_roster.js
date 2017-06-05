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
  
  static showInfo(students) {
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
      if (!err) {
        Student.showInfo(students)
      } else {console.log(err);}
      // console.log(students);
    })
  }
  viewStudentByName(name) {
    let query = `SELECT * from students where first_name=?`
    db.get(query, [`${name}`], (err, students) => {
      Student.showInfo(students);
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
        Student.showInfo(students)
      } else {console.log(err);}
    })
  }
  showBirthdayThisMonth() {
    let query = `select *,strftime('%m',birthdate) as birth_month,strftime('%m','now') as now from students where birth_month=now;`
    db.all(query, (err,students) => {
        Student.showInfo(students)
    })
  }
  showStudentsBirthday() {
    let query = `select *,strftime('%m-%d',birthdate) as new_birthday from students order by new_birthday;`
    db.all(query, (err, students) => {
      Student.showInfo(students)
    })
  }
  help() {
    console.log(`add('first_name','last_name','gender','birthdate','email','phone') >> add user`);
    console.log(`update(id, attribute, value) >> update by id`);
    console.log(`remove(id) >> remove student by id`);
    console.log(`viewAll() >> view all students`);
    console.log(`viewStudent(name) >> view student by name`);
    console.log(`viewStudentAdvance(attribute,value) >> view student by attribute`);
    console.log(`birthdayNow() >> view students's birthday this month`);
    console.log(`showBirthday() >> show all students birth day based on month`);
    console.log(`help() >> show help`);
  }
}

let student = new Student()

replServer.context.student = student
replServer.context.add = student.addStudent
replServer.context.update = student.updateStudentById
replServer.context.remove = student.removeStudentById
replServer.context.viewAll = student.viewStudents
replServer.context.viewStudent = student.viewStudentByName
replServer.context.viewStudentAdvance = student.viewStudentByAttribute
replServer.context.birthdayNow = student.showBirthdayThisMonth
replServer.context.showBirthday = student.showStudentsBirthday
replServer.context.help = student.help


