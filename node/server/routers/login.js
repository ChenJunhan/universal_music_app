const Router = require('koa-router');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = new Router();
const userInfoService = require('../services/user-info');
const userCode = require('../codes/user');
const tokenUtils = require('../utils/token');

router.post('/', async (ctx, next) => {
  let formData = ctx.request.body;
  let result = {
    success: false,
    message: '',
    data: null,
    code: -1,
  }

  // 获取手机号码用户信息
  let userInfo = await userInfoService.getExistUser(formData.phoneNumber);

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

  const expired = 60;   // token过期时间
  const token = tokenUtils.createToken({ uid: userInfo.id }, expired);  // token
  let tokenResult = await userInfoService.createToken({
    uid: userInfo.id,
    token,
    expired
  });
  console.log(tokenResult)
  if (tokenResult) {
    result.success = true;
    result.code = 0;
  }else {
    result.message = userCode.ERROR_SYS;
  }
  
  ctx.body = result;
})

module.exports = router;