import React from "react";
import ReactDOM from "react-dom";

import UserOptions from './../sections/UserOptions.js'

import axios from 'axios';
import querystring from 'querystring'

const constants = require("./../constants.js");


class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistlist: [],
      logged_in: true,
      avg_popularity: 0.0,
      shortTerm: false,
      shortList: true,
      byPopularity: false
    };
  }

  loadData = () => {
    axios.get(constants.urls.favartists+'?'+
      querystring.stringify({
        term: (this.state.shortTerm ? 'short_term' : 'medium_term')
      }))
      .then(response => {
        if(response.status === 200) {
          const data = response.data;
          var alist = [], i = 0, total_popularity = 0.0;
          data.map((artist, index) => {
            if(index < (this.state.shortList ? 10 : 20)) {
              alist.push({
                name: artist.name,
                popularity: artist.popularity,
                picture: (artist.images ? artist.images[0].url : constants.defaults.picture),
                ranking: index
              });
              total_popularity += artist.popularity * (index+1);
            }
          });
          if(this.state.byPopularity) {
            alist.sort((a,b) => {return (b.popularity - a.popularity)});
          }
          this.setState({
            artistlist: alist,
            logged_in: true,
            avg_popularity: (total_popularity / (this.state.shortList ? 55 : 210)).toFixed(1)
          });
          console.log(this.state);
        }
        else {
          console.log(response);
        }
      });
      /*.catch(error => {
        if(error.response && error.response.status && error.response.status === 401) {
          this.setState({
            artistlist: [],
            logged_in: false,
            avg_popularity: 0.0
          });
        } else {
          console.log("unidentified error coming");
          console.log(JSON.stringify(error));
        }
      });*/
  }
  componentDidMount() {
    this.loadData();
  }

  switchTimeFrame = () => {
    this.setState({
      shortTerm: !this.state.shortTerm
    }, () => {
      console.log("switch shorterm to"+this.state.shortTerm);
      this.loadData();
    });
  }

  switchAmount = () => {
    this.setState({
      shortList: !this.state.shortList
    }, () => {
      console.log("switch shortlist to"+this.state.shortList);
      this.loadData();
    });
  }

  switchOrder = () => {
    this.setState({
      byPopularity: !this.state.byPopularity
    }, () => {
      console.log("switch bypop to"+this.state.byPopularity);
      this.loadData();
    });
  }

  render() {
    if(!this.state.logged_in) {
      return <LoginView />;
    }
    return (
      <div className={"main-container container"}>
        <div className={"row"}>
          <div className={"col-md-2"}>
            <img className={"img-fluid rounded-circle"} src={this.props.picture} />
          </div>
          <div className={"col-md-8"}>
            <h1 className={"display-1"}>
              <span className={"align-middle"}>{this.props.name}</span>
            </h1>
          </div>
        </div>
        <div className={"row user-options"}>
          <UserOptions switchOrder={this.switchOrder} switchTimeFrame={this.switchTimeFrame} switchAmount={this.switchAmount} />
        </div>
        <div className={"row"}>
          <div className={"col-md-8"}>
            <div className={"card"}>
              <h4 className={"card-title"}>Your Bandwagon Rating: {this.state.avg_popularity}%</h4>
              <ol className={"list-unstyled"}>
              {
              this.state.artistlist.map((artist, index) => {
                if(index < (this.state.shortList ? 10 : 20)) return (
                  <div className={"row rating"}>
                    <div className={"col-md-8"}>
                    <div className={'progress-group'}>
                      <div className={"progress"}>
                        <div className={`progress-bar progress-bar-striped ${
                          artist.popularity < 60 ? ''
                            : artist.popularity < 70 ? 'bg-info'
                            : artist.popularity < 80 ? 'bg-success'
                            : artist.popularity < 90 ? 'bg-warning'
                            : 'bg-danger'
                          }`
                        } style={{width: artist.popularity+'%'}}>
                          {artist.name} : {artist.popularity}
                        </div>
                      </div>
                      </div>
                      <div className={'progress-group'}>
                      <img className={"img-fluid rounded-circle progress-photo"} style={{marginLeft: (artist.popularity - 5)+'%'}} src={artist.picture} />
                      </div>
                    </div>
                    <div className={"col-md-4"}>
                      <span>Your #{artist.ranking+1}</span>
                    </div>
                  </div>
                )
              })
            }
            </ol>
        </div>
        </div>
        </div>
        <div className={"row"}>
          <a className={"btn btn-danger"} href={constants.urls.logout}>Logout</a>
        </div>
      </div>
    );
  }
}



export default UserView
