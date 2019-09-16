const request = require('request');


const songs = {

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
        resolve(body);
      })
    })

    return result;
  }
}

module.exports = songs;