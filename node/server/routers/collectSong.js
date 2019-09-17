/*
 * @Author: ChenJunhan 
 * @Date: 2019-09-16 17:41:01 
 * @Last Modified by: ChenJunhan
 * @Last Modified time: 2019-09-17 15:55:31
 * 收藏音乐
 */

const Router = require('koa-router');

const router = new Router();
const requestValidate = require('../utils/request-validate');
const tokenUtils = require('../utils/token');
const codes = require('../codes/index');
const songService = require('../services/songs');

router.post('/', async (ctx, next) => {
  let rules = {
    'token': 'required',
    's_id': 'required',
    'song_name': 'required',
    'singer': 'required',
    'origin': 'required'
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

  let tokenInfo = await tokenUtils.verifyToken(formData['token']);

  // 验证token
  if (!tokenInfo) {
    result.code = 101;
    result.message = codes[101];
    ctx.body = result;
    return;
  }

  let songInfo = JSON.parse(JSON.stringify(formData));
  delete(songInfo['token']);
  songInfo['uid'] = tokenInfo['uid'];
  songInfo['create_time'] = Date.now() / 1000;
  let collectResult = await songService.collectSong(songInfo);

  if (collectResult && collectResult.insertId * 1 > 0) {
    result.success = true;
    result.code = 0;
  }
  ctx.body = result;
})

module.exports = router;
