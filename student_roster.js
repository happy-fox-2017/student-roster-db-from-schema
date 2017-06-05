"use strict"
//const repl = require('repl');
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
var Table = require('cli-table');

var tableStudents = new Table({
    head: ['No','First Name','Last Name ','Gender','Birthday','Email','Phone']
    , colWidths: [5, 12,12,12,12,20,15]
});
// write your code here
var file = 'students.db';
var db = new sqlite.Database(file);

class Student {
  constructor() {
  }

   addData(first_name,last_name,gender,birthday,email,phone) {
    let queryAdd = `INSERT INTO students (first_name,last_name,gender,birthday,email,phone) VALUES ('${first_name}' ,'${last_name}','${gender}', '${birthday}', '${email}', '${phone}')`;
      db.serialize( function() {
        db.run(queryAdd , (err) => {
          if(err) {
            console.log(err);
          } else{
            console.log("Berhasil Menambahkan Data");
          }
        })
      })
   }

    updateData(id,first_name,last_name,gender,birthday,email,phone) {
     let queryUpdate = `UPDATE students SET first_name = '${first_name}' , last_name ='${last_name}', gender= '${gender}', birthday = '${birthday}', email= '${email}', phone = '${phone}' WHERE id = ${id}`;
      db.run(queryUpdate, (err) =>  {
        if(err) {
         console.log(err);
        } else {
         console.log('Update Data Berhasil');
        }
      })
    }

    removeData(id) {
     let queryRemove = `DELETE  FROM students WHERE id = ${id}`
      db.run(queryRemove, (err) => {
        if(err) {
          console.log(err);
        } else {
          console.log("Hapus Data berhasil");
        }
      })
    }

    showAll(id,first_name,last_name,gender,birthday,email,phone) {
     let queryAll = 'SELECT * from students';
      db.all(queryAll, (err,data) => {
        if(!err) {
         data.forEach(d  => {
           //console.log(`${d.id} ${d.first_name} ${d.last_name} ${d.gender} ${d.birthday} ${d.email} ${d.phone}`);
           tableStudents.push([d.id,d.first_name,d.last_name,d.gender,d.birthday,d.email,d.phone])
         })
           console.log("\n============= MENAMPILKAN SEMUA DATA =================");
           console.log(tableStudents.toString());
           tableStudents.length = 0;
        } else {
          console.log(err);
        }
      })
    }

    searchByName(name) {
     let querySearch = `SELECT * FROM students WHERE first_name LIKE '%${name}%' or last_name LIKE '%${name}%'`;
      db.all(querySearch, (err,data) => {
        if(!err) {
         data.forEach(d => {
           //console.log(`{d.id} ${d.first_name} ${d.last_name} ${d.gender} ${d.birthday} ${d.email} ${d.phone} `);
          tableStudents.push([d.id,d.first_name,d.last_name,d.gender,d.birthday,d.email,d.phone])
         })
           console.log("\n============ MENAMPILKAN DATA BERDASARKAN NAME ===========");
           console.log(tableStudents.toString());
           tableStudents.length = 0;
        } else {
         console.log(err);
        }
      })
    }

    searchByAttribute(attribute,value) {
     let queryAttribute = `SELECT * FROM students WHERE ${attribute} = '${value}'`;
      db.all(queryAttribute, (err,data) => {
        if(!err) {
         data.forEach(d => {
          //console.log(` ${d.first_name} ${d.last_name} ${d.gender} ${d.birthday} ${d.email} ${d.phone} `);
          tableStudents.push([d.id,d.first_name,d.last_name,d.gender,d.birthday,d.email,d.phone])
         })
           console.log("\n========= MENAMPILKAN DATA BERDASARKAN PENCARIAN ATTRIBUTE =======");
           console.log(tableStudents.toString());
           tableStudents.length = 0;
         } else {
          console.log(err);
        }
      })
    }

    showBirthday() {
      let queryBirthday = `SELECT * FROM students WHERE strftime('%m', birthday) = strftime('%m', date('now'))`;
        db.all(queryBirthday, (err,data) => {
          if(!err) {
            data.forEach(d => {
              //console.log(`${d.first_name} ${d.last_name} ${d.gender} ${d.birthday} ${d.email} ${d.phone}`);
              tableStudents.push([d.id,d.first_name,d.last_name,d.gender,d.birthday,d.email,d.phone])
            })
              console.log("\n=========== MENAMPILKAN BIRTHDAY BULAN INI ===========");
              console.log(tableStudents.toString());
              tableStudents.length = 0;
          } else {
            console.log('Tidak Ada Students Yang Berulang Tahun Bulan Ini',err);
          }
        })
    }

    sortBirthday() {
      let query = `SELECT * FROM students ORDER BY strftime('%m%d', birthday) ASC`;
        db.all(query, (err,data) => {
          if(!err) {
            data.forEach(d => {
              //console.log(`${d.first_name} ${d.last_name} ${d.gender} ${d.birthday} ${d.email} ${d.phone}`);
              tableStudents.push([d.id,d.first_name,d.last_name,d.gender,d.birthday,d.email,d.phone])
            })
            console.log("========= INI MERUPAKAN LIST ASCENDING BIRTHDAY ========");
            console.log(tableStudents.toString());
            tableStudents.length = 0;
          } else {
            console.log(err);
          }
        })
    }

    help() {
      console.log("\n---------------------------------------------------------------------------------------------------------------------");
      console.log("========================================-MENU HELP-====================================================================");
      console.log("-----------------------------------------------------------------------------------------------------------------------");
      console.log("Adding new student record                        => addData(first_name, last_name, gender, birthday, email, phone) ");
      console.log("Update record by ID                              => updateData(id, first_name, last_name, gender, birthday, email, phone) ");
      console.log("Delete record by ID                              => removeData(id) ");
      console.log("Showing all records                              => showAll() ");
      console.log("Showing all records that have certain name       =>  searchByName(name) ");
      console.log("Showing all records based on attribute and value => searchByName(name) ");
      console.log("Showing this month student birthdate record      => showBirthday() ");
      console.log("Showing all records order by birthdate           => sortBirthday()");

    }
}

var replServer = repl.start('>');
let students = new Student()
replServer.context.addData = students.addData;
replServer.context.updateData = students.updateData;
replServer.context.showAll = students.showAll;
replServer.context.removeData = students.removeData;
replServer.context.searchByName = students.searchByName;
replServer.context.searchByAttribute = students.searchByAttribute;
replServer.context.showBirthday = students.showBirthday;
replServer.context.sortBirthday = students.sortBirthday;
replServer.context.help = students.help;
