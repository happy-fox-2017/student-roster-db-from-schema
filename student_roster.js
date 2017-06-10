"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();

let file = 'student.db'
let db = new sqlite3.Database(file);

let replServer = repl.start({
  prompt: 'play> ',
  input: process.stdin,
  output: process.stdout
});

class Student {
  constructor() {
  }

  help() {
    console.log(' |addData| : add student');
    console.log(' |updateData| : update students');
    console.log(' |removeData| : delete students');
    console.log(' |studentsList| : list all students');
    console.log(' |nameList| : list students by name');
    console.log(' |keyValueList| : list students by parameter');
    console.log(' |listByMonth| : list students having birthday this month');
    console.log(' |sortedByBirthday| : sort students by birthday');
  }
  
  addData(first_name, last_name, gender, birthday, email, phone) {
    db.serialize(function() {
      let query = `INSERT INTO student (first_name, last_name, gender, birthday, email, phone) VALUES ('${first_name}', '${last_name}', '${gender}', '${birthday}', '${email}', '${phone}')`;
      db.run(query, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${first_name} listed`);
        }
      });
    });
    return 'add student'
  }

  updateData(id, first_name, last_name, gender, birthday, email, phone) {
    db.serialize(function() {
      let query = `UPDATE student SET first_name = "${first_name}", last_name = "${last_name}", gender = "${gender}", birthday = "${birthday}", email = "${email}", phone = "${phone}" WHERE id = "${id}"`
      db.run(query, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Student's updated`);
        }
      });
    });
    return 'update students'
  }
  
  removeData(id) {
    db.serialize(function() {
      let query = `DELETE FROM student WHERE id = ${id}`
      db.run(query, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Student's deleted`);
        }
      });
    });
    return 'delete students'
  }

  studentsList() {
    db.serialize(function() {
      let query = "SELECT * FROM student"
      db.all(query, (err,rows) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
    return 'All Data from list:'
  }

  nameList(name) {
    db.serialize(function() {
      let query = `SELECT * FROM student WHERE first_name like '%${name}%' OR last_name like '%${name}%'`
      db.all(query, (err,rows) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
    return `List Student:`
  }

  keyValueList(option, value) {
    db.serialize(function() {
      let query = `SELECT * FROM student WHERE UPPER(${option}) = UPPER("${value}")`
      db.all(query, (err,rows) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
    return 'sort by key value:'
  }
  
listByMonth() {
    db.serialize(function() {
      let query = `SELECT * FROM student WHERE strftime('%m', birthday) = strftime('%m', date('now'))`
      db.all(query, (err,rows) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
    return 'List student by month:'
  }

  sortedByBirthday() {
    db.serialize(function() {
      let query = `SELECT * FROM student ORDER BY strftime('%m%d', birthday) ASC`
      db.all(query, (err,rows) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
        }
      })
      
    })
    return 'Sorted by Birthday:'
  }
  
}

let student = new Student()
replServer.context.help = student.help;
replServer.context.addData = student.addData;
replServer.context.updateData = student.updateData;
replServer.context.removeData = student.removeData;
replServer.context.studentsList = student.studentsList;
replServer.context.nameList = student.nameList;
replServer.context.keyValueList = student.keyValueList;
replServer.context.listByMonth = student.listByMonth;
replServer.context.sortedByBirthday = student.sortedByBirthday;