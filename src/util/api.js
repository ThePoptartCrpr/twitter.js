const request = require('request');

exports.get = () => {
  
}

exports.post = (auth, url, params) => {
  return new Promise((resolve, reject) => {
    request.post({url: 'https://api.twitter.com/1.1/' + url + '.json', oauth: auth, form: params}, function(error, response, body) {
      if (error) return reject(new Error(error));
      resolve(response);
    })
  }).catch(e => {
    return Promise.reject(e);
  })
}
