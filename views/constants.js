const root_url = "http://localhost:4321";
const local_api_url = root_url + '/sauce/api';

module.exports = {
  urls: {
    root: root_url,
    redirect: root_url + '/callback',
    login: root_url + '/login',
    logout: root_url + '/logout',
    favartists: local_api_url + '/favartists',
    userinfo: local_api_url + '/userinfo'
  },
  cookies: {
    access_token: 'access_token',
    refresh_token: 'refresh_token'
  },
  messages: {
    login_required: 'login_required'
  },
  defaults: {
    picture: "http://cdn.techgyd.com/ft.png"
  },
  query: {
    term: "term"
  },
  general: {
    scope: 'user-read-private user-read-email user-top-read'
  }
}