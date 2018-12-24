let express = require('express');
let submitrequest = require('request');
let cors = require('cors');
let querystring = require('querystring');
let cookieparser = require('cookie-parser');
let secrets = require('./secrets.js');

let client_id = secrets.client_id
let client_secret = secrets.client_secret; // Your secret
let redirect_uri = 'http://localhost:4321/callback'; // Your redirect uri

/**
 * (Copied from Spotify Docs)
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

let app = express();
let stateKey = 'spotify_auth_state';
let state = generateRandomString(16);

app.use(express.static(__dirname + '/public')).use(cors()).use(cookieparser());

app.get('/login', function(request, response) {

  let scope = 'user-read-private user-read-email';
  let state = generateRandomString(16);
  response.cookie(stateKey, state);

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
   let code = request.query.code || null;
   let state = request.query.state || null;
   let storedState = request.cookies ? request.cookies[stateKey] : null;

   if(!state || state !== storedState) {
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

   submitrequest.post(authOptions, function(error, reponse, body){
     if(error || response.statusCode !== 200) {
       response.redirect('/#' + querystring.stringify({
         error: 'invalid_token'
       }));
       console.log(error);
       console.log(response);
       return;
     }

     console.log("body:");
     console.log(body);

     let access_token = body.access_token;
     let refresh_token = body.refresh_token;

     let options = {
       url: 'https://api.spotify.com/v1/me',
      json: true
    };

    submitrequest.get(options, function(error, response, body) {
      console.log(body);
    }).auth(null, null, true, access_token);

    response.redirect('/#' + querystring.stringify({
      access_token: access_token,
      refresh_token: refresh_token
    }));
  });
});

console.log('Listing on 4321');
app.listen(4321);
