let auth = require('./auth.js');
let constants = require('./constants.js');
let utils = require('./util.js');

let path = require('path');
let send = require('request');
let express = require('express');
let querystring = require('querystring');
let cookieparser = require('cookie-parser');
let cors = require('cors');

import React from 'react';
import ReactDOM from 'react-dom';

let app = auth.getAuthApp('user-read-private user-read-email');
//app.use(express.static(path.join(__dirname,'../public')));

app.get('/', function(request, response){

  let printName = function(apiData) {
    response.send(apiData.display_name);
  };

  console.log("starting");
  utils.apiRequest('https://api.spotify.com/v1/me',
    request.cookies[constants.access_token_cookie],
    request.cookies[constants.refresh_token_cookie],
    printName,
    function(newToken) {
      response.cookie(constants.access_token_cookie, newToken, {overwrite:true});
    },
    true
  );


});

app.listen('4321');
console.log('Listening on 4321');
