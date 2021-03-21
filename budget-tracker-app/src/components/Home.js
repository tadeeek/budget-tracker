import React, { Component } from "react";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="home-bg min-vh-100">
        <div className="container">
          <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <h1>Welcome to Budget Tracker</h1>
            <p>
              My first simple: JAVA, Spring, React and Boostrap application.
            </p>
            <div className="home-signin text-center">
              <form>
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
                <label for="inputUser" class="visually-hidden">
                  User
                </label>
                <input
                  type="text"
                  id="inputUser"
                  class="form-control"
                  placeholder="User"
                  required=""
                  autofocus=""
                />
                <label for="inputPassword" class="visually-hidden">
                  Password
                </label>
                <input
                  type="password"
                  id="inputPassword"
                  class="form-control"
                  placeholder="Password"
                  required=""
                />
                <div class="checkbox mb-3">
                  <label>
                    <input type="checkbox" value="remember-me" /> Remember me
                  </label>
                </div>
                <button class="w-100 btn btn-lg btn-primary" type="submit">
                  Sign in
                </button>
                <p class="mt-5 mb-3 text-muted">©2021</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
