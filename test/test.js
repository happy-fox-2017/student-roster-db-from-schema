const should = require('chai').should();
const sqlite = require('sqlite3').verbose();

const Student = require('../student_roster').Student;

const FILE_NAME = 'student.db';
const db = new sqlite.Database(FILE_NAME);

const STUDENT = {
  firstName: 'student1FirstName',
  lastName: 'student1LastName',
  birthdate: '1986-11-20',
};

const DELETE_STUDENT_TABLE_SQL = 'DELETE FROM student ';

describe('Student', function() {

  before(function (done) {
    db.run(DELETE_STUDENT_TABLE_SQL,
      (err) => {
        done(err);
      });
  })

  describe('#create()', function() {
    it('should create student without any error', function (done) {
      Student.createStudent(
        STUDENT.firstName,
        STUDENT.lastName,
        STUDENT.birthdate,
        (lastId, err) => {
          should.not.exist(err);
          done(err);
        });
    });
  });

  describe('#update()', function() {
    it('should change only 1 row', function (done) {
      Student.createStudent(
        STUDENT.firstName,
        STUDENT.lastName,
        STUDENT.birthdate,
        (lastId, err) => {
          if (!err) {
            Student.updateStudent(
              lastId,
              STUDENT.firstName,
              STUDENT.lastName,
              STUDENT.birthdate,
              (changes, updateErr) => {
                changes.should.equal(1);
                done(updateErr);
              });
          } else {
            done(err);
          }
        });
    });
  });
});
