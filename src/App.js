import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      username:'',
      id:'',
      url:'',
      error:'',
      isload: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({user: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({isload: false});
    const user = this.state.user;
    console.log(user);
    fetch(`https://api.github.com/users/${user}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let username = data.login;
      if(username){
        this.setState({
          username: "User Name : " + data.login,
          id: "User ID : " + data.id,
          url:"User Url : " + data.html_url,
          error: "",
          isload:true,
         })
      }else{
        this.setState({
          username: undefined,
          id: undefined,
          url: undefined,
          error: "User not found.",
          isload:true,
         })
      }
    })
  }

  render() {
    return (
      <div className="container">
        <div>
          <h1 className="title">Search Github Username</h1>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input className="searchForm" type="text" user={this.state.user}
                onChange={this.handleChange}
                placeholder="Type Username" required/>
            </label>
      </form>
        </div>
          <div className="loadingContainer">
              {this.state.isload ? '':
                <div className="loading">
                    <div className="bar"></div>
                </div>
              }
          </div>
          <div className="infoContainer">
            <p>{this.state.username}</p>
            <p>{this.state.id}</p>
            <p>{this.state.url}</p>
            <p>{this.state.error}</p>

          </div>
      </div>
    );
  }
}

export default App;
