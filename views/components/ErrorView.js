import React from "react";
import ReactDOM from "react-dom";
const path = require('path');


class ErrorView extends React.Component {
  render() {
    return (
      <div className={"main-container container"}>
        <div className={"row"}>
            <h2 className={"display-1"}>
              <span>Oh no! An error :/</span>
            </h2>
        </div>
        <div className={"row"}>
          <a className={"btn btn-danger"} href="#">Do Something</a>
        </div>
      </div>
    );
  }
}

export default ErrorView
