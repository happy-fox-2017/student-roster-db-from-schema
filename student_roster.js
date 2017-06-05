"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('student.db');
const Table = require('cli-table2');
// write your code here
class Student{
  
  addData(firstname,lastname,gender,birthday,email,phone){
    let queryAdd = `INSERT INTO student (first_name,last_name,gender,birthday,email,phone) VALUES ('${firstname}','${lastname}','${gender}','${birthday}', '${email}', '${phone}');`;  
    db.run(queryAdd, (err) =>{
      if (!err) {
        console.log(`Inserted 1 Rows`);
      } else {
        console.log(err);
      }
    })
  }
  
  updateData(firstname,lastname,gender,birthday,email,phone,id){
    let queryUpdate = `UPDATE student SET first_name = '${firstname}', last_name = '${lastname}', gender = '${gender}', birthday = '${birthday}', email = '${email}', phone = '${phone}' WHERE id = ${+id}`
    db.run(queryUpdate, (err) =>{
      if (!err) {
        console.log(`Update 1 Rows`);
      } else {
        console.log(err);
      }
    })
  }
  
  deleteData(id){
    let queryDelete = `DELETE FROM student WHERE id = ${+id}`
    db.run(queryDelete, (err) => {
      if (!err) {
        console.log(`Delete 1 Rows`);
      } else {
        console.log(err);
      }
    })
  }
  
  showAllData(){
    let queryAll = `Select * from student`;
    db.all(queryAll, (err,rows) => {
      if(!err){
        console.log(rows);
      } else {
        console.log(err);
      }
    })
  }
  
  showDataFilterbyName(Name){
    let queryFilterbyName = `Select * From student where first_name like '%${Name}%' or last_name like '%${Name}%'`
    db.all(queryFilterbyName, (err,rows) =>{
      if (!err) {
        console.log(rows);
      } else {
        console.log(err);
      }
    })
  }
  
  showFilterAll(attributes, value){
    let queryFilterAll = `Select * From student where ${attributes} like '${value}'`
    db.all(queryFilterAll, (err,rows) =>{
      if (!err) {
        console.log(rows);
      } else {
        console.log(err);
      }
    })
  }
  
  showBirthdayThisMonth(){
    let FullDate = new Date();
    let getMonth = FullDate.getMonth()+1;
    let queryThisMonth = `Select id, first_name, last_name, gender, birthday, email, phone From student Where strftime('%m', birthday) = '${"0"+getMonth}'`;
    db.all(queryThisMonth, (err,rows) =>{
      if (!err) {
        console.log(rows);
      } else {
        console.log(err);
      }
    })
  }
  
  showSortingThisMonth(){
    let querySortingMonth = `SELECT id, first_name, last_name,gender,email,phone,strftime('%d',birthday) as Date, strftime('%m', birthday) as Month FROM student order by Month asc`;
    db.all(querySortingMonth, (err,rows) => {
      if (!err) {
        console.log(rows);
      } else {
        console.log(err);
      }
    })
  }
  
  help(){
    var table = new Table({
      head:["No","Description","Syntax"],
      colWidths:[10,30,70]
    });
    
    table.push(
      ['1','Add Data Student', 'addData(firstname,lastname,gender,birthday,email,phone)'],
      ['2','Update Data Student','updateData(firstname,lastname,gender,birthday,email,phone,id)'],
      ['3','Delete Data Student', 'deleteData(id)'],
      ['4','Show All Data', 'showAllData'],
      ['5','Show Data Filter by Name', 'showDataFilterbyName(name)'],
      ['6','Show Filter can any Parameter','showFilterAll(Parameter,Value)'],
      ['7','Show Birthday This Month','showBirthdayThisMonth()'],
      ['8','Show Sorting This Month','showSortingThisMonth()']
    );
    
    console.log(table.toString());
  }
  
}

let mahasiswa = new Student();

const r = repl.start("> ");
r.context.addData = mahasiswa.addData;
r.context.updateData = mahasiswa.updateData;
r.context.deleteData = mahasiswa.deleteData;
r.context.showAllData = mahasiswa.showAllData;
r.context.showDataFilterbyName = mahasiswa.showDataFilterbyName;
r.context.showFilterAll = mahasiswa.showFilterAll;
r.context.showBirthdayThisMonth = mahasiswa.showBirthdayThisMonth;
r.context.showSortingThisMonth = mahasiswa.showSortingThisMonth;
r.context.help = mahasiswa.help;