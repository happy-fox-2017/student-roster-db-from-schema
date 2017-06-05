"use strict"

//write your code here

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const r = repl.start('> ');

var file = 'student.db';
var db = new sqlite.Database(file);

var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), gender VARCHAR(25), birth_date DATE, email VARCHAR(100), phone VARCHAR);";

var SEED_DATA = "INSERT INTO student (first_name, last_name, gender, birth_date, email, phone ) VALUES ('Rizqi','Agna Sari', 'female','1996-03-23', 'rizqi123@gmail.com','0888111222'),('Azidah','Aini','female','2000-09-10','zizid@yahoo.co.id','08999444333');";

var SHOW_TABLE = "SELECT * FROM student;";

//Create TABLE

let createTable = () => {
  //run SQL one at a time
  db.serialize(()=>{
    
    db.run(CREATE_TABLE, err =>{
      if (err){
        console.log(err);
      }else{
        console.log('Create table success!');
      }
    });  
  });
}

let seedData = () =>{  
  db.serialize( () => {
    db.run(SEED_DATA, err =>{
    //  data.forEach(function 
        if (err){
          console.log(err);
        }else{
          console.log('input data success!');
        }
      // );
    }); 
  });  
}


let showTable = () => {
  db.serialize( () => {
    db.all(SHOW_TABLE, (err, data) =>{

      if (!err){
        console.log(data);
      }else{
        console.log(err);
      }
    });
  });
}

r.context.createTable = createTable;
r.context.inputData = seedData;
r.context.showTable = showTable;
