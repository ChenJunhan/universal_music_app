/*
 * @Author: ChenJunhan 
 * @Date: 2019-09-02 18:40:08 
 * @Last Modified by: ChenJunhan
 * @Last Modified time: 2019-09-03 14:54:45
 * 修改密码
 */
const Router = require('koa-router');

const router = new Router();
const requestValidate = require('../utils/request-validate');
const tokenUtils = require('../utils/token');

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
  tokenUtils.verifyToken(formData.token);

  ctx.body = result;
})

module.exports = router;