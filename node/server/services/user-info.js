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
   * 验证用户注册数据
   * @param {*} userInfo 用户注册数据
   * @returns            校验结果
   */
  validatorSignUp(userInfo) {
    let result = {
      success: false,
      message: '',
    }

    if (!validator.isMobile(userInfo.phoneNumber)) {
      result.message = userCode.ERROR_PHONE;
      return result;
    }
    if (!validator.isPassword(userInfo.password)) {
      result.message = userCode.ERROR_PASSWORD;
      return result;
    }
    if (userInfo.password !== userInfo.confirmPassword) {
      result.message = userCode.ERROR_PASSWORD_CONFORM;
      return result;
    }

    result.success = true;

    return result;
  }
}

module.exports = user;
