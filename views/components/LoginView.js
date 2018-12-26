import React from "react";
import ReactDOM from "react-dom";
const path = require('path');
const constants = require("./../constants.js");


class LoginView extends React.Component {
  render() {
    return (
      <div className={"main-container container"}>
        <div className={"row"}>
            <h2 className={"display-1"}>
              <span>Hey! Please login :)</span>
            </h2>
        </div>
        <div className={"row"}>
          <a className={"btn btn-success"} href={constants.urls.login}>Login</a>
        </div>
      </div>
    );
  }
}

export default LoginView
