const { post } = require('./util/api.js');

const baseOptions = {
  consumer_key: null,
  consumer_secret: null,
  token: null,
  token_secret: null,
}

class Twitter {
  constructor(options) {
    this.options = Object.assign(baseOptions, options);
  }
  
  postTweet(content) {
    return new Promise((resolve, reject) => {
      console.log(typeof content);
      if (typeof content != "string") return reject(new Error("Content parameter must be a string"));
      post(this.options, 'statuses/update', {status: content}, resolve);
      console.log("e");
    }).catch(e => {
      return Promise.reject(e);
    })
  }
}

module.exports = Twitter;
