/*
 * @Author: ChenJunhan 
 * @Date: 2019-09-02 18:15:38 
 * @Last Modified by: ChenJunhan
 * @Last Modified time: 2019-09-02 18:32:11
 * 注册接口
 */

const Router = require('koa-router');
const bcrypt = require('bcrypt');

const router = new Router();
const userInfoService = require('../services/user-info');
const userCode = require('../codes/user');
const requestValidate = require('../utils/request-validate');

router.post('/', async (ctx, next) => {
  let rules = {
    'phone_number': 'required',
    'password': 'required',
    'confirm_password': 'required'
  }
  let formData = ctx.request.body;
  let result = {
    success: false,
    message: '',
    data: null,
    code: -1
  }
  
  // 注册验证
  requestValidate(formData, rules, ctx);
  let validateResult = userInfoService.validatorSignUp(formData);
  if (!validateResult.success) {
    result = Object.assign(result, validateResult);
    ctx.body = result;
    return;
  }

  // 查询手机号码用户信息
  let userInfo = await userInfoService.getExistUser(formData['phone_number']);

  // 判断手机号码是否已经注册
  if (userInfo) {
    result.message = userCode.ERROR_FAIL_PHONENUMBER_IS_EXIST;
    ctx.body = result;
    return;
  }

  // 密码加密
  let salt = bcrypt.genSaltSync(10);
  let password = bcrypt.hashSync(formData.password, salt);

  // 创建用户
  let createResult = await userInfoService.create({
    phone_number: formData['phone_number'],
    password,
    create_time: new Date().getTime(),
    level: 1,
  });
 
  if (createResult && createResult.insertId * 1 > 0) {
    result.success = true;
    result.code = 0;
  }else {
    result.message = userCode.ERROR_SYS;
  }

  ctx.body = result;
})

module.exports = router;