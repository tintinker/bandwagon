import React from "react";
import ReactDOM from "react-dom";
const constants = require("./../constants.js");


class LogoutView extends React.Component {
  render() {
    return (
      <div className={"main-container container"}>
        <div className={"row"}>
            <h2 className={"display-1"}>
              <span>You Gone :(</span>
            </h2>
        </div>
        <div className={"row"}>
          <h4>
            <span>Wanna come back?</span>
          </h4>
        </div>
        <div className={"row"}>
          <a className={"btn btn-success"} href={constants.urls.login}>Login</a>
        </div>
      </div>
    );
  }
}

export default LogoutView
