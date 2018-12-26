import React from "react";
import ReactDOM from "react-dom";
import LogoutView from './components/LogoutView.js'
import ErrorView from './components/ErrorView.js'

const app = document.getElementById("app");

axios.get("http://localhost:4321/sauce/authflow/logout")
  .then(response => {
      ReactDOM.render(<LogoutView />, app);
  })
  .catch(error => {
    console.log(JSON.stringify(error));
    ReactDOM.render(<ErrorView />, app);
  });
