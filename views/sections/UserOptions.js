import React from "react";
import ReactDOM from "react-dom";
const path = require('path');


class UserOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortTerm: false,
      shortList: true,
      byPopularity: false
    };
  }
  render() {
    return (
      <div className={"container"}>
        <div className={"row"}>
          <div className={"col-md-3"}>
            <button className={"btn btn-light"} onClick={
              event => {
                this.setState({shortTerm: !this.state.shortTerm});
                this.props.switchTimeFrame()
              }
            }>
              {this.state.shortTerm ? "Use Last 6 months" : "Use Last 4 Weeks"}
            </button>
          </div>
          <div className={"col-md-3"}>
            <button className={"btn btn-light"} onClick={
              event => {
                this.setState({shortList: !this.state.shortList});
                this.props.switchAmount()
              }
            }>
              {this.state.shortList ? "Use Top 20 Artists" : "Use Top 10 Artists"}
            </button>
          </div>
          <div className={"col-md-3"}>
            <button className={"btn btn-light"} onClick={
              event => {
                this.setState({byPopularity: !this.state.byPopularity});
                this.props.switchOrder()
              }
            }>
              {this.state.byPopularity ? "Order by My Ranking" : "Order by Artist Popularity"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserOptions
