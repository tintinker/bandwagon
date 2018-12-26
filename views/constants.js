const root_url = "http://localhost:4321";

module.exports = {
  urls: {
    root: root_url,
    redirect: root_url + '/callback',
    login: root_url + '/login',
    logout: root_url + '/logout'
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
  general: {
    scope: 'user-read-private user-read-email user-top-read'
  }
}
