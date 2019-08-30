const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool({
  host: config.database.HOST, 
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
})

module.exports = { 
  query(sql, values) {

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
  },

  insertData(table, values) { 
    let _sql = "REPLACE INTO ?? SET ?";
    return this.query(_sql, [table, values]);
  },

  updateData(table, values) {
    let _sql = "UPDATE ?? SET ? WHERE uid = ?";
    return this.query(_sql, [table, values, id]);
  }
}