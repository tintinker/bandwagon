import React from "react";
import ReactDOM from "react-dom";
const constants = require("./../constants.js");


class PrettyLoginView extends React.Component {
  render() {
    document.body.classList.add("splash-page");
    return (
      <div className={"main-container container-fluid splash-page"}>
      <div className={"container"}>
      <div className={"jumbotron"}>
      <h2>Bandwagon</h2>
      <hr className={"my-4"} />
      <h5 className={"display-5"}>How mainstream is your taste in music?</h5>
      <p>Compares your top artists with their overall popularity rating to find out</p>
      </div>
      <div className={"row"}>
          <h2 className={"display-1"}>
            <span>Hey! Please login :)</span>
          </h2>
      </div>
      <div className={"row"}>
        <a className={"btn btn-success"} href={constants.urls.login}>Login</a>
      </div>
        </div>
      </div>
    );
  }
}

export default PrettyLoginView
