const api = require('./util/api.js');
const { stream, get, post } = require('./util/api.js');
const { User, Tweet } = require('./util/structures.js');

const EventEmitter = require('events');

const baseOptions = {
  consumer_key: null,
  consumer_secret: null,
  token: null,
  token_secret: null,
  tracking: false,
  mentionEvent: false,
  currentUsername: null,
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
    
    this.user = null;
    
    get(this.auth, 'account/verify_credentials')
      .then(response => {
        this.options.currentUsername = response.screen_name;
        this.user = new User(response);
      })
      .catch(error => {
        console.error(error);
      })
    
    this.api = api;
    
    if (!this.options.tracking == false) this.startMentionEvent();
  }
  
  postTweet(content) {
    return new Promise((resolve, reject) => {
      if (typeof content != 'string') return reject(new Error('Content parameter must be a string'));
      post(this.auth, 'statuses/update', {status: content})
        .then(response => {
          return resolve(new Tweet(this.auth, response));
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
      this.emit('tweet', new Tweet(this.auth, response));
    })
  }
  
}

module.exports = Twitter;
