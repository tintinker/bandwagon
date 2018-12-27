#!/usr/bin/env node

let authflow = require('./authflow.js');
let constants = require('./constants.js');
let utils = require('./util.js');

let path = require('path');
let send = require('request');
let express = require('express');
let querystring = require('querystring');
let cookieparser = require('cookie-parser');
let cors = require('cors');

let app = authflow.getAuthApp(constants.general.scope);
app.use(express.static(path.join(__dirname,'../pages')));

app.get('/', function(request, response){
  if(request.cookies
    && request.cookies[constants.cookies.access_token]
    && request.cookies[constants.cookies.refresh_token]) {
      response.redirect('/you');
    }
  else {
    console.log("sending to splash page");
      response.sendFile(path.resolve(__dirname, '../pages/splash/index.html'));
  }
});

app.get('/postcallback', function(request, response){
  response.redirect('/');
});

app.get('/login', function(request, response){
  response.redirect('/sauce/authflow/login');
});


app.get('/sauce/api/userinfo', function(request, response){

  console.log("getting user info");
  utils.apiRequest('https://api.spotify.com/v1/me',
    request.cookies[constants.cookies.access_token],
    request.cookies[constants.cookies.refresh_token],
    true,
    function(basicUserData) {
      response.send(JSON.stringify({
        name: basicUserData.display_name,
        picture: basicUserData.images ? basicUserData.images[0].url : null
      }));
    },
    function(newToken) {
      response.cookie(constants.cookies.access_token, newToken, {overwrite:true});
    },
    function() {
      response.status(401).send(constants.messages.login_required);
    }
  );
});

app.get('/sauce/api/favartists', function(request, response){

  console.log("getting fav artists");

  utils.apiRequest('https://api.spotify.com/v1/me/top/artists?' +
    querystring.stringify({
      'time_range': request.query[constants.query.term]
    }),
    request.cookies[constants.cookies.access_token],
    request.cookies[constants.cookies.refresh_token],
    true,
    function(favArtists) {
      response.send(JSON.stringify(favArtists.items));
    },
    function(newToken) {
      response.cookie(constants.cookies.access_token, newToken, {overwrite:true});
    },
    function() {
      response.status(401).send(constants.messages.login_required);
    }
  );
});



app.listen('4321');
console.log('Listening on 4321');
