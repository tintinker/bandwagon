import React from "react";
import ReactDOM from "react-dom";
import UserView from './components/UserView'
import ErrorView from './components/ErrorView'
import constants from './constants.js'

const app = document.getElementById("app");

axios.get(constants.urls.userinfo)
  .then(response => {
    if(response.status === 200) {
      console.log(response.data);
      ReactDOM.render(<UserView name={response.data.name} picture={response.data.picture ? response.data.picture : constants.defaults.picture} />, app);
    }
    else {
      console.log("weird response:");
      console.log(response);
    }
  })
  .catch(error => {
    if(error.response && error.response.status && error.response.status === 401) {
      window.location.replace(constants.urls.login);
    } else {
      console.log(JSON.stringify(error));
      ReactDOM.render(<ErrorView />, app);
    }
  });
