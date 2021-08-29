import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Thankyou extends Component {
  render() {
    return (
      <div className="min-vh-100">
        <div className="container">
          <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <h1>Thank you for registering</h1>
            <p className="text-muted">Muchas gracias</p>
            <p>
              You can now log in with your credencials. Go to{" "}
              <NavLink to="/" exact={true}>
                Login page
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Thankyou;
