import React from "react";
import ReactDOM from "react-dom";

class UserInfo extends React.Component {
  render() {
    return (
      <div className={"main-container container"}>
        <div className={"row"}>
          <div className={"col-md-4"}>
            <img className={"img-fluid rounded-circle"} src="http://cdn.techgyd.com/ft.png" />
          </div>
          <div className={"col-md-8"}>
            <h1 className={"display-1"}>
              <span className={"align-middle"}>{this.props.name}</span>
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo
