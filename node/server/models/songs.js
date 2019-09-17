const request = require('request');
const db = require('../../utils/db');

const songs = {

  /**
   * wyy搜索
   * @param {*} songsName  歌名
   * @returns
   */
  async wyy_search(songsName) {
    let result = await new Promise((resolve, reject) => {
      request({
        url: 'http://chenjunhan.club/api/search',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        json: { keyword: songsName }
      }, (error, res, body) => {
        if (body.length === 0) {
          body = null;
        }

        body.map(e => e.origin = 'wyy');      // 添加音乐来源
        resolve(body);
      })
    })

    return result;
  },


  /**
   * 数据库增加音乐列表
   * @param {*} model
   * @returns
   */
  async collect_songs(model) {
    let result = await db.insertData('songs_list', model);
    return result;
  },


  /**
   * 根据用户id获取收藏音乐列表
   * @param {*} uid
   * @returns
   */
  async get_my_like_list(uid) {
    let _sql = 'SELECT * FROM songs_list where uid = ?';
    let result = await db.query(_sql, [uid]);
    return result;
  }
}

module.exports = songs;