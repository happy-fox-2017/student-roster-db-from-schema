const Student = require('../student_roster').Student;

const should = require('chai').should();

const STUDENT = {
  firstName: 'student1FirstName',
  lastName: 'student1LastName',
  birthdate: '1986-11-20',
};

describe('Student', function() {
  describe('#create()', function() {
    it('should create student without any error', function (done) {
      Student.createStudent(
        STUDENT.firstName,
        STUDENT.lastName,
        STUDENT.birthdate,
        (err) => {
          should.not.exist(err);
          done();
        });
    });
  });
});
