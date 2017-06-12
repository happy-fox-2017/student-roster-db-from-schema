"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = 'student.db';
let db = new sqlite.Database(file);

let CREATE_TABLE = 'CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, gender TEXT, birthdate DATE, email TEXT, phone TEXT)';
let SEED_DATA = `INSERT INTO student (firstname, lastname, gender, birthdate, email, phone) VALUES ('Rubi', 'Henjaya', 'laki-laki', '1986-11-20', 'r.henjaya@mail.com', '0889123476'), ('Riza', 'Fahmi', 'laki-laki', '1983-12-31', 'riza.f@mailer.com', '0997354782');`;

let createTable = () => {
  db.serialize(function() {
    db.run(CREATE_TABLE, function(err) {
      if (!err) {
        console.log('Create new table');
      } else {
        console.log(err);
      }
    })
  })
}

let seedData = () => {
  db.serialize(function() {
    db.run(SEED_DATA, function(err) {
      if (!err) {
        console.log('Data inserted');
      } else {
        console.log(err);
      }
    })
  })
}


createTable();
seedData();
