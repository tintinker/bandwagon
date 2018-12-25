let send = require('request');
let querystring = require('querystring');
let constants = require('./constants.js')

exports.generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

exports.apiRequest = function(endpoint, access_token, refresh_token, success_callback, fail_callback, retry) {
  var options = {
    url: endpoint,
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  };

  // use the access token to access the Spotify Web API
  send.get(options, function(e1, r1, b1) {
    if(b1.error) {
      if(b1.error.status === 401) {
        if(b1.error.message !== 'Invalid access token') {
          console.log("unrecognized error: "+b1.error.message);
          return;
        }
        let uri = constants.root_url + "/refresh_token?" + querystring.stringify({
          refresh_token: refresh_token
        });
        send.get({uri:uri}, function(e2, r2, b2) {
          let newToken = JSON.parse(b2).access_token;
          fail_callback(newToken);
          if(retry) {
            exports.apiRequest(endpoint, newToken, refresh_token, success_callback, exports.preventLoopCallback, false);
          }
        });
      }
    } else {
      success_callback(b1);
    }
  });
}

exports.preventLoopCallback = function(newToken) {
  console.log("error, preventing loop");
};
