"use strict"

const repl = require('repl')
const sqlite = require('sqlite3').verbose()

var file = 'student.db'
var dbase = new sqlite.Database(file)
let replStart = repl.start({
  prompt: "ACTION >> ",
  input: process.stdin,
  output: process.stdout
})

var Table = require('cli-table2');
var tableStudent = new Table({
  head: ['ID', 'First Name', 'Last Name', 'Gender', 'Birthdate', 'Email', 'Phone']
})

var tableSearch = new Table({
  head: ['First Name', 'Last Name']
})

// write your code here
class Student {
  constructor() {}

  insertStudent(first_name, last_name, gender, birthdate, email, phone) { //q for query
    dbase.serialize(function() {
      let qInsert = `INSERT INTO student (first_name, last_name, gender, birthdate, email, phone) VALUES ('${first_name}', '${last_name}', '${gender}', '${birthdate}', '${email}', '${phone}');`
      dbase.run(qInsert, (err) => {
        (!err) ? console.log('Input data success!'): console.log(err)
      })
    })
    return 'Your action has been process!'
  }

  updateStudent(first_name, last_name, gender, birthdate, email, phone, id) {
    dbase.serialize(() => {
      let qUpdate = `UPDATE student SET first_name = '${first_name}', last_name = '${last_name}', gender = '${gender}', birthdate = '${birthdate}', email = '${email}', phone = '${phone}' WHERE id = '${id}';`
      dbase.run(qUpdate, (err) => {
        (!err) ? console.log('Update data success!'): console.log(err)
      })
    })
    return 'Your action has been process!'
  }

  removeStudent(id) {
    dbase.serialize(() => {
      let qRemove = `DELETE FROM student WHERE id = '${id}'`
      dbase.run(qRemove, (err) => {
        (!err) ? console.log('Delete data success!'): console.log(err)
      })
    })
    return 'Your action has been process!'
  }

  showDataStudent() {
    let qShow = `SELECT * FROM student`
    dbase.serialize(() => {
      dbase.all(qShow, (err, rows) => {
        if (!err) {
          rows.forEach((attrb) =>
            tableStudent.push([attrb.id, attrb.first_name, attrb.last_name, attrb.gender, attrb.birthdate, attrb.email, attrb.phone]))
          console.log('\n')
          console.log(tableStudent.toString());
          tableStudent.length = 0
        } else {
          console.log(err)
        }
      })
    })
    return 'Your action has been process!'
  }

  searchByName(name) {
    dbase.serialize(() => {
      let qSearch = `SELECT first_name, last_name FROM student WHERE first_name LIKE '%${name}%' OR last_name LIKE '%${name}%';`
      dbase.all(qSearch, (err, rows) => {
        if (!err) {
          rows.forEach((attrb) => tableSearch.push([attrb.first_name, attrb.last_name]))
          console.log('\n');
          console.log(tableSearch.toString());
          tableSearch.length = 0
        } else {
          console.log(err);
        }
      })
    })
    return 'Your action has been process!'
  }

  showDataByInput(attribute, value) {
    dbase.serialize(() => {
      let qShowByInput = `SELECT * FROM student WHERE ${attribute} = '${value}';`
      dbase.all(qShowByInput, (err, rows) => {
        if (!err) {
          rows.forEach((attrb) =>
            tableStudent.push([attrb.id, attrb.first_name, attrb.last_name, attrb.gender, attrb.birthdate, attrb.email, attrb.phone]))
          console.log('\n');
          console.log(tableStudent.toString());
          tableStudent.length = 0
        } else {
          console.log(err);
        }
      })
    })
    return 'Your action has been process!'
  }

  birthdateByMonth() {
    dbase.serialize(() => {
      let qBirthdateByMonth = `SELECT * FROM  student WHERE strftime ('%m', birthdate) = strftime ('%m', date('now'));`
      dbase.all(qBirthdateByMonth, (err, rows) => {
        if (!err) {
          rows.forEach((attrb) =>
            tableStudent.push([attrb.id, attrb.first_name, attrb.last_name, attrb.gender, attrb.birthdate, attrb.email, attrb.phone]))
          console.log('\n');
          console.log(tableStudent.toString());
          tableStudent.length = 0
        } else {
          console.log(err);
        }
      })
    })
    return 'Your action has been process!'
  }

  searchBirthdate() {
    dbase.serialize(() => {
      let qSearchBirthdate = `SELECT * FROM student ORDER BY strftime ('%m%d', birthdate) ASC;`
      dbase.all(qSearchBirthdate, (err, rows) => {
        if (!err) {
          rows.forEach((attrb) =>
            tableStudent.push([attrb.id, attrb.first_name, attrb.last_name, attrb.gender, attrb.birthdate, attrb.email, attrb.phone]))
          console.log('\n');
          console.log(tableStudent.toString());
          tableStudent.length = 0
        } else {
          console.log(err);
        }
      })
    })
    return 'Your action has been process!'
  }

  help() {
    console.log('\n')
    console.log('======================================================================================================================================');
    console.log('======================================================== H E L P   O P T I O N =======================================================');
    console.log('======================================================================================================================================');   
    console.log(' I  -  N  -  P  -  U  -  T  :');
    console.log('\n')
    console.log(' #1 ACTION >> insertStudent(first_name, last_name, gender, birthdate, email, phone)     | Input new student');
    console.log(' #2 ACTION >> updateStudent(first_name, last_name, gender, birthdate, email, phone, id) | Update student by ID');
    console.log(' #3 ACTION >> removeStudent(id)                                                         | Delete student by ID');
    console.log(' #4 ACTION >> showDataStudent()                                                         | Show all data student');
    console.log(' #5 ACTION >> searchByName(name)                                                        | Show data student by student name');
    console.log(' #6 ACTION >> showDataByInput(attribute, value)                                         | Show all data student by attribute and value');
    console.log(' #7 ACTION >> birthdateByMonth()                                                        | Show all data student by month');
    console.log(' #8 ACTION >> searchBirthdate()                                                         | Show all data student by input birthdate');
    return '======================================================================================================================================'
  }
  

}

let modulStudent = new Student()
replStart.context.help = modulStudent.help()
replStart.context.insertStudent = modulStudent.insertStudent
replStart.context.updateStudent = modulStudent.updateStudent
replStart.context.removeStudent = modulStudent.removeStudent
replStart.context.showDataStudent = modulStudent.showDataStudent
replStart.context.searchByName = modulStudent.searchByName
replStart.context.showDataByInput = modulStudent.showDataByInput
replStart.context.birthdateByMonth = modulStudent.birthdateByMonth
replStart.context.searchBirthdate = modulStudent.searchBirthdate
// replServer.on('exit', () => {
//   console.log('Received "exit" event from repl!');
//   process.exit()
// })
