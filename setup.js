'use strict'

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();

const file = 'student.db';
const db = new sqlite3.Database(file);

const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS student
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstname TEXT NOT NULL,
      lastname TEXT,
      birthdate DATE
    )`;

const SEED_DATA = `
  INSERT INTO student (firstname, lastname, birthdate) VALUES
    ('Rubi', 'Henjaya', '1986-11-20'),
    ('Riza', 'Fahmi', '1983-12-3')
`;

const createTable = () => {
  db.serialize(() => {
    db.run(CREATE_TABLE, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Table created.');
      }
    });
  });
};

const seedData = () => {
  db.serialize(() => {
    db.run(SEED_DATA, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Data created.');
      }
    });
  });
};

const replStart = repl.start('> ');
replStart.context.createTable = createTable;
replStart.context.seedData = seedData;
