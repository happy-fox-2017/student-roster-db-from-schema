"use strict"

//write your code here

const repl = require('repl')
const sqlite = require('sqlite3').verbose()

var file = 'student.db'
var db = new sqlite.Database(file)
let replStart = repl.start({
  prompt: 'OHAI>',
  input: process.stdin,
  output:process.stdout
})

var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), gender VARCHAR(25), birthdate DATE, email VARCHAR(100), phone VARCHAR)";
var SEED_DATA = "INSERT INTO student (first_name, last_name, gender, birthdate, email, phone) VALUES ('Tito', 'Ghonim', 'laki-laki', '1988-07-20', 'tghonim@gmail.com', '081234567891'), ('Nur', 'Fatimah', 'perempuan', '1990-12-02', 'nfatimah@yahoo.com', '081234567892');";

let createTable = () => {
  db.serialize(function() {
    db.run(CREATE_TABLE, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE_TABLE');
      }
    })
  })
}

let seedData = () => {
    db.run(SEED_DATA, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('SEED_DATA');
        }
      })
}

    replStart.context.createTable = createTable
    replStart.context.seedData = seedData
