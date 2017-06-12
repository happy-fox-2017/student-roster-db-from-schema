"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = 'student.db'
let db = new sqlite.Database(file)

const table = require('cli-table2');
var colors = require('./node_modules/colors/safe');


class Student {
  constructor(){}
  
  static addStudent(firstname, lastname, gender, birthdate, email, phone) {
    db.serialize(function() {
      let addStudentTable = new table({head: ['Nama Depan', 'Nama belakang', 'J. Kelamin', 'Tanggal lahir', 'e-mail', 'Telepon']});
      let TAMBAH_MURID = `INSERT INTO student (firstname, lastname, gender, birthdate, email, phone) VALUES ('${firstname}', '${lastname}', '${gender}', '${birthdate}', '${email}', '${phone}');`;
      db.run(TAMBAH_MURID, function(err) {
        if (!err) {
          addStudentTable.push([`${firstname}`, `${lastname}`, `${gender}`, `${birthdate}`, `${email}`, `${phone}`]);
          console.log('Berhasil menambah murid baru');
          console.log('\n' + addStudentTable.toString());
        } else {
          console.log(err);
        }
      })
    })
  }
  
  static updateFname(id, fname) {
    db.serialize(function() {
      let UPDATE_NAMADEPAN = `UPDATE STUDENT SET firstname = '${fname}' WHERE id = '${id}';`;
      db.run(UPDATE_NAMADEPAN, function(err) {
        if (!err) {
          console.log(`Nama depan murid dengan ID ${id} berhasil diupdate`);
        } else {
          console.log(err);
        }
      })
    })
  }
  
  static updateStudent(id, attribute, newValue) {
  let UPDATE_DATA = `UPDATE student SET ${attribute} ='${newValue}' WHERE id = ${id};`;
  db.run(UPDATE_DATA, function(err) {
    if (!err) {
      console.log(`Data murid dengan ID ${id} berhasil diperbarui.`);
    } else {
      console.log(err);
    }
  })
}
  
  static deleteStudent(id) {
    db.serialize(function() {
      let HAPUS_MURID = `DELETE FROM student WHERE id = '${id}';`;
      db.run(HAPUS_MURID, function(err) {
        if (!err) {
          console.log(`Murid dengan id ${id} berhasil dihapus`);
        } else {
          console.log(err);
        }
      })
    })
  }
  
  static viewAll() {
    db.serialize(function() {
      let viewAllTable = new table({head: ['Id', 'Nama Depan', 'Nama belakang', 'J. Kelamin', 'Tanggal lahir', 'e-mail', 'Telepon']});
      let LIHAT_SEMUA = `SELECT * FROM student;`;
      db.all(LIHAT_SEMUA, function(err, data) {
        if (!err) {
          data.forEach(data => {
            viewAllTable.push([data.id, data.firstname, data.lastname, data.gender, data.birthdate, data.email, data.phone]);
          })
        } else {
          console.log(err);
        }
        console.log('\n' + viewAllTable.toString());
      })
    })
  }
  
  static viewByName(name) {
    let viewByNameTable = new table({head: ['Id', 'Nama Depan', 'Nama belakang', 'J. Kelamin', 'Tanggal lahir', 'e-mail', 'Telepon']});
    db.serialize(function() {
      let LIHAT_NAMA = `SELECT * FROM student WHERE firstname LIKE '%${name}%' OR lastname LIKE '%${name}%';`;
      db.all(LIHAT_NAMA, function(err, data) {
        if (!err && data.length) {
          data.forEach(data => {
            viewByNameTable.push([data.id, data.firstname, data.lastname, data.gender, data.birthdate, data.email, data.phone]);
          })
          console.log('\n' + viewByNameTable.toString());
        } else if (!err && !data.length) {
          console.log('Pencarian tidak ditemukan.');
        } else {
          console.log(err);
        }
      })
    })
  }
  
  static bdThisMonth() {
    let bdThisMonthTable = new table({head: ['Id', 'Nama Depan', 'Nama belakang']});
    db.serialize(function() {
      let ULTAH_BLN_INI = `SELECT * FROM student WHERE strftime('%m', 'now') = strftime('%m', student.birthdate);`;
      console.log('Yang berulang tahun bulan ini:');
      db.all(ULTAH_BLN_INI, function(err, data) {
        if (!err && data.length) {
          data.forEach(data => {
            bdThisMonthTable.push([data.id, data.firstname, data.lastname]);
          })
          console.log('\n' + bdThisMonthTable.toString());
        } else if (!err && !data.length) {
          console.log('Tidak ada yang berulang tahun di bulan ini');
        } else {
          console.log(err);
        }
      })
    })
  }


  static sortByBday() {
    let sortByBdayTable = new table({head: ['Id', 'Nama Depan', 'Nama belakang', 'Bulan', 'Tanggal']});
    db.serialize(function() {
      let URUTAN_ULTAH = `SELECT id, firstname, lastname, strftime('%d', birthdate) as hari, strftime('%m', birthdate) as bulan FROM student ORDER BY bulan ASC;`;
      db.all(URUTAN_ULTAH, function(err, data) {
        if (!err) {
          data.forEach(data => {
            sortByBdayTable.push([data.id, data.firstname, data.lastname, data.bulan, data.hari])
          })
          console.log('\n' + sortByBdayTable.toString());
        } else {
          console.log(err);
        }
      })
    })
  }

  static help() {
    console.log(`
    ┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
    │                                                    H E L P                                                 │
    ├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
    │> addStudent                                                                                                │
    │    Menambah entry murid baru.                                                                              │
    │    >addStudent(nama_depan, nama_belakang, j_kelamin, tempat_tanggal_lahir (yyyy-mm-dd), email, no_telepon) │
    │                                                                                                            │
    │> updateFname                                                                                               │
    │    Update nama depan murid.                                                                                │
    │    >update(id, nama_depan_baru)                                                                            │
    │                                                                                                            │
    │> updateStudent                                                                                             │
    │    Update data murid, berdasarkan kolom yang ingin dirubah. Kolom yang dapat dirubah:                      │
    │    [firstname, lastname, gender, email, birthdate, phone]                                                  │
    │    >updateStudent(id, nama_kolom, data_baru)                                                               │
    │                                                                                                            │
    │> deleteStudent                                                                                             │
    │    Menghapus entry murid.                                                                                  │
    │    >deleteStudent(no_id_murid)                                                                             │
    │                                                                                                            │
    │> viewAll                                                                                                   │
    │    Melihat data seluruh murid.                                                                             │
    │    >viewAll()                                                                                              │
    │                                                                                                            │
    │> viewByName                                                                                                │
    │    Melihat data murid berdasarkan nama murid. Nama depan atau belakang (masukkan salah satu).              │
    │    >viewByName(nama_murid)                                                                                 │
    │                                                                                                            │
    │> bdThisMonth                                                                                               │
    │    Melihat siapa saja murid yang berulang-tahun pada bulan ini.                                            │
    │    >bdThisMonth()                                                                                          │
    │                                                                                                            │
    │> sortByBday                                                                                                │
    │    Menampilkan nama seluruh murid beserta tanggal ulang tahun masing-masing.                               │
    │    Diurutkan berdasarkan tanggal dan bulannya.                                                             │
    │    >sortByBday()                                                                                           │
    │                                                                                                            │
    │> help()                                                                                                    │
    │    Menampilkan help menu.                                                                                  │
    └────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
    `);
    
    
  }
  
} // ------- end of Student

const r = repl.start(">>  ");
r.context.addStudent = Student.addStudent;
r.context.updateStudent = Student.updateStudent;
r.context.deleteStudent = Student.deleteStudent;
r.context.viewAll = Student.viewAll;
r.context.viewByName = Student.viewByName;
r.context.bdThisMonth = Student.bdThisMonth;
r.context.sortByBday = Student.sortByBday;
r.context.help = Student.help;