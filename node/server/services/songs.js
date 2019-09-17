/** 
 * 音乐操作
*/

const songsModel = require('../models/songs');

const songs = {


  /**
   * 搜索音乐
   * @param {String} songName
   * @returns
   */
  async searchSongs(songName) {
    let result = await songsModel.wyy_search(songName);
    return result;
  },


  /**
   * 收藏音乐
   * @param {Object} songInfo
   * @returns
   */
  async collectSong(songInfo) {
    let result = await songsModel.collect_songs(songInfo);
    return result;
  },


  /**
   * 获取用户收藏音乐列表
   * @param {Number} uid
   * @returns
   */
  async getMylikeList(uid) {
    let result = await songsModel.get_my_like_list(uid);
    return result;
  }
}

module.exports = songs;