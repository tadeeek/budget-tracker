import React, { Component } from "react";

class Forbidden extends Component {
  render() {
    return (
      <div className="min-vh-100">
        <div className="container">
          <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <h1>Can't let you in!</h1>{" "}
            <p className="text-muted">FORBIDDEN 403</p>
            <p>Sorry, access to this resource on the server is denied</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Forbidden;
