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
    // console.log(this.options);
  }
  
  postTweet() {
    return post(this.options, 'statuses/update', {status: "Hello puny fleshlings! This message was posted with twitter.js!"});
  }
}

module.exports = Twitter;
