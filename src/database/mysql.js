const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config/database')

const conection = mysql.createConnection(MYSQL_CONFIG);

conection.connect();

// const sql = `select * from blogs`;
// conection.query(sql, (error, result) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   console.log(result)
// })

// function execSQL(sql, callback) {
//   conection.query(sql, callback);
// }

function execSQL(sql) {
  const promise = new Promise((resolve, reject) => {
    conection.query(sql, (err, result) => {
      if(err){
        reject(err)
        return;
      }
      resolve(result)
    })
  })
  return promise;
}

module.exports = {
  execSQL
}


