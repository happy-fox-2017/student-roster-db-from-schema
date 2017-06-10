'use strict'

const sqlite = require('sqlite3').verbose();

const FILE_NAME = 'student.db';
const db = new sqlite.Database(FILE_NAME);

const INSERT_STUDENT_SQL = 'INSERT INTO student VALUES (null, ?, ?, ?)';
const UPDATE_STUDENT_SQL = 'UPDATE student SET first_name = ?, last_name = ?, birthdate = ? WHERE id = ? ';
const DELETE_STUDENT_SQL = 'DELETE FROM student WHERE id = ? ';

class Student {
  constructor(firstName, lastName, birthdate) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdate = birthdate;
  }

  static createStudent(firstName, lastName, birthdate, callback) {
    db.run(INSERT_STUDENT_SQL, [
      firstName,
      lastName,
      birthdate,
    ], function afterCreate(err) {
      if (!err) {
        callback(this.lastID, null);
      } else {
        callback(null, err);
      }
    });
  }

  static updateStudent(id, firstName, lastName, birthdate, callback) {
    db.run(UPDATE_STUDENT_SQL, [
      firstName,
      lastName,
      birthdate,
      id,
    ], function afterUpdate(err) {
      if (!err) {
        callback(this.changes, null);
      } else {
        callback(null, err);
      }
    });
  }
}

module.exports = {
  Student,
};

