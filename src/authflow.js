let express = require('express');
let send = require('request');
let cors = require('cors');
let querystring = require('querystring');
let cookieparser = require('cookie-parser');
let secrets = require('./secrets.js');
let utils = require('./util.js');
let constants = require('./constants.js')

let client_id = secrets.client_id
let client_secret = secrets.client_secret; // Your secret
let redirect_uri = constants.urls.redirect; // Your redirect uri



exports.getAuthApp = function(scope) {
  //  let scope = 'user-read-private user-read-email';
  let app = express();
  app.use(cookieparser());
  app.use(cors());
  let stateKey = 'spotify_auth_state';

  app.get('/sauce/authflow/login', function(request, response) {
    console.log('login page');
    let state = utils.generateRandomString(16);
    response.cookie(stateKey, state);
    console.log('state:'+state);
    console.log(JSON.stringify(response.cookies));
    response.redirect('https://accounts.spotify.com/authorize?' +
       querystring.stringify({
         response_type: 'code',
         client_id: client_id,
         scope: scope,
         redirect_uri: redirect_uri,
         state: state
       })
     );
   });

  app.get("/callback", function(request, response){
    console.log("callback");
     let code = request.query.code || null;
     let state = request.query.state || null;
     let storedState = request.cookies ? request.cookies[stateKey] : null;
     console.log(JSON.stringify(request.cookies));
     if(!state || state !== storedState) {
       console.log("mismatch");
       response.redirect('/#' + querystring.stringify({
         error: 'state_mismatch'
       }));
       return;
     }

     response.clearCookie(stateKey);
     var authOptions = {
       url: 'https://accounts.spotify.com/api/token',
       form: {
         code: code,
         redirect_uri: redirect_uri,
         grant_type: 'authorization_code'
       },
       headers: {
         'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
       },
       json: true
     };

     send.post(authOptions, function(error, reponse, body){
       if(error || response.statusCode !== 200) {
         response.redirect('/#' + querystring.stringify({
           error: 'invalid_token'
         }));
         console.log(error);
         console.log(response);
         return;
       }

       console.log("setting cookie: "+body.access_token);
       console.log('setting fre cookie:'+body.refresh_token);
       response.cookie(constants.cookies.access_token, body.access_token);
       response.cookie(constants.cookies.refresh_token, body.refresh_token);
       response.redirect('/postcallback');
    });
  });

  app.get('/sauce/authflow/refresh_token', function(request, response) {

  // requesting access token from refresh token
  var refresh_token = request.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  send.post(authOptions, function(e, r, b) {
    if (!e && r.statusCode === 200) {
      var access_token = b.access_token;
      response.send({
        'access_token': access_token
      });
    }
  });
});

  app.get('/sauce/authflow/logout', function(request, response) {
    console.log("logging out");
    response.clearCookie(constants.cookies.access_token);
    response.clearCookie(constants.cookies.refresh_token);
    response.send("loggout out");
  });

  return app;
}
//console.log('Listing on 4321');
//app.listen(4321);
