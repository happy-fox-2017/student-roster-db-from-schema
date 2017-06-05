"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let r = repl.start({
  prompt: '>',
  input: process.stdin,
  output: process.stdout
});

var file = 'student.db';
var db = new sqlite.Database(file);
// write your code here
class Student{

  tambahData(first_name, last_name, gender, birthdate, email, phone){
    let tambah = `INSERT INTO student (first_name, last_name, gender, birth_date, email, phone) VALUES ('${first_name}','${last_name}','${gender}','${birthdate}','${email}','${phone}');`;
    db.serialize(() => {
      db.run(tambah, err => {
        (!err) ? console.log(`tambah data berhasil`) : console.log(err);
        // if (!err){
        //   console.log(`tambah data berhasil`);
        // }else{
        //   console.log(err);
        // }
      });
    });
  }
  
  editData(id, first_name, last_name, gender, birthday, email, phone){
    let edit = `UPDATE student SET first_name = '${first_name}', last_name = '${last_name}', gender = '${gender}', birth_date = '${birthdate}', email = '${email}', phone = '${phone}' where id = '${id}'`;
    db.serialize(() =>{
      db.run(edit, err => {
        (!err) ? console.log(`update data sukses`) : console.log(err);
          // if (!err){
          //   console.log(`update data sukses`);
          // }else{
          //   console.log(err);
          // }
      });
    });
  }
  
  hapusData(id){
    let hapus = `DELETE FROM student WHERE id = '${id}'`;
    db.serialize(() =>{
      db.run(hapus, err => {
        (!err) ? console.log(`hapus data dengan id: ${id} berhasil`) : console.log(err);
        // if(!err){
        //   console.log(`hapus data dengan id: ${id} berhasil`);
        // }else{
        //   console.log(err);
      });
    });
  }
  tampilAll(){
    let tampil = `SELECT * FROM student`;
    db.serialize(() =>{
      db.all(tampil, (err, data) =>{
        (!err) ? console.log(data): console.log(err);;
      });
    });
  }
  
  tampilNama(nama){
  let tampilAsName = `SELECT * FROM student where first_name like '%${nama}' or last_name like '%${nama}'`;
  db.serialize(() =>{
    db.all(tampilAsName, (err, data) =>{
      (!err) ? console.log(data): console.log(err);;
      });
    });
  }
  
  tampilAdv(att, value){
  let tampilAsAttribute = `SELECT * FROM student where ${att} = '${value}'`;
  db.serialize(() =>{
    db.all(tampilAsAttribute, (err, data) =>{
      (!err) ? console.log(data): console.log(err);;
      });
    });
  }
  
  tampilBirthday(){
  let tanggal = new Date();
  let bulan = tanggal.getMonth()+1; 
  // console.log(bulan);
  (bulan<10) ? bulan = '0'+bulan : bulan = bulan;
  let tampilThisMonthBirthday = `SELECT * FROM student where strftime('%m', birth_date) = '${bulan}'`;
  // let tampilAsAttribute = `SELECT * FROM student where ${att} = '${value}'`;
  db.serialize(() =>{
    db.all(tampilThisMonthBirthday, (err, data) =>{
      (!err) ? console.log(data): console.log(err);
      });
    });
  }
  
  tampilStudentAsBirthday(){
  let tanggal = new Date();
  let bulan = tanggal.getMonth()+1; 
  // console.log(bulan);
  (bulan<10) ? bulan = '0'+bulan : bulan = bulan;
  let tampilBirthdayAll = `SELECT id, first_name, last_name, gender, email, phone, strftime('%d', birth_date) as Date, strftime('%m', birth_date) as Month FROM student ORDER BY Month asc`;
  // let tampilAsAttribute = `SELECT * FROM student where ${att} = '${value}'`;
  db.serialize(() =>{
    db.all(tampilBirthdayAll, (err, data) =>{
      (!err) ? console.log(data): console.log(err);
      });
    });
  }
  
  help(){
    console.log('==================================== help me =====================================');
    console.log('[1]. student.tambahData(first_name, last_name, gender, birth_date, email, phone)');
    console.log('[2]. student.editData(id, first_name, last_name, gender, birth_date, email, phone)');
    console.log('[3]. student.hapusData(id) <-- menghapus student');
    console.log('[4]. student.tampilAll() <-- tampilkan semua student');
    console.log('[5]. student.tampilNama(name) <-- tampilkan smua student yang memiliki name tertentu');
    console.log('[6]. student.tampilAdv(att,value) <-- tampilkan daftar smua student dengan attribute tertentu');
    console.log('[7]. student.tampilBirthday() <-- tampilkan student yang ultah hari ini');
    console.log('[8]. student.tampilBirthdayAll() <-- tampilkan daftar student berdasarkan birthday nya asc');
  }

}

let murid = new Student();

r.context.student = murid;
