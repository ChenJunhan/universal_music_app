/**
 * 用户业务操作 
*/

const validator = require('../utils/validator');
const userCode = require('../codes/user');
const userModel = require('../models/user');

const user = {

  /**
   * 创建用户
   * @param {*} user
   * @returns
   */
  async create(user) {
    let result = await userModel.create(user);
    return result;
  },

  /**
   * 查询手机号是否已经注册过
   * @param {String} phoneNumber
   * @returns
   */
  async getExistUser(phoneNumber) {
    let resultData = await userModel.getExistUser(phoneNumber);
    return resultData;
  },


  /**
   * 查询token表是否存在
   * @param {*} uid
   * @returns
   */
  async getExistUserToken(uid) {
    let resultData = await userModel.getExistUserToken(uid);
    return resultData;
  },

  /**
   * 创建登录token
   * @param {*} options
   * @returns
   */
  async createToken(options) {
    let result = await userModel.createToken(options);
    return result;
  },

  /**
   * 验证用户注册数据
   * @param {*} userInfo 用户注册数据
   * @returns            校验结果
   */
  validatorSignUp(userInfo) {
    let result = {
      success: false,
      message: '',
    }

    if (!validator.isMobile(userInfo['phone_number'])) {
      result.message = userCode.ERROR_PHONE;
      return result;
    }
    if (!validator.isPassword(userInfo.password)) {
      result.message = userCode.ERROR_PASSWORD;
      return result;
    }
    if (userInfo.password !== userInfo['confirm_password']) {
      result.message = userCode.ERROR_PASSWORD_CONFORM;
      return result;
    }

    result.success = true;

    return result;
  },


  /**
   * 获取用户信息
   * @param {*} id
   * @returns
   */
  async getUserInfo(id) {
    let result = await userModel.getUserInfo(id);
    return result;
  },


  /**
   * 验证用户修改密码数据
   * @param {*} data
   * @returns
   */
  validatorModifyPassword(data) {
    let result = {
      success: false,
      message: '',
    }

    if (data['old_password'] === data['new_password']) {
      result.message = userCode.ERROR_FAIL_NO_CHANGE;
      return result;
    }

    if (!validator.isPassword(data['new_password'])) {
      result.message = userCode.ERROR_FAIL_USER_PASSWORD;
      return result;
    }

    result.success = true;
    
    return result;
  },


  /**
   * 修改密码
   * @param {*} id
   * @param {*} password
   * @returns
   */
  async updatePassword (id, password) {
    let result = await userModel.updatePassword(id, password);
    return result;
  }
}

module.exports = user;
