const { post } = require('../util/api.js');

class Tweet {
  constructor(auth, data) {
    this.content = data.text;
    this.id = data.id_str;
    const { User } = require('../util/structures.js');
    this.user = new User(data.user);
    this.author = this.user;
    
    this.auth = auth;
  }
  
  retweet() {
    return new Promise((resolve, reject) => {
      post(this.auth, `statuses/retweet/${this.id}`)
        .then(response => {
          let body = JSON.parse(response.body);
          if (response.statusCode != 200 && body.errors) return reject(new Error(`API returned error ${body.errors[0].code}: ${body.errors[0].message}`));
          return resolve();
        })
        .catch(e => {
          return reject(e);
        })
    })
  }
  
  unretweet() {
    return new Promise((resolve, reject) => {
      post(this.auth, `statuses/unretweet/${this.id}`)
        .then(response => {
          let body = JSON.parse(response.body);
          if (response.statusCode != 200 && body.errors) return reject(new Error(`API returned error ${body.errors[0].code}: ${body.errors[0].message}`));
          return resolve();
        })
        .catch(e => {
          return reject(e);
        })
    })
  }
  
  like() {
    return new Promise((resolve, reject) => {
      post(this.auth, `favorites/create`, {id: this.id})
        .then(response => {
          let body = JSON.parse(response.body);
          if (response.statusCode != 200 && body.errors) return reject(new Error(`API returned error ${body.errors[0].code}: ${body.errors[0].message}`));
          return resolve();
        })
        .catch(e => {
          return reject(e);
        })
    })
  }
  
  unlike() {
    return new Promise((resolve, reject) => {
      post(this.auth, `favorites/destroy`, {id: this.id})
        .then(response => {
          let body = JSON.parse(response.body);
          if (response.statusCode != 200 && body.errors) return reject(new Error(`API returned error ${body.errors[0].code}: ${body.errors[0].message}`));
          return resolve();
        })
        .catch(e => {
          return reject(e);
        })
    })
  }
  
  reply(message) {
    return new Promise((resolve, reject) => {
      // if (typeof message != 'string') reject(new Error('The message to reply with must be a string!'));
      message = `@${this.user.username} ${message}`;
      post(this.auth, `statuses/update`, {status: message, in_reply_to_status_id: this.id})
        .then(response => {
          let body = JSON.parse(response.body);
          if (response.statusCode != 200 && body.errors) return reject(new Error(`API returned error ${body.errors[0].code}: ${body.errors[0].message}`));
          return resolve(new Tweet(this.auth, body));
        })
        .catch(e => {
          return reject(e);
        })
    })
  }
  
  delete() {
    return new Promise((resolve, reject) => {
      post(this.auth, `statuses/destroy/${this.id}`)
        .then(response => {
          let body = JSON.parse(response.body);
          if (response.statusCode != 200 && body.errors) return reject(new Error(`API returned error ${body.errors[0].code}: ${body.errors[0].message}`));
          return resolve();
        })
        .catch(e => {
          return reject(e);
        })
    })
  }
  
}

module.exports = Tweet;
