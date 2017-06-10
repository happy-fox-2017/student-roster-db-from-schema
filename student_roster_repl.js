const repl = require('repl');

const Student = require('./student_roster').Student;

const createStudent = (firstName, lastName, birthdate) => {
  Student.createStudent(firstName, lastName, birthdate, () => {});
};

const findAll = () => {
  Student.findAll((students) => {
    console.log(students);
  });
};

const findByName = (name) => {
  Student.findByName(name, (students) => {
    console.log(students);
  });
};

const findByAttribute = (attrName, attrValue) => {
  Student.findByAttribute(attrName, attrValue, (students) => {
    console.log(students);
  });
};

const findHavingBirthdayByMonth = (month) => {
  Student.findHavingBirthdayByMonth(month, (students) => {
    console.log(students);
  });
};

const sortByBirthDate = () => {
  Student.sortByBirthDate((students) => {
    console.log(students);
  });
};

const updateStudent = (id, firstName, lastName, birthdate) => {
  Student.updateStudent(id, firstName, lastName, birthdate, () => {
    console.log('Student updated');
  });
};

const deleteStudent = (id) => {
  Student.deleteStudent(id, () => {
    console.log('Student deleted');
  });
};

const help = () => {
  console.log(`
    1. createStudent(firstName, lastName, birthdate)
    2. findAll()
    3. findByName(name)
    4. findByAttribute(attrName, attrValue)
    5. findHavingBirthdayByMonth(month)
    6. sortByBirthDate()
    7. updateStudent(id, firstName, lastName, birthdate)
    8. deleteStudent(id)
    9. help()
    `);
};

const initializeContext = (context) => {
  context.createStudent = createStudent;
  context.findAll = findAll;
  context.findByName = findByName;
  context.findByAttribute = findByAttribute;
  context.findHavingBirthdayByMonth = findHavingBirthdayByMonth;
  context.sortByBirthDate = sortByBirthDate;
  context.updateStudent = updateStudent;
  context.deleteStudent = deleteStudent;
  context.help = help;
};

const r = repl.start({ prompt: '> ' });
initializeContext(r.context);
