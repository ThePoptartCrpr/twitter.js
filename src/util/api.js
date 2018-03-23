const request = require('request');
const Parser = require('./parser.js');
const parser = new Parser();

exports.get = (auth, url, params) => {
  return new Promise((resolve, reject) => {
    request.get({url: 'https://api.twitter.com/1.1/' + url + '.json', oauth: auth, form: params}, function(error, response, body) {
      if (error) return reject(new Error(error));
      body = JSON.parse(response.body);
      if (response.statusCode != 200 && body.errors) return reject(new Error(`API returned error ${body.errors[0].code}: ${body.errors[0].message}`));
      resolve(body);
    })
  }).catch(e => {
    return reject(e);
  })
}

exports.post = (auth, url, params) => {
  return new Promise((resolve, reject) => {
    request.post({url: 'https://api.twitter.com/1.1/' + url + '.json', oauth: auth, form: params}, function(error, response, body) {
      if (error) return reject(new Error(error));
      body = JSON.parse(response.body);
      if (response.statusCode != 200 && body.errors) return reject(new Error(`API returned error ${body.errors[0].code}: ${body.errors[0].message}`));
      resolve(body);
    })
  }).catch(e => {
    return reject(e);
  })
}

exports.stream = (auth, url, params, callback) => {
  request.post({url: 'https://stream.twitter.com/1.1/' + url + '.json', oauth: auth, form: params})
    .on('data', response => {
      parser.receive(response, data => {
        callback(data);
      });
    })
    .on('error', error => {
      console.log(error);
    })
    .on('end', () => {
      // console.log('end');
    })
}
