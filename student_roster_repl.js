const repl = require('repl');

const StudentRoaster = require('./student_roster');

const createStudent = (firstName, lastName, birthdate) => {
  StudentRoaster.createStudent(firstName, lastName, birthdate);
};

const initializeContext = (context) => {
  context.createStudent = createStudent;
};

const r = repl.start({ prompt: '> ' });
initializeContext(r.context);
