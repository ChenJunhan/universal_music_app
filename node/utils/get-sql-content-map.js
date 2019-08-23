const fs = require('fs');
const path = require('path');

let sqlList = fs.readdirSync(path.resolve('init/sql'));     // 获取sql目录的文件数据
let sqlContentMap = {};

/**
 * 读取sql文件的内容
 * @param {*} fileName
 * @param {*} path
 */
function getSqlContent(fileName, path) {
  let content = fs.readFileSync(path, 'binary');
  sqlContentMap[fileName] = content;
}

/**
 * 封装所有sql文件脚本
 * @returns
 */
function getSqlContentMap() {
  let sqlPath = path.resolve('init/sql/');    // sql文件夹目录

  for (let key in sqlList) {
    getSqlContent(key, `${sqlPath}\\${sqlList[key]}`);
  }

  return sqlContentMap;
}

module.exports = getSqlContentMap;