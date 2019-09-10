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
   * 根据手机号码查找一个存在用户的数据
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
   * 数据库创建用户登录token及refreshToken
   */
  async createToken(model) {
    let created = Math.floor(Date.now() / 1000);
    let tokenModel = {
      uid: model.uid,
      'phone_number': model.phoneNumber,
      token: model.token,
      expired: created + model.expired
    };
    let refreshTokenModel = {
      uid: model.uid,
      'phone_number': model.phoneNumber,
      token: model.refreshToken,
      expired: created + model.refreshExpired
    }

    let tokenResult = await db.replaceData('token', tokenModel);
    let refreshTokenResult = await db.replaceData('refresh_token', refreshTokenModel);

    return tokenResult && refreshTokenResult;
  },


  /**
   * 获取用户信息
   * @param {*} id 用户id
   * @returns
   */
  async getUserInfo(id) {
    let _sql = 'SELECT * FROM user_info where id = ?';
    let result = await db.query(_sql, [id]);

    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    }else {
      result = null;
    }

    return result;
  },


  /**
   * 数据库修改密码
   * @param {*} id  用户id
   * @param {*} password  新密码
   * @returns
   */
  async updatePassword(id, password) {
    let result = await db.updateData('user_info', { password }, id);

    if (result.serverStatus * 1 !== 2 || result.affectedRows * 1 !== 1) {
      result = null;
    }
    return result;
  }
}

module.exports = user;