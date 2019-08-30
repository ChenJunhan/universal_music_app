const db = require('../../utils/db');

const user = {

  /**
   * 数据库创建用户
   * @param {Object} model 用户数据模型
   * @returns {Object}     mysql执行结果
   */
  async create (model) {
    let result = await db.insertData('user_info', model);
    return result;
  },


  /**
   * 查找一个存在用户的数据
   * @param {String} phoneNumber 手机号码
   * @returns {Object}      查询结果
   */
  async getExistUser(phoneNumber) {
    let _sql = 'SELECT * FROM user_info where phone_number = ? limit 1';
    let result = await db.query(_sql, [phoneNumber]);

    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  },


  /** 
   * 数据库创建用户登录token
   */
  async createToken(model) {
    let result = await db.insertData('token', model);
    return result;
  },


  /**
   * 数据库更新token
   * @param {*} model
   * @returns
   */
  async updateToken(model) {
    let result = await db.updateData('token', model);
    return result;
  },
}

module.exports = user;