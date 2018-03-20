// Credit to the twitter module for this one. The twitter api is utter hell to parse
// Original source: https://github.com/desmondmorris/node-twitter/blob/master/lib/parser.js

class Parser {
  constructor() {
    this.buffer = '';
  }
  
  receive(buffer, callback) {
    this.buffer += buffer.toString('utf8');
    let index, json;
    
    let end = '\r\n';
    let endLength = 2;
    
    while ((index = this.buffer.indexOf(end)) > -1) {
      json = this.buffer.slice(0, index);
      this.buffer = this.buffer.slice(index + endLength);
      if (json.length > 0) {
        try {
          // json = JSON.stringify(json);
          json = JSON.parse(json);
          // console.log("parser", json, "\n", typeof json);
          callback(json);
        }
        catch (error) {
          // console.log(`Buffer: ${this.buffer}\n\n\n JSON: ${json}`);
          // console.log(JSON.stringify(json));
          // console.log(JSON.stringify(json));
          console.error(error);
        }
      }
    }
  }
}

module.exports = Parser;
