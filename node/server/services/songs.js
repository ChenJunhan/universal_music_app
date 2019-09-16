/** 
 * 音乐操作
*/

const songsModel = require('../models/songs');

const songs = {

  async searchSongs(songName) {
    let result = await songsModel.wyy_search(songName);
    return result;
  },
}

module.exports = songs;