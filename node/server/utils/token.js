/** 
 * token生成、验证工具
 */
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const token = {

  // 生成token
  createToken: (data, expired) => {
    let create = Math.floor(Date.now() / 1000);
    let cert = fs.readFileSync(path.join(__dirname, '../../config/rsa_private_key.pem')); // 私钥
    let token = jwt.sign(data, cert, {
      expiresIn: expired,            // 过期时间:秒
      algorithm: 'RS256'
    });
    return token;
  },

  // 验证token
  verifyToken: (token) => {
    let cert = fs.readFileSync(path.join(__dirname, '../../config/rsa_public_key.pem'));
  }
}

module.exports = token;