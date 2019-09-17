/*
 * @Author: ChenJunhan 
 * @Date: 2019-09-02 18:18:17 
 * @Last Modified by: ChenJunhan
 * @Last Modified time: 2019-09-17 16:47:06
 * 获取我的喜欢
 */

const Router = require('koa-router');

const router = new Router();
const songService = require('../services/songs');
const requestValidate = require('../utils/request-validate');
const tokenUtils = require('../utils/token');
const codes = require('../codes/index');

router.post('/', async ctx => {
  let rules = {
    'token': 'required',
  }
  let formData = ctx.request.body;
  let result = {
    success: false,
    message: '',
    data: null,
    code: -1
  }

  // 参数验证
  requestValidate(formData, rules, ctx);

  // 验证token
  let tokenInfo = await tokenUtils.verifyToken(formData['token']);
  if (!tokenInfo) {
    result.code = 101;
    result.message = codes[101];
    ctx.body = result;
    return;
  }

  // 获取喜欢列表
  let getListResult = await songService.getMylikeList(tokenInfo['uid']);
  if (getListResult) {
    result.data = getListResult;
    result.success = true;
    result.code = 0;
  }else {
    result.message = codes.ERROR_SYS;
  }
  
  ctx.body = result;
})

module.exports = router;