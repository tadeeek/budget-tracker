import React, { Component } from "react";

class NotFound extends Component {
  render() {
    return (
      <div className="min-vh-100">
        <div className="container">
          <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <h1>Lost your way?</h1>
            <p>Sorry the page you are looking for can not be found</p>
            <p className="text-muted">ERROR 404</p>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
