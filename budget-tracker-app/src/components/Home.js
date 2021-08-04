import React, { Component } from "react";
import LoginForm from "./LoginForm";

class Home extends Component {
  render() {
    return (
      <div className="home-bg min-vh-100">
        <div className="container">
          <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <h1>Welcome to Budget Tracker</h1>

            <p>
              My first simple: JAVA, Spring, React and Boostrap application.
            </p>
            {console.log(JSON.parse(localStorage.getItem("dataToken")))}
            {this.props.isLoggedInStatus ? (
              "You are logged in. "
            ) : (
              <LoginForm isLoggedIn={this.props.isLoggedIn} />
            )}
            <p className="mt-5 mb-3 text-muted">©2021</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
