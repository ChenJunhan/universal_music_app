/** 
 * token生成、验证工具
 */
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const db = require('../../utils/db');

const token = {

  // 生成token
  createToken: (data, expired) => {
    let create = Math.floor(Date.now() / 1000);
    let cert = fs.readFileSync(path.join(__dirname, '../../config/pri.pem')); // 私钥
    let token = jwt.sign(data, cert, {
      expiresIn: 60,            // 过期时间:秒
      algorithm: 'RS256'
    });
    return token;
  },

  // 获取token信息
  getTokenInfo: async (token) => {
    // let result = jwt.decode(token);
    let _sql = 'SELECT * FROM token where token = ?';
    let result = await db.query(_sql, [token]);

    console.log(result);
    return result.length > 0 ? result[0] : null;
  }
}

module.exports = token;