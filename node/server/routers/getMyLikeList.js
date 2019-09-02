/*
 * @Author: ChenJunhan 
 * @Date: 2019-09-02 18:18:17 
 * @Last Modified by: ChenJunhan
 * @Last Modified time: 2019-09-02 18:37:56
 * 获取我的喜欢列表
 */

const Router = require('koa-router');

const router = new Router();

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