const sqlContentList = require('./get-sql-content-map')();

let sqlStatement = [];            // sql语句

/**
 * 遍历sql文件获取sql语句
 * @returns
 */
function walkSqlContent() {
  Object.keys(sqlContentList).forEach(key => {
    sqlStatement = sqlStatement.concat(sqlContentList[key].split(';'));
  })
  sqlStatement.splice(-1, 1);
  return sqlStatement;
}

module.exports = walkSqlContent;