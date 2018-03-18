

class Tweet {
  constructor(input) {
    let data = JSON.parse(input);
    // console.log(data + "\n\n\nText: " + data.text);
    this.content = data.text;
  }
}

module.exports = Tweet;
