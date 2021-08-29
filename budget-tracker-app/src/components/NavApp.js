import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AuthorizationService from "../services/AuthorizationService";

class NavApp extends Component {
  constructor(props) {
    super(props);

    this.logut = this.logout.bind(this);
  }

  logout = () => {
    AuthorizationService.logout();
    this.props.isLoggedlIn(false);
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
                <NavLink to="/" exact={true} className="nav-link">
                  Home
                </NavLink>
              </li>
              {this.props.isLoggedInStatus ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/categories" className="nav-link">
                      Categories
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/expenses" className="nav-link">
                      Expenses
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/analysis" className="nav-link">
                      Analysis
                    </NavLink>
                  </li>
                </>
              ) : null}
            </ul>
            <ul class="navbar-nav">
              {this.props.isLoggedInStatus ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/account" className="nav-link">
                      Account
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/" onClick={this.logout}>
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
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
