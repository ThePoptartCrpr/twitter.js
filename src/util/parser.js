// Credit to the twitter module for this one. The twitter api is utter hell to parse
// Adapted from https://github.com/desmondmorris/node-twitter/blob/master/lib/parser.js

class Parser {
  constructor() {
    this.buffer = '';
  }
  
  receive(buffer, callback) {
    this.buffer += buffer.toString('utf8');
    let index, json;
    
    while ((index = this.buffer.indexOf('\r\n')) > -1) {
      json = this.buffer.slice(0, index);
      this.buffer = this.buffer.slice(index + 2);
      if (json.length > 0) {
        try {
          json = JSON.parse(json);
          callback(json);
        }
        catch (error) {
          console.error(error);
        }
      }
    }
  }
}

module.exports = Parser;
