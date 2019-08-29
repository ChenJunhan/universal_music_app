const Router = require('koa-router');

const router = new Router();
const userInfoService = require('../services/user-info');
const userCode = require('../codes/user');

router.post('/', async (ctx, next) => {
  let formData = ctx.request.body;
  let result = {
    success: false,
    message: '',
    data: null,
    code: '',
  }

  ctx.body = ctx;

  // 获取手机号码用户信息
  let userInfo = await userInfoService.getExistUser(formData.phoneNumber);

  // 判断用户是否存在
  if (!userInfo) {
    result.message = userCode.ERROR_FAIL_USER_IS_NOT_EXIST;
    result.code = 'ERROR_FAIL_USER_IS_NOT_EXIST';
    ctx.body = result;
    return;
  }

})

module.exports = router;