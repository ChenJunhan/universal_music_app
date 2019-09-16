/*
 * @Author: ChenJunhan 
 * @Date: 2019-09-16 14:54:07 
 * @Last Modified by: ChenJunhan
 * @Last Modified time: 2019-09-16 17:43:24
 * 搜索音乐
 */

const Router = require('koa-router');

const router = new Router();
const requestValidate = require('../utils/request-validate');
const songsService = require('../services/songs');

router.post('/', async ctx => {
  let rules = {
    'song_name': 'required'
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
  result['data'] = await songsService.searchSongs(formData['song_name']);

  if (result['data']) {
    result.success = true;
    result.code = 0;
  }
  ctx.body = result;
})

module.exports = router;
