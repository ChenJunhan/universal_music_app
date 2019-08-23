const Router = require('koa-router');
const path = require('path');
const fs = require('fs');
const router = new Router();

const mysql = require('mysql');
const { query } = require('../../utils/db');
const getSqlMap = require('../../utils/walk-sql-content');

console.log(getSqlMap());
router.get('/', async (ctx) => {
  ctx.body = 'mysl'
  await query(`/*!40101 SET NAMES utf8 */;`)
})

module.exports = router;