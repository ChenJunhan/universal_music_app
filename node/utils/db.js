const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool({
  host: config.database.HOST, 
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
})

let query = (sql, values) => {

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {

          if (err) {
            reject(err)
          }else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

let insertData = function(table, values) { 
  let _sql = "INSERT INTO ?? SET ?"
  return query(_sql, [table, values]);
}
module.exports = {
  query,
  insertData,
}