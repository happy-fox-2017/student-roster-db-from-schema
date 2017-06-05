"use strict"
const repl = require("repl");
const sqlite = require("sqlite3").verbose();

var file = "student.db";
var db = new sqlite.Database(file);

var queryCreateTable = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), gender VARCHAR(25), birthday DATE, email VARCHAR(100), phone VARCHAR);";

var querySeedingData = "INSERT INTO student (first_name,last_name,gender,birthday,email,phone) VALUES ('ANTONI','ANGGA','LAKI-LAKI','1995-04-15','antoniangga14@gmail.com','081294373359'), ('ADE','NUGRAHA','LAKI-LAKI','1993-04-15','adenugraha@gmail.com','081212121212'), ('ADE','NUGRAHA','LAKI-LAKI','1993-06-15','adenugraha@gmail.com','081212121212');";

let createTable = () =>{
  db.serialize(() =>{
    db.run(queryCreateTable, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Table Create Success");
      }
    })
  })
}

let SeedData = () =>{
  db.run(querySeedingData, function(err) {
    if (!err) {
      console.log("Table Seeding Success");
    } else {
      console.log(err);
    }
  })
}

let r = repl.start("> ");
r.context.createTable = createTable;
r.context.SeedData = SeedData;