const request = require('request');

exports.get = function() {
  
}

exports.post = (auth, url, params) => {
  request.post({url: 'https://api.twitter.com/1.1/' + url + '.json', oauth: auth, form: params}, function(error, response, body) {
    console.log(response);
    if (error) console.log(error);
  })
}
