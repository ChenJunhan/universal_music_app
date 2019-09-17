/** 
 * token生成、验证工具
 */
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const db = require('../../utils/db');

const token = {

  /**
   * 生成token
   * @param {*} data          
   * @param {*} expired       过期时间/秒
   * @returns
   */
  createToken (data, expired) {
    let create = Math.floor(Date.now() / 1000);
    let cert = fs.readFileSync(path.join(__dirname, '../../config/pri.pem')); // 私钥
    let token = jwt.sign(data, cert, {
      expiresIn: 14400,            // 过期时间:秒
      // algorithm: 'RS256'
    });
    return token;
  },


  /**
   * 验证token
   * @param {*} token
   * @returns {Object}  token解码结果，若过期或验证失败则返回null
   */
  verifyToken(token) {
    let cert = fs.readFileSync(path.join(__dirname, '../../config/pri.pem')); // 私钥
    let decode = null;

    try {
      decode = jwt.verify(token, cert);
    }catch(err) {
      decode = null;
    }
    return decode;
  },


  /**
   * 根据token获取表中的信息
   * @param {*} token
   * @returns
   */
  async getTokenInfo(token) {
    let decode = this.verifyToken(token);
    console.log(decode);
    // let result = jwt.decode(token);
    let _sql = 'SELECT * FROM token where token = ?';
    let result = await db.query(_sql, [token]);

    return result.length > 0 ? result[0] : null;
  },

}

module.exports = token;