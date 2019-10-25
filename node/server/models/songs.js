const request = require('request');
const db = require('../../utils/db');
const queryString = require('querystring');

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
   * qq搜索
   * @param {*} songsName
   * @returns
   */
  async qq_search(songsName) {
    let params = {
      is_xml: 0,
      key: songsName,
      g_tk: 2121550467,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0
    };
    let url = 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?' + queryString.stringify(params);

    let result = await new Promise((resolve, reject) => {
      request({
        url,
        method: 'GET',
      }, (error, res, body) => {
        let data = JSON.parse(body);
        let songList = data.data.song.itemlist;
        console.log(songList);
        resolve(body);
      })
    })

    return result;
  },

  async qq_getSongLink() {
    let params = {
      '-': 'getplaysongvkey' + (Math.random() + "").replace("0.", ""),
      g_tk: 2121550467,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0,
      data: JSON.stringify({
        "req": {
          "module":"CDN.SrfCdnDispatchServer",
          "method":"GetCdnDispatch",
          "param": { 
            "guid":"1219066235",
            "calltype": 0,
            "userip":"" 
          }
        },
        "req_0": {
          "module":"vkey.GetVkeyServer",
          "method":"CgiGetVkey",
          "param":{
            "guid":"1219066235",
            "songmid":["002FwMaU3brSI8"],
            "songtype":[0],
            "uin":"951313970",
            "loginflag":1,
            "platform":"20"
          }
         },
         "comm":{
           "format":"json",
           "ct":24,
           "cv":0
         }
      })
    }
    let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?' + queryString.stringify(params);

    let result = await new Promise((resolve, reject) => {
      request({
        url,
        method: 'GET',
      }, (error, res, body) => {
        let data = JSON.parse(body);
        let link = data.req.data.sip[0] + data.req_0.data.midurlinfo[0].purl;
        console.log('音乐链接为：',link, data.req_0.data.midurlinfo);
      })
    })
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