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
    let cert = fs.readFileSync(path.join(__dirname, '../../config/rsa-private.pem')); // 私钥
    let token = jwt.sign({ data }, cert, {
      // expiresIn: 60,            // 过期时间:秒
      algorithm: 'RS256'
    });
    return token;
  },

  // 验证token
  verifyToken: (token) => {
    let cert = fs.readFileSync(path.join(__dirname, '../../config/rsa-public-key.pem'));
    let cert1 = fs.readFileSync(path.join(__dirname, '../../config/rsa_private_key.pem'));
    let result;
    // try {
      console.log(token)
     jwt.verify(token, cert, { algorithms: ['RS256']}, (error, payload) => {
       console.log(error, payload)
     })
    // }catch {

    // }
    console.log(result);
  }
}

module.exports = token;