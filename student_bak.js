"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = 'student.db'
let db = new sqlite.Database(file)

class Student {
  constructor(){}
  
  static addStudent(firstname, lastname, gender, dob, email, phone) {
    db.serialize(function() {
      let TAMBAH_MURID = `INSERT INTO student (firstname, lastname, gender, birthdate, email, phone) VALUES ('${firstname}', '${lastname}', '${gender}', '${dob}', '${email}', '${phone}');`;
      db.run(TAMBAH_MURID, function(err) {
        if (!err) {
          console.log('Berhasil menambah murid baru');
        } else {
          console.log(err);
        }
      })
    })
  }
  
  static updateStudent(id, fname) {
    db.serialize(function() {
      let UPDATE_MURID = `UPDATE STUDENT SET firstname = '${fname}' WHERE id = '${id}';`;
      db.run(UPDATE_MURID, function(err) {
        if (!err) {
          console.log(`Nama depan murid dengan id ${id} berhasil diupdate`);
        } else {
          console.log(err);
        }
      })
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
      let LIHAT_SEMUA = `SELECT * FROM student;`;
      db.all(LIHAT_SEMUA, function(err, data) {
        if (!err) {
          data.forEach(data => {
            console.log(data);
          })
        } else {
          console.log(err);
        }
      })
    })
  }
  
  static viewByName(name) {
    db.serialize(function() {
      let LIHAT_NAMA = `SELECT * FROM student WHERE firstname = '${name}' OR lastname = '${name}';`;
      db.all(LIHAT_NAMA, function(err, data) {
        if (!err) {
          data.forEach(data => {
            console.log(`${data.id}. ${data.firstname} ${data.lastname}. ${data.gender}. ${data.birthdate}. ${data.email}. ${data.phone}`);
          })
        } else {
          console.log(err);
        }
      })
    })
  }
  
  static bdThisMonth() {
    db.serialize(function() {
      let ULTAH_BLN_INI = `SELECT * FROM student WHERE strftime('%m', 'now') = strftime('%m', student.birthdate);`;
      console.log('Yang berulang tahun bulan ini:');
      db.each(ULTAH_BLN_INI, function(err, data) {
        if (!err && !data.length) {
          console.log(`${data.id}. ${data.firstname} ${data.lastname}`);
        } else if (!err && data.length) {
          console.log('Tidak ada.');
        } else {
          console.log(err);
        }
      })
    })
  }
  
  static sortByBday() {
    db.serialize(function() {
      let URUTAN_ULTAH = `SELECT firstname, lastname, strftime('%d', birthdate) as hari, strftime('%m', birthdate) as bulan FROM student ORDER BY bulan ASC;`;
      db.each(URUTAN_ULTAH, function(err, data) {
        if(!err) {
          console.log(`Bulan ${data.bulan} tanggal ${data.hari} yang ulang tahun ${data.firstname} ${data.lastname}.`);
        } else {
          console.log(err);
        }
      })
    })
  }
  
  static help() {
    console.log(`
    addStudent
        Menambah entry murid baru.
        addStudent(nama_depan, nama_belakang, j_kelamin, tempat_tanggal_lahir (yyyy-mm-dd), email, no_telepon)

    updateStudent
        Update data murid. 

    deleteStudent
        Menghapus entry murid.
        deleteStudent(no_id_murid)

    viewAll
        Melihat data seluruh murid.
        viewAll()

    viewByName
        Melihat data murid berdasarkan nama murid. Nama depan atau belakang (masukkan salah satu).
        viewByName(nama_murid)

    bdThisMonth
        Melihat siapa saja murid yang berulang-tahun pada bulan ini.
        bdThisMonth()

    sortByBday
        Menampilkan nama seluruh murid beserta tanggal ulang tahun masing-masing. Diurutkan berdasarkan tanggal dan bulannya.
        sortByBday()

    help()
    Menampilkan help menu.
      `);
    
    
  }
  
} // ------- end of Student

// const r = repl.start(">>  ");
// r.context.addStudent = Student.addStudent;
// r.context.updateStudent = Student.updateStudent;
// r.context.deleteStudent = Student.deleteStudent;
// r.context.viewAll = Student.viewAll;
// r.context.viewByName = Student.viewByName;
// r.context.bdThisMonth = Student.bdThisMonth;
// r.context.sortByBday = Student.sortByBday;
// r.context.help = Student.help;

// Student.addStudent('Anak', 'Baru', 'laki-laki', '2000-01-01', 'ankbr@mailer-daemon.com', '0898735471');
// Student.addStudent('Tenkou', 'Sei', 'laki-laki', '2000-06-01', 'tensei@megami.com', '0874592756');
// Student.addStudent('Murid', 'Pindahan', 'perempuan', '1999-06-09', 'cuantik@alay.com', '0898123444');
// Student.updateStudent(4, 'Anaks');
// Student.deleteStudent(6);
// Student.deleteStudent(7);
// Student.deleteStudent(8);
Student.viewAll();
// Student.viewByName('Baru');
// Student.bdThisMonth()
// Student.sortByBday();
// Student.help();

