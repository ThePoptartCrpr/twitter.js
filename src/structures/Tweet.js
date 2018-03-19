const { post } = require('../util/api.js');

class Tweet {
  constructor(auth, data) {
    console.log(data);
    this.content = data.text;
    this.id = data.id_str;
    
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
