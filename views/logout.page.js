import React from "react";
import ReactDOM from "react-dom";
import LogoutView from './components/LogoutView.js'
import ErrorView from './components/ErrorView.js'
import constants from './constants.js'

const app = document.getElementById("app");

axios.get(constants.urls.logout_backend)
  .then(response => {
      ReactDOM.render(<LogoutView />, app);
  })
  .catch(error => {
    console.log(JSON.stringify(error));
    ReactDOM.render(<ErrorView />, app);
  });
