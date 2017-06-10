'use strict'

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();

const file = 'student.db';
const db = new sqlite3.Database(file);

const CREATE_TABLE_DDL = `
  CREATE TABLE IF NOT EXISTS student
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT,
      birthdate DATE
    )`;

const SEED_DATA_SQL = `
  INSERT INTO student (first_name, last_name, birthdate) VALUES
    ('Rubi', 'Henjaya', '1986-11-20'),
    ('Riza', 'Fahmi', '1983-12-03')
`;

const createTable = (callback) => {
  db.run(CREATE_TABLE_DDL, (err) => {
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
  db.run(SEED_DATA_SQL, (err) => {
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

