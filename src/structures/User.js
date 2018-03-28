/**
 * A Twitter user
 */
class User {
  constructor(data) {
    /**
     * The user's ID
     * @type {string}
     */
    this.id = data.id_str;
    /**
     * The user's name
     * @type {string}
     */
    this.name = data.name;
    /**
     * The user's mentionable username
     * @type {string}
     */
    this.username = data.screen_name;
    /**
     * The user's @mention for ease of use
     * @type {string}
     */
    this.tag = `@${this.username}`;
    /**
     * The user's bio
     * @type {string}
     */
    this.bio = data.description;
    
    /**
     * The user's follower count
     * @type {string}
     */
    this.followers = data.followers_count;
    /**
     * The user's following count
     * @type {string}
     */
    this.following = data.friends_count;
    /**
     * The user's tweet count
     * @type {string}
     */
    this.tweets = data.statuses_count;
    /**
     * Whether the user is verified or not
     * @type {Boolean}
     */
    this.isVerified = data.verified;
    
    /**
     * The user's avatar link
     * @type {string}
     */
    this.avatar = data.profile_image_url_https;
    /**
     * The user's banner link
     * @type {string}
     */
    this.banner = data.profile_banner_url;
  }
}

module.exports = User;
