import React, { Component } from "react";
import UserService from "../services/UserService";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: [],
    };
  }
  componentDidMount() {
    this.getUserDetails();
  }

  async getUserDetails() {
    UserService.getUserDetails().then((response) => {
      let userDetails = response.data;
      console.log(userDetails);
      this.setState({ userDetails: userDetails });
    });
  }

  render() {
    let userName = this.state.userDetails.userName;
    let email = this.state.userDetails.email;
    let name = this.state.userDetails.name;
    return (
      <div className="min-vh-100">
        <div className="container">
          <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <h2>Hello {name}!</h2>
            <h4>username: {userName}</h4>
            <h4>e-mail: {email}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Account;