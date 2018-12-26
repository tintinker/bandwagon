import React from "react";
import ReactDOM from "react-dom";
import UserView from './components/UserView'
import LoginView from './components/LoginView'
import constants from './constants.js'

const app = document.getElementById("app");

axios.get(constants.urls.userinfo)
  .then(response => {
    if(response.status === 200) {
      console.log(response.data);
      ReactDOM.render(<UserView name={response.data.name} picture={response.data.picture ? response.data.picture : constants.defaults.picture} />, app);
    }
    else {
      console.log(response);
    }
  })
  .catch(error => {
    if(error.response && error.response.status && error.response.status === 401) {
      ReactDOM.render(<LoginView />, app);
    } else {
      console.log(JSON.stringify(error));
    }
  });
