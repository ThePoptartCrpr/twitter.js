<div align="center">
  <p>
    <a href="https://discord.gg/Ypmhtc"><img src="https://discordapp.com/api/guilds/412772653481459714/embed.png" alt="Discord server" /></a>
  </p>
</div>

# twitter.js
A powerful, object-oriented library for easy interaction with the Twitter API.

## Usage
The first step is, of course, to make a Twitter application.

Once you have your application's credentials, require twitter.js and create a client object with the following:

```js
const Twitter = require('twitter.js');
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

Full documentation will be coming soon.
