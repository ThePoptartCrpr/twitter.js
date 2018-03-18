const api = require('./util/api.js');
const { post } = require('./util/api.js');
const { Tweet } = require('./util/structures.js');

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
      if (typeof content != "string") return reject(new Error("Content parameter must be a string"));
      post(this.options, 'statuses/update', {status: content})
        .then(response => {
          let body = JSON.parse(response.body);
          if (response.statusCode != 200 && body.errors) return reject(new Error(`API returned error ${body.errors[0].code}: ${body.errors[0].message}`));
          let tweet = new Tweet(response.body);
          return resolve(tweet);
        })
        .catch(e => {
          return reject(e);
        })
    }).catch(e => {
      return Promise.reject(e);
    })
  }
}

module.exports = Twitter;
