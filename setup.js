"use strict"

//write your code here
const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db =  new sqlite.Database(file);
var r = repl.start('$repl>> ')

//SQL Statement
var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student ( id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), gender VARCHAR(25), birthday DATE, email VARCHAR(100), phone VARCHAR);";
var SEED_DATA = "INSERT INTO student (first_name, last_name, gender, birthday, email, phone) VALUES ('Adith', 'Pradipta', 'Male', '1992-09-20', 'adith@gmail.com', '080989999');";
var SHOW_TABLE = "SELECT * FROM student;";
//CREATE_TABLE
let createTable = () => {
  // Run SQL one at a time
  db.serialize(function() {
    // Create table 
    db.run(CREATE_TABLE, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('TABLE CREATED');
      }
    });
  });
}

// SEED_DATA
let seedData = () => {
  // Run SQL one at a time
  db.serialize(function() {
    // Seed data
    db.run(SEED_DATA, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('DATA SEEDED');
      }
    });
  });
}

// SHOW_TABLE
let showTable = () => {
  db.serialize(function() {
    db.all(SHOW_TABLE, function(err, data) {
      if (!err) {
        console.log(data);
      } else {
        console.log(err);
      }
    });
  });
}

r.context.createTable = createTable
r.context.seedData = seedData
r.context.showTable = showTable