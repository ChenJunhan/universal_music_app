/*
 * @Author: ChenJunhan 
 * @Date: 2019-09-02 18:40:08 
 * @Last Modified by: ChenJunhan
 * @Last Modified time: 2019-09-10 17:41:36
 * 修改密码
 */
const Router = require('koa-router');
const bcrypt = require('bcrypt');

const router = new Router();
const requestValidate = require('../utils/request-validate');
const tokenUtils = require('../utils/token');
const codes = require('../codes/index');
const userCodes = require('../codes/user');
const userService = require('../services/user-info');

router.post('/', async ctx => {
  let formData = ctx.request.body;
  let result = {
    success: false,
    message: '',
    data: null,
    code: -1
  };
  let rules = {
    'token': 'required',
    'old_password': 'required',
    'new_password': 'required'
  };

  // 参数验证
  requestValidate(formData, rules, ctx);

  // 修改密码验证
  let validateResult = userService.validatorModifyPassword(formData);
  if (!validateResult.success) {
    result = Object.assign(result, validateResult);
    ctx.body = result;
    return;
  }

  let tokenInfo = await tokenUtils.verifyToken(formData.token);

  // 验证token
  if (!tokenInfo){
    result.code = 101;
    result.message = codes[101];
    ctx.body = result;
    return;
  }

  // let userInfo = await userService.getExistUser(tokenInfo['phone_number']);   // 根据手机号码获取用户信息
  let userInfo = await userService.getUserInfo(tokenInfo.uid);
  const match = await bcrypt.compare(formData['old_password'], userInfo.password);

  if (match) {
    // 新密码加密
    let salt = bcrypt.genSaltSync(10);
    let password = bcrypt.hashSync(formData['new_password'], salt);
    let updateResult = await userService.updatePassword(tokenInfo.uid, password);

    if (updateResult) {
      result.code = 0;
      result.success = true;
    }else {
      result.message = codes.ERROR_SYS;
    }
  }else {
    result.message = userCodes.ERROR_FAIL_OLD_PASSWORD;
  }
  
  ctx.body = result;
})

module.exports = router;