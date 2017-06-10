'use strict'

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

const FILE_NAME = 'student.db';
const db = new sqlite.Database(FILE_NAME);

// write your code here
class Student {
  constructor(firstname, lastname, birthdate) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
  }
}

const addStudent = (firstname, lastname, birthdate) => {
  const ADD_STUDENT_SQL = 'INSERT INTO student VALUES (?, ?, ?)';
};

const initializeContext = (context) => {
  const student = new Student();
  context.student = student;
};


const initDatabase = () => {
  db.serialize(() => {
    const r = repl.start({ prompt: '> ' });
    initializeContext(r.context);
  });
};

initDatabase();
