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

const createTable = (callback) => {
  db.run(CREATE_TABLE, (err) => {
    if (err) {
      console.log(err);
      if (callback) callback(err);
    } else {
      console.log('Table created.');
      if (callback) callback();
    }
  });
};

const seedData = (callback) => {
  db.run(SEED_DATA, (err) => {
    if (err) {
      console.log(err);
      if (callback) callback(err);
    } else {
      console.log('Data loaded.');
      if (callback) callback();
    }
  });
};

const initializeContext = (context) => {
  context.createTable = createTable;
  context.seedData = seedData;
};

const r = repl.start({ prompt: '> ' });
initializeContext(r.context);

