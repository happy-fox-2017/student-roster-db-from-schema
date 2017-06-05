"use strict"
//const repl = require('repl');
const repl = require('repl');
const sqlite = require('sqlite3').verbose();

// write your code here
var file = 'students.db';
var db = new sqlite.Database(file);

//SQL Statement
var CREATE_TABLE ="CREATE TABLE IF NOT EXISTS students( id INTEGER PRIMARY KEY AUTOINCREMENT,first_name VARCHAR(100),last_name VARCHAR(100),gender VARCHAR(25),birthday DATE,email VARCHAR(100),phone VARCHAR(20))";
var SEED_DATA = "INSERT INTO students(first_name,last_name,gender,birthday,email,phone) VALUES ('Fikri','Iman','Pria','1986-11-20','fikri@gmail.com','08198097273'),('Riza','Fahmi','Pria','1983-12-3','riza@gmail.com','08969798965')";

//CREATE TABLE
 let createTable = () => {
   //Run SQLone at time
   db.serialize( function () {
     //create TABLE
     db.run(CREATE_TABLE, (err) => {
       if (err) {
         console.log(err);
       } else {
         console.log('CREATE TABLE SUCCESS');
       }
     })
   })
 }

 let seedData = () => {
   db.run(SEED_DATA, (err) => {
     if(err) {
       console.log(err);
     } else {
       console.log("Seed Data Berhasil");
     }
   })
 }

 const replServer = repl.start('>');
 replServer.context.createTable = createTable
 replServer.context.seedData = seedData
