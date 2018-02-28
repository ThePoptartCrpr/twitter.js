const request = require('request');

exports.get = () => {
  
}

exports.post = (auth, url, params, resolve, reject) => {
  request.post({url: 'https://api.twitter.com/1.1/' + url + '.json', oauth: auth, form: params}, function(error, response, body) {
    // console.log(response);
    if (error) console.log(error);
    resolve(response);
  })
}
