class User {
  constructor(data) {
    this.id = data.id_str;
    this.name = data.name;
    this.username = data.screen_name;
    this.tag = `@${this.username}`;
    this.bio = data.description;
    
    this.followers = data.followers_count;
    this.following = data.friends_count;
    this.tweets = data.statuses_count;
    this.isVerified = data.verified;
    
    this.avatar = data.profile_image_url_https;
    this.banner = data.profile_banner_url;
  }
}

module.exports = User;
