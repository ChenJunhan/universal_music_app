const Router = require('koa-router');
const bcrypt = require('bcrypt');

const router = new Router();
const userInfoService = require('../services/user-info');
const userCode = require('../codes/user');

router.post('/', async (ctx, next) => {
  let formData = ctx.request.body;
  let result = {
    success: false,
    message: '',
    data: null,
    code: -1
  }

  // 注册验证
  let validateResult = userInfoService.validatorSignUp(formData);
  if (!validateResult.success) {
    result = Object.assign(result, validateResult);
    ctx.body = result;
    return;
  }

  // 查询手机号码用户信息
  let userInfo = await userInfoService.getExistUser(formData.phoneNumber);

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
    phone_number: formData.phoneNumber,
    password,
    create_time: new Date().getTime(),
    level: 1,
  });
  console.log(createResult);
  if (createResult && createResult.insertId * 1 > 0) {
    result.success = true;
    result.code = 0;
  }else {
    result.message = userCode.ERROR_SYS;
  }

  ctx.body = result;
})

module.exports = router;