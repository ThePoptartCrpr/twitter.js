<div align="center">
  <p>
    <a href="https://discord.gg/Ypmhtc"><img src="https://discordapp.com/api/guilds/412772653481459714/embed.png" alt="Discord server" /></a>
    <br />
    <a href="https://www.npmjs.com/package/js-twitter"><img src="https://img.shields.io/npm/v/js-twitter.svg?maxAge=3600" alt="NPM version" /></a>
<a href="https://www.npmjs.com/package/js-twitter"><img src="https://img.shields.io/npm/dt/js-twitter.svg?maxAge=3600" alt="NPM downloads" /></a>
  </p>
</div>

# twitter.js
A powerful, object-oriented library for easy interaction with the Twitter API.


## Discord
Have a question? Got an issue? Join our Discord server [here](https://discord.gg/Ypmhtc) for support and all the latest announcements related to twitter.js and our sister project, jscord.


## Links
* [Documentation](https://jscord.js.org/#/docs/twitter.js/master/general/welcome)
* [GitHub Repository](https://github.com/ThePoptartCrpr/twitter.js)


## Usage
First, install twitter.js from the command line:

```
npm i js-twitter --save
```

From there, the first step is, of course, to make a Twitter application.

Once you have your application's credentials, require twitter.js and create a client object with the following:

```js
const Twitter = require('js-twitter');
let client = new Twitter({
  consumer_key: "Your application's consumer key here",
  consumer_secret: "Your application's consumer secret here",
  token: "Your application's token here",
  token_secret: "Your application's token secret here"
});
```

Once you have that set up, you can post a tweet.

```js
client.postTweet("Hello world!");
```

twitter.js is promise-based, so this postTweet method will return a Tweet that you can do all sorts of fun stuff with. For instance:

```js
client.postTweet("Hello there!")
.then(tweet => {
  tweet.reply("General Kenobi!");
})
```

Or whatever floats your boat.

Work-in-progress documentation can be found <a href="https://jscord.js.org/#/docs/twitter.js/master/general/welcome">here</a>.
