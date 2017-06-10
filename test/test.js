const should = require('chai').should();
const sqlite = require('sqlite3').verbose();

const Student = require('../student_roster').Student;

const FILE_NAME = 'student.db';
const db = new sqlite.Database(FILE_NAME);

const STUDENT1 = {
  firstName: 'student1FirstName',
  lastName: 'student1LastName',
  birthdate: '1986-06-20',
};

const STUDENT2 = {
  firstName: 'student2FirstName',
  lastName: 'student2LastName',
  birthdate: '1987-06-21',
};

const DELETE_STUDENT_TABLE_SQL = 'DELETE FROM student ';

describe('Student', function() {

  describe('#create()', function() {
    it('should create student without any error', function (done) {
      Student.createStudent(
        STUDENT1.firstName,
        STUDENT1.lastName,
        STUDENT1.birthdate,
        (lastId, err) => {
          should.not.exist(err);
          done(err);
        });
    });
  });

  describe('#findAll()', function () {

    before(function (done) {
      db.run(DELETE_STUDENT_TABLE_SQL,
        (err) => {
          Student.createStudent(
            STUDENT1.firstName,
            STUDENT1.lastName,
            STUDENT1.birthdate,
            (lastId, err1) => {
              Student.createStudent(
                STUDENT2.firstName,
                STUDENT2.lastName,
                STUDENT2.birthdate,
                (lastId2, err2) => {
                  done(err2);
                });
            });
        });
    });

    it('should get all students', function (done) {
      Student.findAll(
        (students, err) => {
          if (!err) {
            students.should.have.lengthOf(2);
            done();
          } else {
            done(err);
          }
        });
    });
  });

  describe('#findByName()', function () {

    before(function (done) {
      db.run(DELETE_STUDENT_TABLE_SQL,
        (err) => {
          Student.createStudent(
            STUDENT1.firstName,
            STUDENT1.lastName,
            STUDENT1.birthdate,
            (lastId, err1) => {
              Student.createStudent(
                STUDENT2.firstName,
                STUDENT2.lastName,
                STUDENT2.birthdate,
                (lastId2, err2) => {
                  done(err2);
                });
            });
        });
    });

    it('should get students by given name', function (done) {
      Student.findByName(STUDENT1.firstName.substring(0, 4),
        (students, err) => {
          if (!err) {
            students.should.have.lengthOf(2);
            done();
          } else {
            done(err);
          }
        });
    });
  });

  describe('#findByAttribute()', function () {

    before(function (done) {
      db.run(DELETE_STUDENT_TABLE_SQL,
        (err) => {
          Student.createStudent(
            STUDENT1.firstName,
            STUDENT1.lastName,
            STUDENT1.birthdate,
            (lastId, err1) => {
              Student.createStudent(
                STUDENT2.firstName,
                STUDENT2.lastName,
                STUDENT2.birthdate,
                (lastId2, err2) => {
                  done(err2);
                });
            });
        });
    });

    it('should get students by given attribute and value', function (done) {
      Student.findByAttribute('first_name', STUDENT1.firstName,
        (students, err) => {
          if (!err) {
            students.should.have.lengthOf(1);
            done();
          } else {
            done(err);
          }
        });
    });
  });

  describe('#findHavingBirthdayByMonth()', function () {

    before(function (done) {
      db.run(DELETE_STUDENT_TABLE_SQL,
        (err) => {
          Student.createStudent(
            STUDENT1.firstName,
            STUDENT1.lastName,
            STUDENT1.birthdate,
            (lastId, err1) => {
              Student.createStudent(
                STUDENT2.firstName,
                STUDENT2.lastName,
                STUDENT2.birthdate,
                (lastId2, err2) => {
                  done(err2);
                });
            });
        });
    });

    it('should get students having birthday by given month', function (done) {
      Student.findHavingBirthdayByMonth(6,
        (students, err) => {
          if (!err) {
            students.should.have.lengthOf(2);
            done();
          } else {
            done(err);
          }
        });
    });
  });

  describe('#sortByBirthDate()', function () {

    before(function (done) {
      db.run(DELETE_STUDENT_TABLE_SQL,
        (err) => {
          Student.createStudent(
            STUDENT1.firstName,
            STUDENT1.lastName,
            STUDENT1.birthdate,
            (lastId, err1) => {
              Student.createStudent(
                STUDENT2.firstName,
                STUDENT2.lastName,
                STUDENT2.birthdate,
                (lastId2, err2) => {
                  done(err2);
                });
            });
        });
    });

    it('should get all students sort by birthdate', function (done) {
      Student.sortByBirthDate(
        (students, err) => {
          if (!err) {
            const student1 = students[0];
            student1.first_name.should.equal(STUDENT1.firstName);
            done();
          } else {
            done(err);
          }
        });
    });
  });

  describe('#update()', function() {

    before(function (done) {
      db.run(DELETE_STUDENT_TABLE_SQL,
        (err) => {
          done(err);
        });
    });

    it('should change only 1 row', function (done) {
      Student.createStudent(
        STUDENT1.firstName,
        STUDENT1.lastName,
        STUDENT1.birthdate,
        (lastId, err) => {
          if (!err) {
            Student.updateStudent(
              lastId,
              STUDENT1.firstName,
              STUDENT1.lastName,
              STUDENT1.birthdate,
              (changes, updateErr) => {
                if (!updateErr) {
                  changes.should.equal(1);
                  done();
                } else {
                  done(updateErr);
                }
              });
          } else {
            done(err);
          }
        });
    });
  });

  describe('#delete()', function () {
    before(function (done) {
      db.run(DELETE_STUDENT_TABLE_SQL,
        (err) => {
          done(err);
        });
    });

    it('should delete only 1 row', function (done) {
      Student.createStudent(
        STUDENT1.firstName,
        STUDENT1.lastName,
        STUDENT1.birthdate,
        (lastId, err) => {
          if (!err) {
            Student.deleteStudent(
              lastId,
              (changes, deleteErr) => {
                if (!deleteErr) {
                  changes.should.equal(1);
                  done();
                } else {
                  done(deleteErr);
                }
              });
          } else {
            done(err);
          }
        });
    });
  });
});
