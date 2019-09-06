/*
 * @Author: ChenJunhan 
 * @Date: 2019-09-02 18:40:08 
 * @Last Modified by: ChenJunhan
 * @Last Modified time: 2019-09-03 18:26:22
 * 修改密码
 */
const Router = require('koa-router');

const router = new Router();
const requestValidate = require('../utils/request-validate');
const tokenUtils = require('../utils/token');
const codes = require('../codes/index');

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

  requestValidate(formData, rules, ctx);
  let tokenInfo = tokenUtils.getTokenInfo(formData.token);

  if (!tokenInfo){
    result.code = 101;
    result.message = codes[101];
  }
  ctx.body = result;
})

module.exports = router;