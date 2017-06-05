"use strict"

//write your code here
const repl = require('repl')
const sqlite = require('sqlite3').verbose()
let file = 'student.db'
let db = new sqlite.Database(file)

function create() {
  let query = `create table IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT,first_name VARCHAR(100),last_name VARCHAR(100),` +
  `gender VARCHAR(10),birthdate DATE,email VARCHAR(100),phone VARCHAR);`
  db.run(query, err => {
    if (!err) console.log(`table created`);
    else {console.log(err);}
  })
}

function seed() {
  let query = `insert into students (first_name,last_name,gender,birthdate,email,phone) VALUES ('Rijal','Fitriadi','male','1995-11-01','fajar@gmail.com','088-99-777');`
  db.run(query, err => {
    if (!err) console.log('data successful added');
    else {console.log(err);}
  })
}

function setup() {
  db.serialize(function () {
    create()
    seed()
  })
}

setup()