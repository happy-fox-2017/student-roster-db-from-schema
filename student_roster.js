'use strict'

const sqlite = require('sqlite3').verbose();

const FILE_NAME = 'student.db';
const db = new sqlite.Database(FILE_NAME);

const INSERT_STUDENT_SQL = 'INSERT INTO student VALUES (null, ?, ?, ?)';
const ALL_STUDENT_SQL = 'SELECT * FROM student';
const SORT_BY_BIRTHDATE_SQL = 'SELECT * FROM student ORDER BY substr(birthdate, 6, 2), substr(birthdate, 9, 2)';
const FIND_BY_NAME_SQL = 'SELECT * FROM student WHERE first_name LIKE ? OR last_name LIKE ?';
const FIND_BY_ATTRIBUTE_SQL = 'SELECT * FROM student';
const FIND_BY_BIRTHDAY_SQL = 'SELECT * FROM student WHERE substr(birthdate, 6, 2) = ? ';
const UPDATE_STUDENT_SQL = 'UPDATE student SET first_name = ?, last_name = ?, birthdate = ? WHERE id = ?';
const DELETE_STUDENT_SQL = 'DELETE FROM student WHERE id = ?';

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

  static findAll(callback) {
    db.all(ALL_STUDENT_SQL,
      (err, rows) => {
        if (!err) {
          callback(rows, null);
        } else {
          callback(null, err);
        }
      });
  }

  static findByName(name, callback) {
    const nameFilter = name ? `%${name}%` : '%%';
    db.all(FIND_BY_NAME_SQL,
      [nameFilter],
      (err, rows) => {
        if (!err) {
          callback(rows, null);
        } else {
          callback(null, err);
        }
      });
  }

  static findByAttribute(attrName, attrValue, callback) {
    const findByAttributeSql = `${FIND_BY_ATTRIBUTE_SQL} WHERE ${attrName} = ?`;
    db.all(findByAttributeSql,
      [attrValue],
      (err, rows) => {
        if (!err) {
          callback(rows, null);
        } else {
          callback(null, err);
        }
      });
  }

  static findHavingBirthdayByMonth(month, callback) {
    let monthStr = month.toString();
    if (monthStr.length < 2) monthStr = `0${monthStr}`;
    db.all(FIND_BY_BIRTHDAY_SQL,
      [monthStr],
      (err, rows) => {
        if (!err) {
          callback(rows, null);
        } else {
          callback(null, err);
        }
      });
  }

  static sortByBirthDate(callback) {
    db.all(SORT_BY_BIRTHDATE_SQL,
      (err, rows) => {
        if (!err) {
          callback(rows, null);
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

  static deleteStudent(id, callback) {
    db.run(DELETE_STUDENT_SQL, [id],
      function afterDelete(err) {
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

