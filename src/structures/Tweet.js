const { post } = require('../util/api.js');

class Tweet {
  constructor(auth, data) {
    /**
     * The raw text of the tweet
     * @type {string}
     */
    this.content = data.text;
    /**
     * The tweet's ID
     * @type {string}
     */
    this.id = data.id_str;
    const { User } = require('../util/structures.js');
    /**
     * The author of the tweet
     * @type {User}
     */
    this.user = new User(data.user);
    /**
     * An alias for {@link Tweet#user}
     * @type {User}
     */
    this.author = this.user;
    
    this.auth = auth;
  }
  
  /**
   * Retweets the tweet
   * @return {void}
   */
  retweet() {
    return new Promise((resolve, reject) => {
      post(this.auth, `statuses/retweet/${this.id}`)
        .then(response => {
          return resolve();
        })
        .catch(e => {
          return reject(e);
        })
    })
  }
  
  /**
   * Unretweets the tweet
   * @return {void} 
   */
  unretweet() {
    return new Promise((resolve, reject) => {
      post(this.auth, `statuses/unretweet/${this.id}`)
        .then(response => {
          return resolve();
        })
        .catch(e => {
          return reject(e);
        })
    })
  }
  
  /**
   * Likes the tweet
   * @return {void}
   */
  like() {
    return new Promise((resolve, reject) => {
      post(this.auth, `favorites/create`, {id: this.id})
        .then(response => {
          return resolve();
        })
        .catch(e => {
          return reject(e);
        })
    })
  }
  
  /**
   * Unlikes the tweet
   * @return {void} 
   */
  unlike() {
    return new Promise((resolve, reject) => {
      post(this.auth, `favorites/destroy`, {id: this.id})
        .then(response => {
          return resolve();
        })
        .catch(e => {
          return reject(e);
        })
    })
  }
  
  /**
   * Reply to the tweet
   * @param  {string} message The message to reply with
   * @return {Promise<Tweet>}         The tweet that was just tweeted
   */
  reply(message) {
    return new Promise((resolve, reject) => {
      // if (typeof message != 'string') reject(new Error('The message to reply with must be a string!'));
      message = `@${this.user.username} ${message}`;
      post(this.auth, `statuses/update`, {status: message, in_reply_to_status_id: this.id})
        .then(response => {
          return resolve(new Tweet(this.auth, response));
        })
        .catch(e => {
          return reject(e);
        })
    })
  }
  
  /**
   * Deletes the tweet
   * @return {void} 
   */
  delete() {
    return new Promise((resolve, reject) => {
      post(this.auth, `statuses/destroy/${this.id}`)
        .then(response => {
          return resolve();
        })
        .catch(e => {
          return reject(e);
        })
    })
  }
  
}

module.exports = Tweet;
