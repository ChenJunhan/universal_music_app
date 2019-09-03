/*
 * @Author: ChenJunhan 
 * @Date: 2019-09-02 18:15:15 
 * @Last Modified by: ChenJunhan
 * @Last Modified time: 2019-09-03 14:51:58
 * 登录接口
 */

const Router = require('koa-router');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = new Router();
const userInfoService = require('../services/user-info');
const userCode = require('../codes/user');
const tokenUtils = require('../utils/token');
const requestValidate = require('../utils/request-validate');

router.post('/', async (ctx, next) => {
  let formData = ctx.request.body;
  let result = {
    success: false,
    message: '',
    data: null,
    code: -1,
  };
  let rules = {
    'phone_number': 'required',
    'password': 'required'
  };
  
  // 验证请求参数
  requestValidate(formData, rules, ctx); 
  // 获取手机号码用户信息
  let userInfo = await userInfoService.getExistUser(formData['phone_number']);

  // 判断用户是否存在
  if (!userInfo) {
    result.message = userCode.ERROR_FAIL_USER_IS_NOT_EXIST;
    ctx.body = result;
    return;
  }

  // 检查密码是否正确
  let checkPassword = bcrypt.compareSync(formData.password, userInfo.password);
  if (!checkPassword) {
    result.message = userCode.ERROR_FAIL_USER_PASSWORD;
    ctx.body = result;
    return;
  }

  const expired = 60;               // token过期时间
  const refreshExpired = 70;        // refresh token过期时间
  const token = tokenUtils.createToken({ uid: userInfo.id }, expired);  
  const refreshToken = tokenUtils.createToken({ uid: userInfo.id }, refreshExpired);

  let tokenResult = await userInfoService.createToken({
    uid: userInfo.id,
    token,
    expired,
    refreshToken,
    refreshExpired
  });
  
  if (tokenResult) {
    result.success = true;
    result.code = 0;
  }else {
    result.message = userCode.ERROR_SYS;
  }
  
  ctx.body = result;
})

module.exports = router;