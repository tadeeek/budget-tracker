import React, { Component } from "react";
import AuthorizationService from "../services/AuthorizationService";

class NavApp extends Component {
  constructor(props) {
    super(props);

    this.logut = this.logout.bind(this);
  }

  logout = () => {
    AuthorizationService.logout();
    this.props.isLoggedIn(false);
  };

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            Budget Tracker
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              {this.props.isLoggedInStatus ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/categories">
                      Categories
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/expenses">
                      Expenses
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/analysis">
                      Analysys
                    </a>
                  </li>
                </>
              ) : null}
            </ul>
            <ul class="navbar-nav">
              {this.props.isLoggedInStatus ? (
                <li className="nav-item">
                  <a className="nav-link" href="/" onClick={this.logout}>
                    Logout
                  </a>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/" onClick={this.logout}>
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/" onClick={this.logout}>
                      Register
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavApp;
