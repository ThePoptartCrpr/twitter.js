const api = require('./util/api.js');
const { stream, post } = require('./util/api.js');
const { Tweet } = require('./util/structures.js');

const EventEmitter = require('events');

const baseOptions = {
  consumer_key: null,
  consumer_secret: null,
  token: null,
  token_secret: null,
  tracking: false,
}

class Twitter extends EventEmitter {
  constructor(options) {
    super();
    
    this.options = Object.assign(baseOptions, options);
    this.auth = {
      consumer_key: this.options.consumer_key,
      consumer_secret: this.options.consumer_secret,
      token: this.options.token,
      token_secret: this.options.token_secret,
    }
    
    this.api = api;
    
    if (!this.options.tracking == false) this.startMentionEvent();
  }
  
  postTweet(content) {
    return new Promise((resolve, reject) => {
      if (typeof content != 'string') return reject(new Error('Content parameter must be a string'));
      post(this.auth, 'statuses/update', {status: content})
        .then(response => {
          let body = JSON.parse(response.body);
          if (response.statusCode != 200 && body.errors) return reject(new Error(`API returned error ${body.errors[0].code}: ${body.errors[0].message}`));
          return resolve(new Tweet(this.auth, body));
        })
        .catch(e => {
          return reject(e);
        })
    }).catch(e => {
      return Promise.reject(e);
    })
  }
  
  startMentionEvent() {
    stream(this.auth, 'statuses/filter', {track: this.options.tracking}, response => {
      // let data = '';
      // data += response.toString();
      // let json = JSON.parse(data);
      // console.log("hello!", typeof response);
      this.emit('tweet', new Tweet(this.auth, response));
    })
  }
  
  /*onMention(callback) {
    stream(this.auth, 'statuses/filter', {track: '@vervezmusic'}, response => {
      let data = '';
      data += response.toString();
      // console.log(JSON.parse(data));
      callback(JSON.parse(data));
    });
  }*/
  
}

module.exports = Twitter;
