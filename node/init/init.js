const sqlStatementList = require('../utils/walk-sql-content')();
const { query } = require('../utils/db');

// 打印脚本执行日志
const eventLog = function( err , sqlFile, index ) {
  if( err ) {
    console.log(`[ERROR] 执行: ${sqlFile} 第${index + 1}条脚本 执行失败 o(╯□╰)o ！`)
  } else {
    console.log(`[SUCCESS] 执行: ${sqlFile} 第${index + 1}条脚本 执行成功 O(∩_∩)O !`)
  }
}

// 遍历执行sql语句
const walkSqlStatement = async () => {
  for (let i = 0; i < sqlStatementList.length; i++) {
    let item = sqlStatementList[i];
    if (item.trim()) {
      let result = await query(item);
      let isError = result.serverStatus * 1 === 2 ? null : true;
      eventLog(isError, item, i);
    }
  }

  console.log('======== sql脚本执行结束 =========');
  console.log('======== 请按ctrl + c退出 ========');
}

walkSqlStatement();