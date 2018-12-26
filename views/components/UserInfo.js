import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
const constants = require("./../constants.js");


class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistlist: [],
      logged_in: true,
      avg_popularity: 0.0
    };
  }

  componentDidMount() {

    axios.get("http://localhost:4321/sauce/api/favartists")
      .then(response => {
        if(response.status === 200) {
          const data = response.data;
          var alist = [], i = 0, total_popularity = 0.0;
          data.map((artist, index) => {
            if(index < 10) {
              alist.push({
                name: artist.name,
                popularity: artist.popularity,
                ranking: index
              });
              total_popularity += artist.popularity * (index+1);
            }
          });
          alist.sort((a,b) => {return (b.popularity - a.popularity)});
          this.setState({
            artistlist: alist,
            logged_in: true,
            avg_popularity: (total_popularity / 55).toFixed(1)
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

  render() {
    if(!this.state.logged_in) {
      return <LoginView />;
    }
    return (
      <div className={"main-container container"}>
        <div className={"row"}>
          <div className={"col-md-4"}>
            <img className={"img-fluid rounded-circle"} src={this.props.picture} />
          </div>
          <div className={"col-md-6"}>
            <h1 className={"display-1"}>
              <span className={"align-middle"}>{this.props.name}</span>
            </h1>
          </div>
          <div className={"col-md-2"}>
            <a className={"btn btn-danger"} href={constants.urls.logout}>Logout</a>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col-md-8"}>
            <div className={"card"}>
              <h4>Your Basic Rating: {this.state.avg_popularity}</h4>
              <ol className={"list-unstyled"}>
              {
              this.state.artistlist.map((artist, index) => {
                if(index < 10) return (
                  <div className={"row rating"}>
                    <div className={"col-md-8"}>
                      <div className={"progress"}>
                        <div className={`progress-bar progress-bar-striped ${
                          artist.popularity < 65 ? ''
                            : artist.popularity < 75 ? 'bg-success'
                            : artist.popularity < 85 ? 'bg-info'
                            : artist.popularity < 95 ? 'bg-warning'
                            : 'bg-danger'
                          }`
                        } style={{width: artist.popularity+'%'}}>
                          {artist.name} : {artist.popularity}
                        </div>
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
      </div>
    );
  }
}



export default UserInfo
