/*
 * @Author: ChenJunhan 
 * @Date: 2019-09-02 18:40:08 
 * @Last Modified by: ChenJunhan
 * @Last Modified time: 2019-09-02 18:45:36
 * 修改密码
 */
const Router = require('koa-router');

const router = new Router();
const requestValidate = require('../utils/request-validate');

router.post('/', async ctx => {
  let formData = ctx.request.body;
  let result = {
    success: false,
    message: '',
    data: null,
    code: -1
  }

  ctx.body = result;
})

module.exports = router;